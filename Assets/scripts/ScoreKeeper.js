#pragma strict
import UnityEngine.UI;

//initialize variable to hold the score
var currentScore = 0;
var ScoreText : UI.Text; //Link to UI text element
var ScoreBoard; //Contains string for scoreboard element

function Start () {
    ScoreText = GetComponent(UI.Text);
    ScoreText.text = "Testing text updated on start";

}

function Update () {
	var ScoreBoardCount = GameObject.FindWithTag("barrel").GetComponent(playerController);
	ScoreText.text = "Score " + ScoreBoardCount.score;
}