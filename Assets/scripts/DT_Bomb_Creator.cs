using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Audio;

public class DT_Bomb_Creator : MonoBehaviour {

	public GameObject bomb_Prefab; // creates a reference to the bomb_prefab (to be assigned in unity GUI)
	public GameObject bomber; // creates a reference to the bomber (to be assigned in unity GUI)
	public GameObject background; //creates a reference to the background (to be assigned in unity GUI)
	public GameObject barrel; //creates a reference to the barrel (to be assigned in unity GUI)
	public GameObject soundEffect; //creates a reference to the barrel (to be assigned in unity GUI)
	public AudioSource enemyBetweenRoundAudio;

	//Initial Game Variables
	public float numBombs = 25; //Set number of bombs to drop on initial stage
	public float bombTiming = .5f; //Set speed to drop bombs on initial stage
	public bool moveBomberRunning = false; //track if the bomber is currently moving

	void Start () {
		string enemy;

		//If user selected republican, play against trump
		if (GameManager.instance.EnemyGroup == "republican") {
			enemy = GameManager.instance.enemyList[0];
		//If user selected democrat, play against Hillary
		} else if (GameManager.instance.EnemyGroup == "democrat") {
			enemy = GameManager.instance.enemyList[1];
		//otherwise, select at random
		} else {
			int selectEnemy = Random.Range(0,3);
			enemy = GameManager.instance.enemyList[Random.Range(0,GameManager.instance.enemyList.Length)];
		}
		
		
		//Generate the path & filename of the required sprites
		string enemyBombSpriteString = "bomb_images/bomb_" + enemy;
		string enemyBomberSpriteString = "bomber_images/bomber_" + enemy;
		string enemyBackgroundSpriteString = "background_images/background_" + enemy;
		string enemyBarrelSpriteString = "barrel_images/barrel_" + enemy;
		string enemySoundEffectString = "bomb_caught_audio/bombcaught_" + enemy;

		//Identify the target bomb sprites using the string gnerated above
		Sprite enemyBombSprite = Resources.Load<Sprite>(enemyBombSpriteString);
		Sprite enemyBomberSprite = Resources.Load<Sprite>(enemyBomberSpriteString);
		Sprite enemyBackgroundSprite = Resources.Load<Sprite>(enemyBackgroundSpriteString);
		Sprite enemyBarrelSprite = Resources.Load<Sprite>(enemyBarrelSpriteString);
		// Sprite enemsySoundEffect = Resources.Load<Sprite>(enemySoundEffectString);

		//Assign the correct enemy bomb to the bomb_prefab
		bomb_Prefab.GetComponent<SpriteRenderer>().sprite = enemyBombSprite;
		bomber.GetComponent<SpriteRenderer>().sprite = enemyBomberSprite;
		background.GetComponent<SpriteRenderer>().sprite = enemyBackgroundSprite;
		barrel.GetComponent<SpriteRenderer>().sprite = enemyBarrelSprite;
		// soundEffect.GetComponent<AudioSource>().clip = enemySoundEffect;

		enemyBetweenRoundAudio = GetComponent<AudioSource>();
	}

	void Update () {
		//If bombs are not being dropped & the user presses spacebar, call the function
		if (GameManager.instance.bombsAreBeingDropped == false && Input.GetKey (KeyCode.Space)) {

			GameManager.instance.bombsAreBeingDropped = true;	

			//Call the function to drop bombs (how many bombs to drop, seconds to wait between bombs)
			StartCoroutine(StartDroppingBombs(numBombs, bombTiming));
		}

		if (moveBomberRunning == false && GameManager.instance.bombsAreBeingDropped == true) {
			moveBomberRunning = true;
			StartCoroutine("moveBomber");	
		}
	}

	// //Coroutine to control the bomber's movement & animate smoothly
	IEnumerator moveBomber() {

		float randomSelectDestination = Random.Range(-2.75f,15.5f);

		//Execute bomber movement
		Vector3 newBomberPosition = transform.position;
		newBomberPosition.x = randomSelectDestination;

		while(Mathf.Abs(transform.position.x - newBomberPosition.x) > 0.5) {
			if (GameManager.instance.bombsAreBeingDropped == true) {
				transform.position = Vector2.MoveTowards(transform.position, newBomberPosition, 7.0f * Time.deltaTime);
			}
			yield return new WaitForEndOfFrame();	
		}
		moveBomberRunning = false;
		yield return null;
	}

	IEnumerator StartDroppingBombs(float numberOfBombsToDrop, float interval) {

		//Enemy Audio
		enemyBetweenRoundAudio.PlayDelayed(44100);

		//Drop a bomb depending on the numberOfBombsToDrop
		for (var i=0; i < numberOfBombsToDrop; i++) {

			//Get the current number of lives
			var LivesCount = GameManager.instance.livesLeft;
			
			//If numberOfLives (static var in this script) is equal to lifecount, than a bomb hasn't been missed yet.
			if (GameManager.instance.bombsAreBeingDropped) {
			
				//Create a vector that is bomber's position but 1F lower on the y axis.
				var bombDropLocation = transform.position;
				bombDropLocation.y-=1f;

				//create & drop the bomb
				Instantiate(bomb_Prefab, bombDropLocation, transform.rotation);

				//wait in between bombs based on interval value
				yield return new WaitForSeconds(interval);
			} else {
				//decrement numberOfLives & stop dropping bombs
				GameManager.instance.livesLeft--;

				//Slow down the bomg frequency
				bombTiming = bombTiming + bombTiming * .1f; 
				break;
			}
		}

		//Level Cleared
		//Update flag so the game knows bombs are no longer being dropped
		GameManager.instance.bombsAreBeingDropped = false;

		//increase bomb number & frequency
		numBombs = numBombs + numBombs * .25f; 
		bombTiming = bombTiming - bombTiming * .1f; 
	}
}
