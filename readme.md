# Politi-Kaboom
# Platform: Unity
# By: Tom Cariello

#############################################################################################
#####																					#####
##### Donald Trump is president and the line between true and false is being blurred. 	#####
##### Fact checking seems to have lost it's effectiveness and there is only one thing 	#####
##### left to do...																		#####
#####																					#####
##### You must protect the public from the innaccurate data being hurled to the public 	#####
##### by the president. To do so, you must catch the truth bombs before they have a 	#####
##### chance to impact the public.														#####
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

		To-Do:
			Add areas for scoreboard & status (lives?) meter
			Increment score on caught bomb
			Decrement number of lives or end game on missed bomb
			

	Version.02: Add some flavor
		Add random side-to-side movement to bomb dropper
		Increase bomb dropper speed per 'stage'
		Add sound when bomb is caught

	Version.05: Make this respectable
		Add splash screen
		Add main menu/start game screen (Return to this screen on game over)
		Add funny/info screen when truth bomb is missed (quote? bomb dropper does something funny?)

	Version.07: Build a network
		Add global high score screen
		Add Facebook sharing
		Pull quotes/skins/etc from central server to facilitate updating
	
	Version.09: Branch out
		User selectable (liberal/conservative)
		Add skins for Hillary Clinton, Bernie Sanders, whoever

	Version.1: This is going to be an app, right?
		Deploy to Android store
		Deploy to Apple store

