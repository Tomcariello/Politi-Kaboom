using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class livesCounter : MonoBehaviour {

	public Text LivesText; //Link to the UI text element

	void Start () {
		// Create link to the Lives_Display object so we can target the Text component
		LivesText = GameObject.FindWithTag("Lives_Display").GetComponent<Text>();
		// LivesText.text = "Testing text updated on start";
	}


	void Update () {
		//Read the number of lives from the GameManager		
		LivesText.text = "Lives: " + GameManager.instance.livesLeft;

		//Return to menu when out of lives
		if(GameManager.instance.livesLeft <= 0){
			//Add some style here. SF2 "You lose" screen? High score table? Something...

			//Check for High Scores
			if (GameManager.instance.score > GamePreferences.GetHighScoreValue()) {
				GamePreferences.SetHighScoreValue( GameManager.instance.score );
			}

			//Then return to main menu
			SceneManager.LoadScene("MainMenu");
		}
	}
}
