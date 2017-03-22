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
var isRunning = false; //marker to determine if bombs are already being dropped. This prevents the function running concurrently with itself
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
	if (isRunning == false && Input.GetKey (KeyCode.Space)) {
		isRunning = true;	
    //Call the function to drop bombs (how many bombs to drop, seconds to wait between bombs)
		StartDroppingBombs(numBombs, bombTiming);
	}

	if (moveBomberRunning == false) {
		StartCoroutine(moveBomber(2.0));	
	}
}

//Coroutine to control the bomber's movement & animate smoothly (instead of snapping)
function moveBomber(test) {

	Debug.Log("coroutine running");
	moveBomberRunning = true;

    //Set random values to move bobmer around
	var randomSelectDirection = Random.Range(0, 2);
	var randomSelectDistance = Random.Range(-10f,10f);


	//if moving left & too far left, reverse direction
	if (randomSelectDirection < 1 && transform.position.x - randomSelectDistance < -4) {
		randomSelectDistance = randomSelectDistance * -1;
		//if moving right & too far right, reverse direction
	} else if (randomSelectDirection > 0 && transform.position.x + randomSelectDistance < 34) {
		randomSelectDistance = randomSelectDistance * -1;
	}

	//Execute bomber movement
	var newBomberPosition = transform.position;
	newBomberPosition.x = newBomberPosition.x - randomSelectDistance;

	Debug.Log(transform.position.x + " | " + newBomberPosition.x);

	transform.position = Vector2.MoveTowards(transform.position, newBomberPosition, 60f * Time.deltaTime);
	Debug.Log(transform.position.x + " | " + newBomberPosition.x);
	
	while(transform.position.x - newBomberPosition.x < 0.5f) {
		// Debug.Log("In while statement...");
		moveBomberRunning = false;
	}
	yield WaitForEndOfFrame;

}

function StartDroppingBombs(numberOfBombsToDrop : int, interval : float) {
	
  //Enemy Audio
  enemyBetweenRoundAudio.PlayDelayed(44100);

	//Create a vector that is bomber's position but 1F lower on the y axis.
	//This will spawn the bomb below the bomber
	transform.position.y-=1f;

	//Drop a bomb depending on the numberOfBombsToDrop
	for (var i=0; i < numberOfBombsToDrop; i++) {

		//Get the current number of lives
		var LivesCount = GameObject.FindWithTag("Ground").GetComponent(ground_detection);
		
		//If numberOfLives (static var in this script) is equal to lifecount, than a bomb hasn't been missed yet.
		if (numberOfLives == LivesCount.livesLeft) {
		
		    //create & drop the bomb
		    Instantiate(bomb_Prefab, transform.position, transform.rotation);

		    //wait in between bombs based on interval value
		    yield WaitForSeconds(interval);
		} else {
		  	//decrement numberOfLives & stop dropping bombs
		  	numberOfLives--;
			//Slow down the bomg frequency
			bombTiming = bombTiming + bombTiming * .1; 
	  		break;
	  	}
	}
  	//Update flag so the game knows bombs are no longer being dropped
  	isRunning = false;

  	//increase bomb number & frequency
	numBombs = numBombs + numBombs*.25; 
	bombTiming = bombTiming - bombTiming * .1; 
}