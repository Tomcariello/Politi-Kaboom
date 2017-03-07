#pragma strict

var bomb_Prefab : GameObject;

function Start () {

    for (var i=0; i < 15; i++) {

    	// Set random values to move Donald around
		var randomSelectDirection = Random.Range(-1f, 1f);
		var randomSelectDistance = Random.Range(2f,10f);

		//Get the current position of the Trump Sprite		
		var DT = GameObject.FindGameObjectWithTag("Trump_Bomber").transform.position;
		
		//if <0 move Donald LEFT
		//Re-write as seperate function once sorted out
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

		//adjust the DT position 1F down on the y axis. This will spawn the bomb below Trump
		DT.y-=1f;

        //Creates bombs directly below the Trump sprite
        Instantiate(bomb_Prefab, DT, transform.rotation);
        yield WaitForSeconds(1);
    }
}

function Update () {

}

