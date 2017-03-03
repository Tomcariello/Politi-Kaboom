#pragma strict

var bomb_Prefab : GameObject;

function Start () {
    //if (Time.timeSinceLevelLoad >= 5) {
    for (var i=0; i < 15; i++) {
        //Drops 10 bombs, randomly moving left/right from a set height positioned correctly.
        Instantiate(bomb_Prefab, Vector3(Random.Range(-4.5, 4.5), 2.8, 5), transform.rotation);
        yield WaitForSeconds(1);
    }
}

function Update () {
    
}

