using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ScoreKeeper : MonoBehaviour {

	public int currentScore = 0;
	public Text ScoreText; //Link to UI text element
	public Text ScoreBoard; //Contains string for scoreboard element

	void Start () {
		// Create link to the ScoreBoard_Display object so we can target the Text component
		ScoreText = GameObject.FindWithTag("ScoreBoard_Display").GetComponent<Text> ();
		ScoreText.text = "Testing text updated on start";
	}

	void Update () {
		var ScoreBoardCount = GameObject.FindWithTag("barrel").GetComponent<playerController> ();
		ScoreText.text = "Score " + ScoreBoardCount.score;
	}
}
