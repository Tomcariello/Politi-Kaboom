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
	
	private Button randomButton;

	[SerializeField]
	private Button highscoreButton;

	// Use this for initialization
	void Start () {
        startGameButton.onClick.AddListener(StartGameClick);
		republicanButton.onClick.AddListener(RepublicanClick);
		democratButton.onClick.AddListener(DemocratClick);
		randomButton.onClick.AddListener(RandomClick);
		highscoreButton.onClick.AddListener(HighscoreClick);
	}
	
    void StartGameClick() {
		GameManager.instance.resetGame();
		SceneManager.LoadScene("Gameplay");
    }

	void RepublicanClick() {
		GameManager.instance.EnemyGroup = "republican";
		SavePoliticalPartyPreference("republican");
    }

	void DemocratClick() {
		GameManager.instance.EnemyGroup = "democrat";
		SavePoliticalPartyPreference("democrat");
    }

	void RandomClick() {
		GameManager.instance.EnemyGroup = "";
		SavePoliticalPartyPreference("random");
    }


	void HighscoreClick() {
        Debug.Log("You have clicked the High Score Button!");
		//Load the high score screen
		SceneManager.LoadScene("Highscore");
    }

	//Save political party preferences
	void SavePoliticalPartyPreference(string party) {
		GamePreferences.SetPoliticalParty( party );
	}


}
