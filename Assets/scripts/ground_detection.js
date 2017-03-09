﻿#pragma strict

//lives variable to be read by the canvas to update the scoreboard
public var livesLeft = 3;

function Start () {
	
}

function Update () {
	
}

function OnCollisionEnter2D (coll: Collision2D) {
    // Debug.Log('Something collided with the barrel!');

    if(coll.gameObject.name == "bomb_Prefab(Clone)") {
        Destroy(coll.gameObject);
        livesLeft--;
        
        //Identify all bombs & destroy them
        var getAllBombs = GameObject.FindGameObjectsWithTag("bomb");
    	Debug.Log("getAllBombs is " + getAllBombs.length);
    	for (var i = 0; i < getAllBombs.length; i++) {
    		Destroy(getAllBombs[i]);	
    	}
    	

    }
}