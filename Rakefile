desc 'generate and deploy the development site'
task :dev => [:dev_gen, :dev_deploy] do
	puts 'Generated and deployed the development site.'
end

task :dev_gen do
	puts 'Generating the development site.'
	sh "jekyll --base-url http://jsreligion.org/dev/ --url http://jsreligion.org/dev/ --no-auto"
	puts 'Successfully built site!'
end

task :dev_deploy do
	# uploads preview version via SSH and rsync
	# does NOT delete other files on the server
	puts 'Deploying dev preview to <jsreligion.org/dev/> with rsync.'
	sh 'rsync --size-only -avze ssh public/ jsr:/home/jsreligi/public_html/dev/'
	puts 'Successfully deployed site!'
end

desc 'generate and deploy the production site'
task :production => [:production_gen, :production_deploy] do
	puts 'Generated and deployed the production site in one step.'
end

task :production_gen do
	puts 'Generating the production site.'
	Rake::Task["assets"].invoke
	sh "jekyll --base-url http://jsr.fsu.edu/ --url http://jsr.fsu.edu --no-auto"
	puts 'Successfully built production site!'
end

task :production_deploy do
	# copies the generated site to the local copy of webdav server
	sh "cp -R public/ ../jsr-production/"
	# uses a Transmit Applescript to sync the local copy to webdav
	sh 'rsync --size-only -avze ssh public/ jsr:/home/jsreligi/public_html/dev/'
end

desc 'preview site locally'
task :preview do
	puts 'Previewing site with a local server.'
	puts 'See the site at <http://localhost:5000/>.'
	puts 'Use CTRL+C to interrupt.'
	sh 'jekyll --auto --server --base-url / --url http://localhost:5000'
	# after the server is interrupted
	puts 'Finished previewing the site locally.'
end

desc 'preview site using POW'
task :pow do
  # Generates the site locally, does not launch a server but uses POW 
  puts 'Regenerating site for POW server.'
  puts 'Use CTRL+C to interrupt.'
  sh 'jekyll --auto  --base-url / --url http://jsr.dev'
  # after the server is interrupted
  puts 'Finished previewing the site with POW.'
end


desc 'generate EPUBs and MOBIs of issues'
task :ebookgen do
  puts 'Generating EPUBs'
  system "jekyll-ebook #{Dir.glob('epubs/*.yml').join(' ')}"
  puts 'Generating MOBIs'
  Dir.glob( '_source/assets/ebooks/*.epub').each do |f|
    system "bin/kindlegen #{f}"
  end
end

desc 'clean generated files in public'
task :clean do
  puts 'Cleaning generated files.'
  # sh 'rm -r ./public/*'
end
