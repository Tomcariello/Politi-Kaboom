using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class GamePreferences {
	public static int HighScore = 0;
	public static string PoliticalParty = "PoliticalParty";
	public static string EnableSound = "EnableSound";

	//High Score Getters & Setters
	public static void SetHighScoreValue(int value) {
		PlayerPrefs.SetInt("HighScore", value);
	}

	public static int GetHighScoreValue() {
		return PlayerPrefs.GetInt("HighScore");
	}

	//Political Party Getters & Setters
	public static void SetPoliticalParty(string party) {
		PlayerPrefs.SetString(GamePreferences.PoliticalParty, party);
	}

	public static string GetPoliticalParty() {
		return PlayerPrefs.GetString(GamePreferences.PoliticalParty);
	}

	//Music Getters & Setters
	public static void SetMusicState(int state) {
		PlayerPrefs.SetInt(GamePreferences.EnableSound, state);
	}

	public static int GetMusicState() {
		return PlayerPrefs.GetInt(GamePreferences.EnableSound);
	}




} //GamePreferences
