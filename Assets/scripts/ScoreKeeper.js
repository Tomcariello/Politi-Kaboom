#pragma strict
import UnityEngine.UI;

//initialize variable to hold the score
public var score = 0;
public var ScoreText : UI.Text; //Link to UI text element
var ScoreBoard; //Contains string for scoreboard element

function Start () {
    ScoreText = GetComponent(UI.Text);
    ScoreText.text = "worked";
    
}

function Update () {
  // Debug.Log(ScoreText.text);
  ScoreText.text = "update the UI text";
}
