using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class menuController : MonoBehaviour {

	//Get link to button
	[SerializeField]
	private Button startGameButton;
	[SerializeField]
	private Button republicanButton;
	[SerializeField]
	private Button democratButton;
	[SerializeField]
	private Button highscoreButton;

	// Use this for initialization
	void Start () {
        startGameButton.onClick.AddListener(StartGameClick);
		republicanButton.onClick.AddListener(RepublicanClick);
		democratButton.onClick.AddListener(DemocratClick);
		highscoreButton.onClick.AddListener(HighscoreClick);
	}
	
    void StartGameClick() {
        Debug.Log("You have clicked the Start Game Button!");
		SceneManager.LoadScene("Level_1");
    }

	void RepublicanClick() {
        Debug.Log("You have clicked the Republican Button!");
		//Update flag so when game starts the player gets a republican opponent
    }

	void DemocratClick() {
        Debug.Log("You have clicked the Democrat Button!");
		//Update flag so when game starts the player gets a democrat opponent
    }

	void HighscoreClick() {
        Debug.Log("You have clicked the High Score Button!");
		//Load the high score screen
		// SceneManager.LoadScene("High_Score");
    }
}
