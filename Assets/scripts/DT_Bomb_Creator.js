#pragma strict

var bomb_Prefab : GameObject;

function Start () {
    //if (Time.timeSinceLevelLoad >= 5) {
    for (var i=0; i < 10; i++) {
        Instantiate(bomb_Prefab, transform.position, transform.rotation);
        yield WaitForSeconds(1);
    }
}

function Update () {
    
}

