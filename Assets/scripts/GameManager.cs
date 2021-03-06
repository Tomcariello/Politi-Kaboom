﻿using System.Collections;
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

	public bool canDropBombs = true;

	public int liveBombs = 0;

	public string[] enemyList = new string[] { "trump","hillary","putin" };

	// Use this for initialization
	void Start () {
		if (instance == null) {
			instance = this;
			DontDestroyOnLoad(gameObject);
		} else {
			DestroyObject(gameObject);
		}

		GameManager.instance.EnemyGroup = GamePreferences.GetPoliticalParty();
	}

	public void resetGame() {
		livesLeft = 3;
		score = 0;
	}
	
}
