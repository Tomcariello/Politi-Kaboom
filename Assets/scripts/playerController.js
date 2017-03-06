#pragma strict

//UnityEngine.UI;
//initialize variable to hold the score
var score = 0;
var scoreText;

function Start () {
    scoreText = UnityEngine.UI.Text;
}

function Update () {
	
    if ((Input.GetKey (KeyCode.RightArrow)) || (Input.GetKey (KeyCode.D))) {
        transform.Translate(Vector2.right * 6f * Time.deltaTime);
    }

    if ((Input.GetKey (KeyCode.LeftArrow)) || (Input.GetKey (KeyCode.A))) {
        transform.Translate(-Vector2.right * 6f * Time.deltaTime);
    }
}

function OnCollisionEnter2D (coll: Collision2D) {
    // Debug.Log('Something collided with the barrel!');

    if(coll.gameObject.name == "bomb_Prefab(Clone)") {
        Destroy(coll.gameObject);
        score = score + 1;
        scoreText = "Updated Score: " + score;
        Debug.Log("scoreText is " + scoreText);
    }
}