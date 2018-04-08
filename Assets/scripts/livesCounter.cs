using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class livesCounter : MonoBehaviour {

	public Text LivesText; //Link to the UI text element
	private bool stopUpdate = false;

	void Start () {
		// Create link to the Lives_Display object so we can target the Text component
		LivesText = GameObject.FindWithTag("Lives_Display").GetComponent<Text>();
		// LivesText.text = "Testing text updated on start";
	}


	void Update () {
		//Read the number of lives from the GameManager		
		LivesText.text = "Lives: " + GameManager.instance.livesLeft;

		//If out of lives
		if(GameManager.instance.livesLeft <= 0 && stopUpdate==false) {

			//Check for High Scores 
			if (GameManager.instance.score > GamePreferences.GetHighScoreValue()) {
				stopUpdate = true;
				Debug.Log("You set a high score");
				//& update accordingly
				GamePreferences.SetHighScoreValue( GameManager.instance.score );
				//Alert User
				GameObject getBomber = GameObject.Find("bomber");
				getBomber.GetComponent<DT_Bomb_Creator>().LoadQuotePanel("highscore");
			} else {
				//return to main menu
				Debug.Log("Return to main menu");
				SceneManager.LoadScene("MainMenu");
			}
		}
	}
}
