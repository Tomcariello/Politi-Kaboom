#pragma strict

var bomb_Prefab : GameObject;

function Start () {
    //if (Time.timeSinceLevelLoad >= 5) {

   	var currentPositionOfDonald = 0;

    for (var i=0; i < 15; i++) {

    	// Set random values to move Donald around
		var randomSelectDirection = Random.Range(0, 4);
		var randomSelectDistance = Random.Range(-1,100);
		var direction;

		//Select direction to move Donald
		if (randomSelectDirection < 2) {
			direction = "left";
		} else {
			direction = "right";
		}

		//Move Donald 3f at a time to fake animation
		//I'm certain there is a better way to handle this
		//And this slows things down noticably
		for (var j=0; j < randomSelectDistance; j++) {
			if (direction == "left") {
				if (currentPositionOfDonald < -100) {
					//do nothing
				} else {
					transform.Translate(Vector2.left * 3f * Time.deltaTime);
					// transform.position = Vector3(0,0,0);	
					currentPositionOfDonald--;
				}
				Debug.Log("currentPositionOfDonald is " + currentPositionOfDonald);
			} else {
				if (currentPositionOfDonald > 100) {
					//do nothing
				} else {
					transform.Translate(Vector2.right * 3f * Time.deltaTime);	
					currentPositionOfDonald++;
				}
				Debug.Log("currentPositionOfDonald is " + currentPositionOfDonald);
			}
		}

		var DT = GameObject.FindGameObjectWithTag("Trump_Bomber").transform.position;
		Debug.Log(DT);

        //Drops 10 bombs, randomly moving left/right from a set height positioned correctly.
        Instantiate(bomb_Prefab, DT, transform.rotation);
        yield WaitForSeconds(1);
    }
}

function Update () {

}

