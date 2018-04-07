using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class HighScoreMenu : MonoBehaviour {

	[SerializeField]
	public Text HighScoreText; //Contains string for scoreboard element

	[SerializeField]
	public Button MainMenuButton;



	// Use this for initialization
	void Start () {
		HighScoreText.text = GamePreferences.GetHighScoreValue().ToString();
		MainMenuButton.onClick.AddListener(ReturnToMainMenu);
	}
	
    void ReturnToMainMenu() {
		SceneManager.LoadScene("MainMenu");
    }
}
