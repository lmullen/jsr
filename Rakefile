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
	sh "jekyll --base-url http://lincolnmullen.com/jsrdev/ --url http://lincolnmullen.com/jsrdev/ --no-auto"
	puts 'Successfully built site!'
end

desc 'deploy development preview with rsync'
task :devdeploy do
	# uploads preview version via SSH and rsync
	# does NOT delete other files on the server
	puts 'Deploying dev preview to <lincolnmullen.com/jsrdev/> with rsync.'
	sh 'rsync -artze ssh _site/ lam:/home/lincolnm/public_html/jsrdev/'
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
	puts 'Previewing site with a local server.'
	puts 'See the site at <http://localhost:4000/>.'
	puts 'Use CTRL+C to interrupt.'
	sh 'jekyll --auto --server --base-url / --url /'
	# after the server is interrupted
	puts 'Finished previewing the site locally.'
end
