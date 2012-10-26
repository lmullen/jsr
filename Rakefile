desc 'list available rake tasks'
task :default do
	puts 'There is no default task for your own safety.' 
	puts 'Try one of these specific tasks:'
	sh 'rake --tasks --silent'
end

#generate and deploy tasks
desc 'build development site using Jekyll'
task :dev_gen do
	# builds the site using Jekyll
	# Jekyll will get use URLs passed to command line
	# Jekyll will take other configurations from _config.yml
	puts 'Generating the development site.'
	Rake::Task["assets"].invoke
	sh "jekyll --base-url http://lincolnmullen.com/dev/jsr/ --url http://lincolnmullen.com/dev/jsr --no-auto"
	Rake::Task["tidy"].invoke
	puts 'Successfully built site!'
end

desc 'deploy development site with rsync'
task :dev_deploy do
	# uploads preview version via SSH and rsync
	# does NOT delete other files on the server
	puts 'Deploying dev preview to <lincolnmullen.com/dev/jsr/> with rsync.'
	sh 'rsync -avze ssh _site/ lam:/home/lincolnm/public_html/dev/jsr/'
	puts 'Successfully deployed site!'
end

desc 'generate and deploy the development site'
task :dev => [:dev_gen, :dev_deploy] do
	puts 'Generated and deployed the development site in one step.'
end

desc 'generate staging site'
task :staging_gen do
	# builds the site using Jekyll
	# Jekyll will get use URLs passed to command line
	# Jekyll will take other configurations from _config.yml
	puts 'Generating the staging site.'
	Rake::Task["assets"].invoke
	sh "jekyll --base-url http://staging.jsr.fsu.edu/ --url http://staging.jsr.fsu.edu --no-auto"
	Rake::Task["tidy"].invoke
	puts 'Successfully built staging site!'
end

desc 'generate production site'
task :production_gen do
	# builds the site using Jekyll
	# Jekyll will get use URLs passed to command line
	# Jekyll will take other configurations from _config.yml
	puts 'Generating the production site.'
	Rake::Task["assets"].invoke
	sh "jekyll --base-url http://jsr.fsu.edu/ --url http://jsr.fsu.edu --no-auto"
	Rake::Task["tidy"].invoke
	puts 'Successfully built production site!'
end

desc 'copy production site to synced directory and put on server'
task :production_deploy do
	# copies the generated site to the local copy of webdav server
	sh "cp -R _site/ ../jsr-production/"
	# uses a Transmit Applescript to sync the local copy to webdav
	sh 'osascript transmit-production.applescript'
end

desc 'generate and deploy the production site'
task :production => [:production_gen, :production_deploy] do
	puts 'Generated and deployed the production site in one step.'
end

desc 'preview site locally'
task :preview do
	# Generates the site locally, launches a server, auto regenerates
	# Jekyll gets URLS from options passed to command line
	# Other options are taken from _config.yml
	Rake::Task["assets"].invoke
	puts 'Previewing site with a local server.'
	puts 'See the site at <http://localhost:5000/>.'
	puts 'Use CTRL+C to interrupt.'
	sh 'jekyll --auto --server --base-url / --url http://localhost:5000'
	# after the server is interrupted
	puts 'Finished previewing the site locally.'
end

#helper functions

desc 'assemble Bootstrap and other Javascripts'
task :js do
	# concatenate just the scripts that we need 
	sh 'cat ./_bootstrap/js/bootstrap-dropdown.js ./_bootstrap/js/bootstrap-collapse.js ./_bootstrap/js/bootstrap-tooltip.js ./_source/assets/audio-player/audio-player.js ./_footnotify/footnotify.js > ./_bootstrap/jsr.tmp.js'
	# compress the JavaScript and copy it to our js directory
	sh 'uglifyjs -nc ./_bootstrap/jsr.tmp.js > ./_source/assets/js/jsr.min.js'
	# remove the temporary file
	sh 'rm ./_bootstrap/jsr.tmp.js'
end

desc 'copy images'
task :img do
	# copy the Bootstrap images to our image directory
	sh 'cp ./_bootstrap/img/* ./_source/assets/img/'
end

desc 'compile CSS from LESS '
task :css do
	# compile, compress, and copy main Bootstrap CSS
	sh 'lessc --compress ./_bootstrap/less/bootstrap.less > ./_source/assets/css/bootstrap.min.css'
	# compile, compress, and copy responsive layout CSS
	sh 'lessc --compress ./_bootstrap/less/responsive.less > ./_source/assets/css/bootstrap-responsive.min.css'
end

desc 'copy necessary mediaelement files'
task :mediaelement do
	# copy the build directory
	sh 'cp -R _mediaelement/build _source/assets/mediaelement'
end

desc 'update all assets'
task :assets => [:img, :js, :css, :mediaelement] do
	puts 'Successfully updated all assets.'
end

desc 'tidy HTML in _site'
task :tidy do
	puts 'Tidying the HTML in _site/.'
	sh 'find ./_site/ -type f -name "*.html" -exec tidy -config _tidy.config -modify -i {} \;'
	puts 'Done tidying.'
end

desc 'clean generated files in _site'
task :clean do
  puts 'Cleaning generated files.'
  sh 'rm -r ./_site/*'
end
