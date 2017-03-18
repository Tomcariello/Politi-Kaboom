#pragma strict
import UnityEngine.UI;
import UnityEngine;

var startButton : Button;

function Start () {
	//Attach to the start button and add a onClick function to listen
	startButton = GetComponent("Button");
	startButton.onClick.AddListener(onMenuButtonClick);
}

function Update () {
	
}

function onMenuButtonClick() {
	Application.LoadLevel ("Level_1");
}

