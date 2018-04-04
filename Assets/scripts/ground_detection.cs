using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ground_detection : MonoBehaviour {

	public int livesLeft = 3;

	void OnCollisionEnter2D (Collision2D coll) {
		//if the ground collides with a created bomb
		if(coll.gameObject.name == "bomb_Prefab(Clone)") {
			Destroy(coll.gameObject);
			livesLeft--;
			
			//Identify all bombs & destroy them
			var getAllBombs = GameObject.FindGameObjectsWithTag("bomb_prefab");
			for (var i = 0; i < getAllBombs.Length; i++) {
				Destroy(getAllBombs[i]);	
			}
		}
	}
}
