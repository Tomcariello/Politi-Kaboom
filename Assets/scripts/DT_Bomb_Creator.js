#pragma strict

var bomb_Prefab : GameObject;

function Start () {
}

function Update () {
    Instantiate(bomb_Prefab, transform.position, transform.rotation);
}
