using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class menuController : MonoBehaviour {

	//Get link to button
	[SerializeField]
	private Button startGameButton;

	// Use this for initialization
	void Start () {
        startGameButton.onClick.AddListener(StartGameClick);
	}
	
    void StartGameClick() {
        Debug.Log("You have clicked the Start Game Button!");
		SceneManager.LoadScene("Level_1");
    }
}
