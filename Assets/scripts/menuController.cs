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
        Debug.Log("You have clicked the Start Game Button!");
		GameManager.instance.resetGame();
		SceneManager.LoadScene("Level_1");
    }

	void RepublicanClick() {
		GameManager.instance.EnemyGroup = "republican";
    }

	void DemocratClick() {
		GameManager.instance.EnemyGroup = "democrat";
    }

	void RandomClick() {
		GameManager.instance.EnemyGroup = "";
    }


	void HighscoreClick() {
        Debug.Log("You have clicked the High Score Button!");
		//Load the high score screen
		// SceneManager.LoadScene("High_Score");
    }
}
