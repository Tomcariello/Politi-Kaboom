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
	public bool bombsAreBeingDropped = false; //marker to determine if bombs are already being dropped. This prevents the function running concurrently with itself
	public int numberOfLives = 3; //A variable to keep in sync with the lives counter. This allows to stop dropping bombs when one is missed.
	public float numBombs = 25; //Set number of bombs to drop on initial stage
	public float bombTiming = .5f; //Set speed to drop bombs on initial stage
	public bool moveBomberRunning = false; //track if the bomber is currently moving
	public string[] enemyList = new string[] { "trump","hillary","putin" };
	
	void Start () {
		string enemy;

		int selectEnemy = Random.Range(0,3);
		enemy = enemyList[0];
		
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
		if (bombsAreBeingDropped == false && Input.GetKey (KeyCode.Space)) {
			bombsAreBeingDropped = true;	
		//Call the function to drop bombs (how many bombs to drop, seconds to wait between bombs)
			StartCoroutine(StartDroppingBombs(numBombs, bombTiming));
		}

		if (moveBomberRunning == false && bombsAreBeingDropped == true) {
			moveBomberRunning = true;
			StartCoroutine("moveBomber");	
		}
	}

	// //Coroutine to control the bomber's movement & animate smoothly
	IEnumerator moveBomber() {

		float randomSelectDestination = Random.Range(-4.0f,38.0f);

		//Execute bomber movement
		Vector3 newBomberPosition = transform.position;
		newBomberPosition.x = randomSelectDestination;

		while(Mathf.Abs(transform.position.x - newBomberPosition.x) > 0.5) {
			if (bombsAreBeingDropped == true) {
				transform.position = Vector2.MoveTowards(transform.position, newBomberPosition, 7.0f * Time.deltaTime);
			}
			yield return new WaitForEndOfFrame();	
		}
		moveBomberRunning = false;
		yield return null;
	}

	IEnumerator StartDroppingBombs(float numberOfBombsToDrop, float interval) {
		Debug.Log("Bombs are dropping!!!!");

		//Enemy Audio
		enemyBetweenRoundAudio.PlayDelayed(44100);

		//Drop a bomb depending on the numberOfBombsToDrop
		for (var i=0; i < numberOfBombsToDrop; i++) {

			//Get the current number of lives
			var LivesCount = GameObject.FindWithTag("Ground").GetComponent<ground_detection>();
			
			//If numberOfLives (static var in this script) is equal to lifecount, than a bomb hasn't been missed yet.
			if (numberOfLives == LivesCount.livesLeft) {
			
				//Create a vector that is bomber's position but 1F lower on the y axis.
				var bombDropLocation = transform.position;
				bombDropLocation.y-=1f;

				//create & drop the bomb
				Instantiate(bomb_Prefab, bombDropLocation, transform.rotation);

				//wait in between bombs based on interval value
				yield return new WaitForSeconds(interval);
			} else {
				//decrement numberOfLives & stop dropping bombs
				numberOfLives--;
				//Slow down the bomg frequency
				bombTiming = bombTiming + bombTiming * .1f; 
				bombsAreBeingDropped = false;
				break;
			}
		}

		//Level Cleared
		//Update flag so the game knows bombs are no longer being dropped
		bombsAreBeingDropped = false;

		//increase bomb number & frequency
		numBombs = numBombs + numBombs * .25f; 
		bombTiming = bombTiming - bombTiming * .1f; 
	}
}
