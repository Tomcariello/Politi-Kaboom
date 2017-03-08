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
			Indicate & increment/decrement status (lives?) meter

		To-Do:
			Decrement number of lives or end game on missed bomb
			Make Trump Sprite's movements more robust
			
	Version.02: Add some flavor
		Add sound when bomb is caught
		Insert Cut Screen (or something) in between stages; be funny (dammit)
		Add main menu/start game screen (Return to this screen on game over)

	Version.05: Make this respectable
		Add splash screen
		Add funny/info screen when truth bomb is missed (quote? bomb dropper does something funny?)
		Add multiple stages (press space bar to start after Trump takes a break?)
			Increase bomb dropper speed per 'stage'
			Increase number of bombs dropped per 'stage'
		
	Version.07: Branch out
		User selectable (liberal/conservative)
		Add skins for Hillary Clinton, Bernie Sanders, whoever
	
	Version.09: Build a network
		Add global high score screen
		Add Facebook sharing
		Pull quotes/skins/etc from central server to facilitate updating

	Version.1: This is going to be an app, right?
		Deploy to Android store
		Deploy to Apple store
		Deploy to Facebook

