using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoBehaviour {

	public static GameManager instance = null; 
	
	//Declare variable that need to be maintaind globally
	public int livesLeft = 3;

	//Will contain either republican or democrat based on main menu selection
	public string EnemyGroup;

	public int score = 0;

	public bool bombsAreBeingDropped = false;

	public string[] enemyList = new string[] { "trump","hillary","putin" };

	// Use this for initialization
	void Start () {
		if (instance == null) {
			instance = this;
			DontDestroyOnLoad(gameObject);
		} else {
			DestroyObject(gameObject);
		}
	}

	public void resetGame() {
		livesLeft = 3;
		score = 0;
	}
	
}
