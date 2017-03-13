#pragma strict

import UnityEngine.UI;

var bomb_Prefab : GameObject;

var isRunning = false; //marker to determine if bombs are already being dropped. This prevents the function running concurrently with itself
var numberOfLives = 3; //A variable to keep in sync with the lives counter. This allows to stop dropping bombs when one is missed.

var numBombs = 25; //Set number of bombs to drop on initial screen
var bombTiming = .5; //Set speed to drop bombs on initial screen

function Start () {

	//Update the bomb sprite to reflect the current character
	// var LivesText : UI.Text; //Link to UI text element
 //    LivesText = GameObject.FindWithTag("Lives_Display").GetComponent(Text);
 //    LivesText.text = "Testing text updated on start";
	

  // the line below causes the trump sprite to disappear. Can I replace it with Hillary?
	// GetComponent(SpriteRenderer).sprite = hillary_bomber;


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