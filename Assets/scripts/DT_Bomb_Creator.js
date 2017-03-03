#pragma strict

var bomb_Prefab : GameObject;

function Start () {
    //if (Time.timeSinceLevelLoad >= 5) {
    for (var i=0; i < 15; i++) {
        // Instantiate(bomb_Prefab, transform.position, transform.rotation);
         Instantiate(bomb_Prefab, Vector3(Random.Range(-4.5, 4.5), 0.3, 5), transform.rotation);
        yield WaitForSeconds(1);
    }
}

function Update () {
    
}

