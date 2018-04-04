using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Audio;

public class playerController : MonoBehaviour {

	public int score = 0;
	public AudioSource bombCaughtSound;

	void Start() {
		bombCaughtSound = GetComponent<AudioSource>();
	}

	void Update () {
		//move barrel as per player input
		if ((Input.GetKey (KeyCode.RightArrow)) || (Input.GetKey (KeyCode.D))) {
			transform.Translate(Vector2.right * 10f * Time.deltaTime);
		}

		if ((Input.GetKey (KeyCode.LeftArrow)) || (Input.GetKey (KeyCode.A))) {
			transform.Translate(-Vector2.right * 10f * Time.deltaTime);
		}
	}

	void OnCollisionEnter2D (Collision2D coll) {
		//if bomb hits the barrel
		if(coll.gameObject.name == "bomb_Prefab(Clone)") {
			//Destroy the bomb
			Destroy(coll.gameObject);
			//increment the score
			score++;
			//Play Sound
			bombCaughtSound.PlayDelayed(44100);
		}
	}
}
