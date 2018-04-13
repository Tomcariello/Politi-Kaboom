using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ground_detection : MonoBehaviour {

	void OnCollisionEnter2D (Collision2D coll) {
		//if the ground collides with a created bomb
		if(coll.gameObject.name == "bomb_Prefab(Clone)") {
			//Destroy the bomb that collided
			Destroy(coll.gameObject);
			
			//Stop dropping bombs
			GameManager.instance.bombsAreBeingDropped = false;

			//Identify all bombs on screen & destroy them
			var getAllBombs = GameObject.FindGameObjectsWithTag("bomb_prefab");
			for (var i = 0; i < getAllBombs.Length; i++) {
				Destroy(getAllBombs[i]);	
			}

			//Decrement the lives counter
			GameManager.instance.livesLeft--;
		}
	}
}
