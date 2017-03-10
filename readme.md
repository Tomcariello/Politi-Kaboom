# Politi-Kaboom
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

	Version.01: Proof of concept
		Done:
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
				If game over, reset the game (Melissa)
			Add multiple stages (if you catch all of the bombs, press space bar to keep going)
			Remove the white from the Barrel sprite image

		To-Do:
			Make Trump Sprite's movements more robust (animate!)
			Make it so the Barrel cannot topple over (this happens as things speed up. Can we increase the barrel weight?)

			
	Version.02: Add some flavor
		Add splash screen
		Add main menu/start game screen (Return to this screen on game over)
		Add funny/info screen when truth bomb is missed (quote? bomb dropper does something funny?)
		Insert Cut Screen (or something) in between stages; be funny (dammit)
		Add sound when bomb is caught
		Increase bomb dropper speed per 'stage'
		Increase number of bombs dropped per 'stage'
		
	Version.05: Branch out
		User selectable (liberal/conservative)
		Add skins for Hillary Clinton, Bernie Sanders, whoever
	
	Version.06: Build a network
		Add global high score screen
		Add Facebook sharing
		Pull quotes/skins/etc from central server to facilitate updating

	Version.1: This is going to be an app, right?
		Deploy to Android store
		Deploy to Apple store
		Deploy to Facebook

