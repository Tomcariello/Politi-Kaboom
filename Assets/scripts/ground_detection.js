#pragma strict

function Start () {
	
}

function Update () {
	
}

function OnCollisionEnter2D (coll: Collision2D) {
    // Debug.Log('Something collided with the barrel!');

    if(coll.gameObject.name == "bomb_Prefab(Clone)")
    {
        Destroy(coll.gameObject);
    }
}