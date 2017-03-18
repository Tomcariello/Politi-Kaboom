#pragma strict
import UnityEngine.UI;

//initialize variable to hold the score
var numberOfLivesLeft = 0;
var LivesText : UI.Text; //Link to UI text element

function Start () {
    // Create link to the Lives_Display object so we can target the Text component
    LivesText = GameObject.FindWithTag("Lives_Display").GetComponent(Text);
    LivesText.text = "Testing text updated on start";
}


function Update () {
  //track the ground script to access the lives counter
	var LivesCount = GameObject.FindWithTag("Ground").GetComponent(ground_detection);
	LivesText.text = "Lives: " + LivesCount.livesLeft;

	//Return to menu when out of lives
  if(LivesCount.livesLeft <= 0){
    Application.LoadLevel ("main_menu");
  }
}