using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Audio;

public class playerController : MonoBehaviour {

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
			GameManager.instance.score++;
			//Play Sound
			bombCaughtSound.PlayDelayed(44100);

			GameManager.instance.liveBombs--;

			//If LAST bomb of this set, trigger quote
			if ( GameManager.instance.liveBombs == 0 ) {
			    GameObject getBomber = GameObject.Find("bomber");
				getBomber.GetComponent<DT_Bomb_Creator>().LoadQuotePanel("alive");
			}
		}
	}
}
