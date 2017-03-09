#pragma strict

var bomb_Prefab : GameObject;
var isRunning = false; //marker to determine if bombs are already being dropped. This prevents the function running concurrently with itself
var numberOfLives = 3; //A variable to keep in sync with the lives counter. This allows to stop dropping bombs when one is missed.

var numBombs = 25; //Set number of bombs to drop on initial screen
var bombTiming = .5; //Set speed to drop bombs on initial screen

function Start () {

}

function Update () {
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

	    	// Set random values to move Donald around
	    	//This needs tweaking
			var randomSelectDirection = Random.Range(-1f, 1f);
			var randomSelectDistance = Random.Range(2f,10f);

			//Get the current position of the Trump Sprite		
			var DT = GameObject.FindGameObjectWithTag("Trump_Bomber").transform.position;
			
			//Re-write as seperate function once sorted out
			
			//if <0 move Donald LEFT
			if (randomSelectDirection < 0) {
				if (DT.x - randomSelectDistance < 0) {
					randomSelectDistance = randomSelectDistance * -1;
				}

				for (var j=0; j < randomSelectDistance; j++) {
					transform.Translate(Vector2.left * 6f * Time.deltaTime);
				}
			} else {
				if (DT.x + randomSelectDistance > 30) {
					randomSelectDistance = randomSelectDistance * -1;
				}

				for (var k=0; k < randomSelectDistance; k++) {
					transform.Translate(Vector2.right * 6f * Time.deltaTime);	
				}
			}

			//Create a vector that is Trump's position but 1F lower on the y axis.
			//This will spawn the bomb below Trump
			DT.y-=1f;

	        //Creates bombs at the location determined above
	        Instantiate(bomb_Prefab, DT, transform.rotation);

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