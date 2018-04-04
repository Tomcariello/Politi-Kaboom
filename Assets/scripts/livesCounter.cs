using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class livesCounter : MonoBehaviour {

	public int numberOfLivesLeft = 0;
	public Text LivesText; //Link to UI text element

	void Start () {
		// Create link to the Lives_Display object so we can target the Text component
		LivesText = GameObject.FindWithTag("Lives_Display").GetComponent<Text>();
		LivesText.text = "Testing text updated on start";
	}


	void Update () {
	//track the ground script to access the lives counter
		var LivesCount = GameObject.FindWithTag("Ground").GetComponent<ground_detection>();
		LivesText.text = "Lives: " + LivesCount.livesLeft;

		//Return to menu when out of lives
		if(LivesCount.livesLeft <= 0){
			Application.LoadLevel ("main_menu");
		}
	}
}
