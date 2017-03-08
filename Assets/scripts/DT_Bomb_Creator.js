#pragma strict

var bomb_Prefab : GameObject;
var isRunning = false; //marker to determine if bombs are already being dropped

function Start () {

}

function Update () {
	if (isRunning == false && Input.GetKey (KeyCode.Space)) {
		isRunning = true;	
        //Call the function to drop bombs (how many bombs to drop, seconds to wait between bombs)
		StartDroppingBombs(25, .6);
	}
}

function StartDroppingBombs(numberOfBombsToDrop : int, interval : float) {
	
	for (var i=0; i < numberOfBombsToDrop; i++) {

    	// Set random values to move Donald around
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
        yield WaitForSeconds(interval);
    }
    isRunning = false;
}