using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class StudioScreenController : MonoBehaviour {


    public string textShownOnScreen;
    public Text studioTextBox;
    public string fullText = "Something Creative";
    public float lettersPerSecond = 2; // speed of typewriter
    private float timeElapsed = 0;   

    void Start(){
        StartCoroutine(FadeAndAdvance());
        StartCoroutine(PrintLetters());
    }

    IEnumerator FadeAndAdvance() {
        // print(Time.time);
        yield return new WaitForSecondsRealtime(3);
     	SceneManager.LoadScene("MainMenu");
    }

    IEnumerator PrintLetters() {
        for (int i = 0; i < fullText.Length; i++) { 
            yield return new WaitForSecondsRealtime(.075f);
            studioTextBox.text = studioTextBox.text + fullText[i];
        }
    }

}

