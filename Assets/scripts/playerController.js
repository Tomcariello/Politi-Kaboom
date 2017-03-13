#pragma strict
import UnityEngine.AudioSource;
//score variable to be read by the canvas to update the scoreboard
public var score = 0;
var bombCaughtSound : AudioSource;

function Start() {
    bombCaughtSound = GetComponent.<AudioSource>();
}

function Update () {
	//move barrel as per player input
    if ((Input.GetKey (KeyCode.RightArrow)) || (Input.GetKey (KeyCode.D))) {
        transform.Translate(Vector2.right * 10f * Time.deltaTime);
    }

    if ((Input.GetKey (KeyCode.LeftArrow)) || (Input.GetKey (KeyCode.A))) {
        transform.Translate(-Vector2.right * 10f * Time.deltaTime);
    }
}

function OnCollisionEnter2D (coll: Collision2D) {
    //if bomb hits the barrel
    if(coll.gameObject.name == "bomb_Prefab(Clone)") {
        //Destroy the bomb
        Destroy(coll.gameObject);
        //increment the score
        score++;
        //Play Sound
        bombCaughtSound.Play();
        bombCaughtSound.Play(44100);

    }
   
}