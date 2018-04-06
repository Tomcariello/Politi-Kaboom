using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class StudioScreenController : MonoBehaviour {

    void Start()
    {
        StartCoroutine(FadeAndAdvance());
    }

    IEnumerator FadeAndAdvance()
    {
        print(Time.time);
        yield return new WaitForSecondsRealtime(3);
     	SceneManager.LoadScene("main_menu");

    }



}
