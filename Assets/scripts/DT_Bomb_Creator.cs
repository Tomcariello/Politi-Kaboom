using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using UnityEngine.Audio;

public class DT_Bomb_Creator : MonoBehaviour {

	public GameObject bomb_Prefab; // creates a reference to the bomb_prefab (to be assigned in unity GUI)
	public GameObject bomber; // creates a reference to the bomber (to be assigned in unity GUI)
	public GameObject background; //creates a reference to the background (to be assigned in unity GUI)
	public GameObject barrel; //creates a reference to the barrel (to be assigned in unity GUI)
	public GameObject soundEffect; //creates a reference to the barrel (to be assigned in unity GUI)
	public AudioSource enemyBetweenRoundAudio;
	public GameObject QuotePanel;

	[SerializeField]
	public Text QuotePanelText;

	[SerializeField]
	public Button CloseQuotePanelButton;

	public string[] PlayerDiedQuotes;
	public string[] PlayerAliveQuotes;

	//Initial Game Variables
	public float numBombs = 25; //Set number of bombs to drop on initial stage
	public float bombTiming = .5f; //Set speed to drop bombs on initial stage
	public bool moveBomberRunning = false; //track if the bomber is currently moving

	public string enemy;

	//Quote Arrays for each character
	private string[] trumpPlayerDiedQuotes = {
			"Loser. I caught 9,548,542 on my first try.", 
			"Oh, Little Player. You must feel bad after that performance. I know I would",
			"Are you even trying?"
		};
	private string[] trumpPlayerAliveQuotes = {
			"You got lucky. Now I'm bringing out the big guns.", 
			"Inconcievable! What? Yes, you're right, I don't know that that word means.", 
			"In the long run, I can tweet much more than you can catch. You have to sleep sometime."
		};

	private string[] hillaryPlayerDiedQuotes = {
			"That performance was deplorable.",
			"Now that I'm done with you I'm going to give a million dollar speech on Wall St.",
			"I'll just add your name to my list..."
		};
	private string[] hillaryPlayerAliveQuotes = {
			"Where's Debbie Wasserman Schultz when you need her?",
			"Are you still here? Sorry, I deleting emails.",
			"hillary Alive 3"
		};

	private string[] putinPlayerDiedQuotes = {
			"How unfortunate that you would die of radiation poisoning. I demand an investigation.",
			"In Russia, game plays you!",
			"We were just getting to know each other..."
		};
	private string[] putinPlayerAliveQuotes = {
			"I guess polonium-210 won't do the job. Dmitri, bring me the Polonium-5849658.",
			"You are resilient. Perhaps you'd like a job in the KGB?",
			"I may have to throw you in jail if you continue to resist."
		};

	void Start () {
		// PlayerPrefs.DeleteAll();

		CloseQuotePanelButton.onClick.AddListener(CloseQuotePanel);

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
		
		//Generate the asset strings selected enemy
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
		if (GameManager.instance.bombsAreBeingDropped == false && GameManager.instance.canDropBombs == true && Input.GetKey (KeyCode.Space)) {

			GameManager.instance.bombsAreBeingDropped = true;	

			//Call the function to drop bombs (how many bombs to drop, seconds to wait between bombs)
			StartCoroutine(StartDroppingBombs(numBombs, bombTiming));
		}

		//Start moving the bomber once bombs are being dropped
		if (moveBomberRunning == false && GameManager.instance.bombsAreBeingDropped == true) {
			moveBomberRunning = true;
			StartCoroutine("moveBomber");
		}
	}

	// //Coroutine to control the bomber's movement & animate smoothly
	IEnumerator moveBomber() {

		float randomSelectDestination = Random.Range(-14f,14f);

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
				GameManager.instance.liveBombs++;

				//wait in between bombs based on interval value
				yield return new WaitForSeconds(interval);
			} else {
				//decrement numberOfLives & stop dropping bombs
				GameManager.instance.livesLeft--;

				if (GameManager.instance.livesLeft > 0) {
					LoadQuotePanel("dead");
				}

				//Slow down the bomb frequency
				bombTiming = bombTiming + bombTiming * .1f; 
				break;
			}
		}

		//Last bomb dropped
		//Update flag so the game knows bombs are no longer being dropped
		GameManager.instance.bombsAreBeingDropped = false;

		//increase bomb number & frequency
		numBombs = numBombs + numBombs * .25f; 
		bombTiming = bombTiming - bombTiming * .1f; 
	}

	public void LoadQuotePanel(string state) {
		//Pause the action
		GameManager.instance.canDropBombs = false;

		//Set the quote arrays according to the current enemy
		if (enemy == "trump") {
			PlayerDiedQuotes = trumpPlayerDiedQuotes;
			PlayerAliveQuotes = trumpPlayerAliveQuotes;
		} else if (enemy == "hillary") {
			PlayerDiedQuotes = hillaryPlayerDiedQuotes;
			PlayerAliveQuotes = hillaryPlayerAliveQuotes;
		} else if (enemy == "putin") {
			PlayerDiedQuotes = putinPlayerDiedQuotes;
			PlayerAliveQuotes = putinPlayerAliveQuotes;
		}

		if (state == "dead") {
			string quote = PlayerDiedQuotes[Random.Range(0,PlayerDiedQuotes.Length)];
			QuotePanelText.text = quote;
		} else if (state == "alive"){
			string quote = PlayerAliveQuotes[Random.Range(0,PlayerAliveQuotes.Length)];
			QuotePanelText.text = quote;
		} else	{
			QuotePanelText.text = "You set a new high score of " + GameManager.instance.score +  "! Congratulations!";
		}

		//Display Quote Panel
		QuotePanel.SetActive(true);
	}

	void CloseQuotePanel() {

		//If the user is out of lives, they must have set the high score to get here. Return them to the Main Menu
		if (GameManager.instance.livesLeft <= 0){
			GameManager.instance.canDropBombs = true;
			SceneManager.LoadScene("MainMenu");
		} else {
			GameManager.instance.canDropBombs = true;
			QuotePanel.SetActive(false);
		}
	}
}