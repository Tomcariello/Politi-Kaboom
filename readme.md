# Politi-Kaboom
# Version .02
# Platform: Unity
# By: Tom Cariello

#############################################################################################
#####																					#####
##### Donald Trump is president and the line between true and false is being blurred. 	#####
##### Fact checking seems to have lost it's effectiveness and there is only one thing 	#####
##### left to do...																		#####
#####																					#####
##### You must protect the public from the innaccurate data being disseminated by the 	#####
##### president. To do so, you must catch the truth bombs before they have a chance to 	#####
##### impact the public.																#####
#####																					#####
#############################################################################################

Game Plan:

	Version.01: Proof of concept (DONE)
		Add placeholder images for bomb dropper, background, buckets
		Add core physics
		Add player controls to barrel (left/right)
		Create object to drop bombs at a set interval at the top of the screen (trump).
		Added barriers to keep barrel on the stage
		Normalize the bomb spawning (1 second spread)
		Add collision detection to determine when a truth bomb is caught
		Add collision detection to determine when a truth bomb is missed (hits the ground)
		Add random side-to-side movement to bomb dropper
		Added movement to the Trump sprite
		Moved bomb spawner onto the Trump sprite. Looks like Trump is dropping bombs!
		Move the bomb spawner position 1f lower
		Updated White House Image
		Started to build scoreboard on the bottom of the screen.
		Increment score on caught bomb (behind the scenes)
		Increment scoreboard Properly; (figured out sharing variables across scripts!)
		Indicate & decrement status (lives) meter
		Abstracted the bomb dropping for better control as levels get created. You can control the number of bombs & the bomb interval in the function call.
		Adjusted the game setup. Bombs will drop once the user presses "SPACEBAR". After catching all the bombs, press SPACEBAR again to trigger the next wave of bombs.
		End session on missed bomb. 
			If NOT game over: terminate all bombs, stop dropping bombs
			If game over, reset the game
		Add multiple stages (if you catch all of the bombs, press space bar to keep going)
		Remove the white from the Barrel sprite image
		Added framework for changing elements (bomber, bomb, background, barrel)
		Added sound (non-player specific yet)
		Increase bomb dropper speed per 'stage'
		Increase number of bombs dropped per 'stage'
			

	Version.02: Add some flavor (DONE)
		Add main menu/start game screen (Return to this screen on game over)
		Make Bomber's Sprite's movements more robust (framework set, moving too fast)
		Add splash screen
		Fixed bug where sometime the bomber does not move at all
		Make Bomber's Sprite's movements more robust (Finally!)
		Fix bug where bomber location (height) decreased 1f everytime the user hit space (each round)
		Fixed logic so the bomber only moves while bombs are being dropped
		Make it so the Barrel cannot topple over

	Version.03: Add scaffolding (DONE)
		Add Main Menu Scene & Options (and add click listeners)
		Build framework for Studio splash screen
		Re-organized folder structure (which broke everything...)
		Fixed the broken things from Version .03 (Need to read up on RESOURCES folder)
		Adjust code to include a Game Manager Singleton
		Allow user to select their specific enemy or left/right leaning enemy (or random)
		Allow User to restart game after losing
		Maintain local high score across sessions
		Maintain political party preference across sessions

	Version.04: Add some style (DONE)
		Add High Score page & populate it with the high score
		Add funny/info screen when bomb is missed
		Insert funny/info screen when bomb series is completed
		Fix SCORE text Gameplay
		Fix LIVES text in Gameplay
		Alert User if they set a high score at the end of the game
		Create Enemy specific quotes for quote events
		Randomly pull Enemy specific quotes for all quote events
		Ensure bomber stays within bounds
		Align camera settings across scenes
		Bugfix: The game did not decrement lives counter if you miss the LAST BOMB IN A SET
		Added Fade-In animation to studio scene & main menu
		Commissioned artwork for Trump & Hillary stages.
		Animate the bomber while maintaining gamplay vector3 applications
		Add style to Studio splash screen; Added "Typing" Effect on Studio screen


	Version.05: Improve the gameplay experience 
		To do:
			Improve Graphics across the board
			Optimize the screen size & be sure things scale properly
			Look into profiling to address bottlenecks
			Improve the current quote array implementation
			

	Version.06: Build a network
		To do:
			Add *global* high score screen (currently it is just local)
			Add Facebook/Twitter sharing(?)

		Done: 


	Version.07: Add sounds
		To Do:
			Add sound effects
			Add cutscene audio
			Add game audio
			

	Version .08: Code Review
		To do:
			Improve file structure
			Improve code

		Done: 


	Version.1: This is going to be an app, right?
		To do:
			Deploy to Android store
			Deploy to Apple store
			Deploy to Facebook

		Done: 

	Post V.1 goals:
		Add skins for Mike Pence, Bernie Sanders, etc
		Pull quotes/skins/etc from central server to facilitate updating to keep game fresh