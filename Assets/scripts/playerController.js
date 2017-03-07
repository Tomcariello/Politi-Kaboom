#pragma strict
public var scoreBoard;
var x = 0;
var ScoreKeeperScript: ScoreKeeper;

function Start () {
    ScoreKeeperScript = gameObject.GetComponent(ScoreKeeper);
    scoreBoard = GameObject.Find("ScoreText").GetComponent("Text");
    Debug.Log("scoreBoard is " + scoreBoard);
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
    if(coll.gameObject.name == "bomb_Prefab(Clone)") {
        Destroy(coll.gameObject);
    }

    // ScoreKeeperScript.ScoreText.text = "updated from playercontroller script";
}