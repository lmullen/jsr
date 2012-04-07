desc 'list available rake tasks'
task :default do
	puts 'There is no default task for your own safety.' 
	puts 'Try one of these specific tasks:'
	sh 'rake --tasks --silent'
end

desc 'build development site using Jekyll'
task :devgenerate do
	# builds the site using Jekyll
	# Jekyll will get use URLs passed to command line
	# Jekyll will take other configurations from _config.yml
	puts 'Generating the development site.'
	Rake::Task["bootstrap"].invoke
	sh "jekyll --base-url http://lincolnmullen.com/jsrdev/ --url http://lincolnmullen.com/jsrdev/ --no-auto"
	puts 'Successfully built site!'
end

desc 'deploy development preview with rsync'
task :devdeploy do
	# uploads preview version via SSH and rsync
	# does NOT delete other files on the server
	puts 'Deploying dev preview to <lincolnmullen.com/jsrdev/> with rsync.'
	sh 'rsync -avze --delete ssh _site/ lam:/home/lincolnm/public_html/dev/jsr/'
	puts 'Successfully deployed site!'
end

desc 'generate and deploy the development site'
task :dev => [:devgenerate, :devdeploy] do
	puts 'Generated and deployed the development site in one step.'
end

desc 'preview site locally'
task :preview do
	# Generates the site locally, launches a server, auto regenerates
	# Jekyll gets URLS from options passed to command line
	# Other options are taken from _config.yml
	Rake::Task["bootstrap"].invoke
	puts 'Previewing site with a local server.'
	puts 'See the site at <http://localhost:4000/>.'
	puts 'Use CTRL+C to interrupt.'
	sh 'jekyll --auto --server --base-url / --url /'
	# after the server is interrupted
	puts 'Finished previewing the site locally.'
end

desc 'assemble Bootstrap Javascripts'
task :bootstrap_js do
	# concatenate just the Bootstrap scripts that we need 
	sh 'cat ./_bootstrap/js/bootstrap-dropdown.js ./_bootstrap/js/bootstrap-collapse.js > ./_bootstrap/bootstrap.tmp.js'
	# compress the JavaScript and copy it to our images directory
	sh 'uglifyjs -nc ./_bootstrap/bootstrap.tmp.js > ./assets/js/bootstrap.min.js'
	# remove the temporary file
	sh 'rm ./_bootstrap/bootstrap.tmp.js'
end

desc 'copy Bootstrap images'
task :bootstrap_img do
	# copy the Bootstrap images to our image directory
	sh 'cp ./_bootstrap/img/* ./assets/img/'
end

desc 'compile Bootstrap CSS from LESS'
task :bootstrap_css do
	# compile, compress, and copy main Bootstrap CSS
	sh 'lessc --compress ./_bootstrap/less/bootstrap.less > ./assets/css/bootstrap.min.css'
	# compile, compress, and copy responsive layout CSS
	sh 'lessc --compress ./_bootstrap/less/responsive.less > ./assets/css/bootstrap-responsive.min.css'
end

desc 'update all Bootstrap assets'
task :bootstrap => [:bootstrap_img, :bootstrap_js, :bootstrap_css] do
	puts 'Successfully updated all Bootstrap assets.'
end
