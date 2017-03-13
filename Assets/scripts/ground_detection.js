#pragma strict

//lives variable to be read by the canvas to update the scoreboard
public var livesLeft = 3;

function Start () {
	
}

function Update () {
	
}

function OnCollisionEnter2D (coll: Collision2D) {
    //if the ground collides with a created bomb
    if(coll.gameObject.name == "bomb_Prefab(Clone)") {
        Destroy(coll.gameObject);
        livesLeft--;
        
        //Identify all bombs & destroy them
        var getAllBombs = GameObject.FindGameObjectsWithTag("bomb");
    	for (var i = 0; i < getAllBombs.length; i++) {
    		Destroy(getAllBombs[i]);	
    	}
    }
}