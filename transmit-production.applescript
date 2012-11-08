-- use applescript to sync production directory to JSR production server

with timeout of 600 seconds

tell application "Transmit"
	-- Prevent interactive alerts from popping up during script execution
	set SuppressAppleScriptAlerts to true
	
	-- CONFIGURATION - edit what you need to below
	-- replace "LincolnMullen" with the name of your favorite
	set remoteFavorite to item 1 of (favorites whose name is "JSR")
	-- replace everything in between "" to the remote path you want to sync TO
	set remotePath to "production"
	-- replace everything in between "" to the local path you want to sync FROM
	set localPath to "~/dev/jsr-production"
	-- END CONFIGURATION
	
	-- set a variable naming all the skip rules that are enabled in Transmit preferences
	set myRules to (skip rules whose enabled is true)
	
	-- Create a new window (and thus a single tab) for this script
	tell current tab of (make new document at end)
		
		-- Go into the local and remote folders that we want to sync.
		change location of local browser to path localPath
		connect to remoteFavorite
		change location of remote browser to path remotePath
		
		-- Run a sync from the current local folder to the current remote folder
		synchronize local browser to remote browser using skip rules myRules with follow symlinks, automatically determine time offset and compare using size
		-- Close the current window
		close
	end tell
end tell
