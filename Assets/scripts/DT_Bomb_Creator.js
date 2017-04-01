#pragma strict

import UnityEngine.UI;
import UnityEngine.AudioSource;

var bomb_Prefab : GameObject; // creates a reference to the bomb_prefab (to be assigned in unity GUI)
var bomber : GameObject; // creates a reference to the bomber (to be assigned in unity GUI)
var background : GameObject; //creates a reference to the background (to be assigned in unity GUI)
var barrel : GameObject; //creates a reference to the barrel (to be assigned in unity GUI)
var soundEffect : GameObject; //creates a reference to the barrel (to be assigned in unity GUI)
var enemyBetweenRoundAudio : AudioSource;

//Initial Game Variables
var bombsAreBeingDropped = false; //marker to determine if bombs are already being dropped. This prevents the function running concurrently with itself
var numberOfLives = 3; //A variable to keep in sync with the lives counter. This allows to stop dropping bombs when one is missed.
var numBombs = 25; //Set number of bombs to drop on initial stage
var bombTiming = .5; //Set speed to drop bombs on initial stage
var moveBomberRunning = false; //track if the bomber is currently moving

var enemyList = ["trump","hillary","putin"];

//Per game dynamic values
var enemy;

function Start () {
	//Identify the enemy & load the appropriate sprites
	enemy = enemyList[Random.Range(0,3)];
	Debug.Log('Your enemy is ' + enemy);
	
	//Generate the path & filename of the required sprites
	var enemyBombSpriteString = "bomb_images/bomb_" + enemy;
	var enemyBomberSpriteString = "bomber_images/bomber_" + enemy;
	var enemyBackgroundSpriteString = "background_images/background_" + enemy;
	var enemyBarrelSpriteString = "barrel_images/barrel_" + enemy;
	var enemySoundEffectString = "bomb_caught_audio/bombcaught_" + enemy;

	//Identify the target bomb sprite using the string gnerated above
	var enemyBombSprite = Resources.LoadAll(enemyBombSpriteString);
	var enemyBomberSprite = Resources.LoadAll(enemyBomberSpriteString);
	var enemyBackgroundSprite = Resources.LoadAll(enemyBackgroundSpriteString);
	var enemyBarrelSprite = Resources.LoadAll(enemyBarrelSpriteString);
	var enemySoundEffect = Resources.LoadAll(enemySoundEffectString);

	//Assign the correct enemy bomb to the bomb_prefab
	bomb_Prefab.GetComponent.<SpriteRenderer>().sprite = enemyBombSprite[1];
	bomber.GetComponent.<SpriteRenderer>().sprite = enemyBomberSprite[1];
	background.GetComponent.<SpriteRenderer>().sprite = enemyBackgroundSprite[1];
	barrel.GetComponent.<SpriteRenderer>().sprite = enemyBarrelSprite[1];
	soundEffect.GetComponent.<AudioSource>().clip = enemySoundEffect[0];

	enemyBetweenRoundAudio = GetComponent.<AudioSource>();
}

function Update () {
	//If bombs are not being dropped & the user presses spacebar, call the function
	if (bombsAreBeingDropped == false && Input.GetKey (KeyCode.Space)) {
		bombsAreBeingDropped = true;	
    //Call the function to drop bombs (how many bombs to drop, seconds to wait between bombs)
		StartDroppingBombs(numBombs, bombTiming);
	}

	if (moveBomberRunning == false && bombsAreBeingDropped == true) {
		moveBomberRunning = true;
		StartCoroutine(moveBomber());	
	}
}

//Coroutine to control the bomber's movement & animate smoothly (instead of snapping)
function moveBomber() {

	var randomSelectDestination = Random.Range(-4.0,38.0);

	//Execute bomber movement
	var newBomberPosition = transform.position;
	newBomberPosition.x = randomSelectDestination;

	while(Mathf.Abs(transform.position.x - newBomberPosition.x) > 0.5) {
		if (bombsAreBeingDropped == true) {
			transform.position = Vector2.MoveTowards(transform.position, newBomberPosition, 7.0f * Time.deltaTime);
		}
		yield WaitForEndOfFrame;	
	}
	moveBomberRunning = false;
}

function StartDroppingBombs(numberOfBombsToDrop : int, interval : float) {
	
	//Enemy Audio
	enemyBetweenRoundAudio.PlayDelayed(44100);

	//Drop a bomb depending on the numberOfBombsToDrop
	for (var i=0; i < numberOfBombsToDrop; i++) {

		//Get the current number of lives
		var LivesCount = GameObject.FindWithTag("Ground").GetComponent(ground_detection);
		
		//If numberOfLives (static var in this script) is equal to lifecount, than a bomb hasn't been missed yet.
		if (numberOfLives == LivesCount.livesLeft) {
		
			//Create a vector that is bomber's position but 1F lower on the y axis.
			var bombDropLocation = transform.position;
			bombDropLocation.y-=1f;

		    //create & drop the bomb
		    Instantiate(bomb_Prefab, bombDropLocation, transform.rotation);

		    //wait in between bombs based on interval value
		    yield WaitForSeconds(interval);
		} else {
		  	//decrement numberOfLives & stop dropping bombs
		  	numberOfLives--;
			//Slow down the bomg frequency
			bombTiming = bombTiming + bombTiming * .1; 
			bombsAreBeingDropped = false;
	  		break;
	  	}
	}

	//Level Cleared
  	//Update flag so the game knows bombs are no longer being dropped
  	bombsAreBeingDropped = false;

  	//increase bomb number & frequency
	numBombs = numBombs + numBombs*.25; 
	bombTiming = bombTiming - bombTiming * .1; 
}