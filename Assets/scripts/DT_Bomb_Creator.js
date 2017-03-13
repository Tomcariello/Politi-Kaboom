#pragma strict

import UnityEngine.UI;

var bomb_Prefab : GameObject; // creates a reference to the bomb_prefab (to be assigned in unity GUI)
var bomber : GameObject; // creates a reference to the bomber (to be assigned in unity GUI)
var background : GameObject; //creates a reference to the background (to be assigned in unity GUI)
var barrel : GameObject; //creates a reference to the barrel (to be assigned in unity GUI)

//Initial Game Variables
var isRunning = false; //marker to determine if bombs are already being dropped. This prevents the function running concurrently with itself
var numberOfLives = 3; //A variable to keep in sync with the lives counter. This allows to stop dropping bombs when one is missed.
var numBombs = 25; //Set number of bombs to drop on initial stage
var bombTiming = .5; //Set speed to drop bombs on initial stage
var enemyList = ["trump","hillary"];

//Per game dynamic values
var enemy;

function Start () {
	//Identify the enemy & load the appropriate sprites
	enemy = enemyList[Random.Range(0,2)];
	Debug.Log('Your enemy is ' + enemy);
	
	//Generate the path & filename of the required sprites
	var enemyBombSpriteString = "bomb_images/bomb_" + enemy;
	var enemyBomberSpriteString = "bomber_images/bomber_" + enemy;
	var enemyBackgroundSpriteString = "background_images/background_" + enemy;
	var enemyBarrelSpriteString = "barrel_images/barrel_" + enemy;

	//Identify the target bomb sprite using the string gnerated above
	var enemyBombSprite = Resources.LoadAll(enemyBombSpriteString);
	var enemyBomberSprite = Resources.LoadAll(enemyBomberSpriteString);
	var enemyBackgroundSprite = Resources.LoadAll(enemyBackgroundSpriteString);
	var enemyBarrelSprite = Resources.LoadAll(enemyBarrelSpriteString);

	//Assign the correct enemy bomb to the bomb_prefab
	bomb_Prefab.GetComponent.<SpriteRenderer>().sprite = enemyBombSprite[1];
	bomber.GetComponent.<SpriteRenderer>().sprite = enemyBomberSprite[1];
	background.GetComponent.<SpriteRenderer>().sprite = enemyBackgroundSprite[1];
	barrel.GetComponent.<SpriteRenderer>().sprite = enemyBarrelSprite[1];

}

function Update () {
	//If bombs are not being dropped & the user presses spacebar, call the function
	if (isRunning == false && Input.GetKey (KeyCode.Space)) {
		isRunning = true;	
    //Call the function to drop bombs (how many bombs to drop, seconds to wait between bombs)
		StartDroppingBombs(numBombs, bombTiming);
	}
}

function StartDroppingBombs(numberOfBombsToDrop : int, interval : float) {
	
	//Drop a bomb depening on the numberOfBombsToDrop
	for (var i=0; i < numberOfBombsToDrop; i++) {

		//Get the current number of lives
		var LivesCount = GameObject.FindWithTag("Ground").GetComponent(ground_detection);
		
		//If numberOfLives (static var in this script) is equal to lifecount, than a bomb hasn't been missed yet.
		if (numberOfLives == LivesCount.livesLeft) {

	    // Set random values to move bobmer around
	    //This needs tweaking
			var randomSelectDirection = Random.Range(-1f, 1f);
			var randomSelectDistance = Random.Range(2f,10f);

			//Get the current position of the bomber Sprite		
			var bomberPosition = GameObject.FindGameObjectWithTag("Trump_Bomber").transform.position;
			
			//Re-write as seperate function once sorted out
			
			//if <0 move bomber LEFT
			if (randomSelectDirection < 0) {
				if (bomberPosition.x - randomSelectDistance < 0) {
					randomSelectDistance = randomSelectDistance * -1;
				}

				for (var j=0; j < randomSelectDistance; j++) {
					transform.Translate(Vector2.left * 6f * Time.deltaTime);
				}
			} else {
				if (bomberPosition.x + randomSelectDistance > 30) {
					randomSelectDistance = randomSelectDistance * -1;
				}

				for (var k=0; k < randomSelectDistance; k++) {
					transform.Translate(Vector2.right * 6f * Time.deltaTime);	
				}
			}

			//Create a vector that is bomber's position but 1F lower on the y axis.
			//This will spawn the bomb below the bomber
			bomberPosition.y-=1f;

	        //create & drop the bomb
	        Instantiate(bomb_Prefab, bomberPosition, transform.rotation);

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