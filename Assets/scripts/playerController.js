#pragma strict

function Start () {
	
}

function Update () {
	
    if ((Input.GetKey (KeyCode.RightArrow)) || (Input.GetKey (KeyCode.D))) {
        transform.Translate(Vector2.right * 6f * Time.deltaTime);
    }

    if ((Input.GetKey (KeyCode.LeftArrow)) || (Input.GetKey (KeyCode.A))) {
        transform.Translate(-Vector2.right * 6f * Time.deltaTime);
    }
}
