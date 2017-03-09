#pragma strict
import UnityEngine.UI;

//initialize variable to hold the score
var numberOfLivesLeft = 0;
var LivesText : UI.Text; //Link to UI text element
var LivesTextString; //Contains string for scoreboard element
private var anim : Animator; 

function Start () {
    // Create link to the Lives_Display object so we can target the Text component
    LivesText = GameObject.FindWithTag("Lives_Display").GetComponent(Text);
    LivesText.text = "Testing text updated on start";
}


function Update () {
	var LivesCount = GameObject.FindWithTag("Ground").GetComponent(ground_detection);
	LivesText.text = "Lives: " + LivesCount.livesLeft;

	//Reload game when player runs out of lives
    if(LivesCount.livesLeft <= 0){
      Application.LoadLevel(Application.loadedLevel);
    }
}