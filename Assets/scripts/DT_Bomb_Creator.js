#pragma strict

var bomb_Prefab : GameObject;

function Start () {
    //if (Time.timeSinceLevelLoad >= 5) {

   	var currentPositionOfDonald = 0;

    for (var i=0; i < 15; i++) {

    	// Set random values to move Donald around
		var randomSelectDirection = Random.Range(0, 4);
		var randomSelectDistance = Random.Range(-1,100);
		
		//Move Donald 3f at a time to fake animation
		//I'm certain there is a better way to handle this
		//And this slows things down noticably

		//if <2 move Donald LEFT
		if (randomSelectDirection < 2) {
			if (currentPositionOfDonald - randomSelectDistance < -150) {
				randomSelectDistance = 75;
			}

			for (var j=0; j < randomSelectDistance; j++) {
				transform.Translate(Vector2.left * 3f * Time.deltaTime);
				// transform.position = Vector3(0,0,0);	
				currentPositionOfDonald--;
			}
			// Debug.Log("currentPositionOfDonald is " + currentPositionOfDonald);
		} else {
			if (currentPositionOfDonald > 100) {
				randomSelectDistance = -75;
			}

			for (var k=0; k < randomSelectDistance; k++) {
				transform.Translate(Vector2.right * 3f * Time.deltaTime);	
				currentPositionOfDonald++;
			}
			// Debug.Log("currentPositionOfDonald is " + currentPositionOfDonald);
		}

		//Get the current position of the Trump Sprite		
		var DT = GameObject.FindGameObjectWithTag("Trump_Bomber").transform.position;
		
		//adjust the DT position 1F down on the y axis. This will drop the bomb below Trump
		DT.y-=1f;

        //Creates bombs directly below the Trump sprite
        Instantiate(bomb_Prefab, DT, transform.rotation);
        yield WaitForSeconds(1);
    }
}

function Update () {

}

