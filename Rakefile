desc "Preview the site locally"
task :default => :preview

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

desc 'generate and deploy the production site'
task :production => [:production_gen]

#helper functions
task :js do
	# concatenate just the scripts that we need 
	sh 'cat ./_bootstrap/js/bootstrap-dropdown.js ./_bootstrap/js/bootstrap-collapse.js ./_bootstrap/js/bootstrap-tooltip.js ./_bootstrap/js/bootstrap-popover.js ./_source/assets/audio-player/audio-player.js ./_footnotify/footnotify.js > ./_bootstrap/jsr.tmp.js'
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

desc 'generate EPUBs and MOBIs of issues'
task :ebookgen do
  puts 'Generating EPUBs'
  system "jekyll-ebook #{Dir.glob('epubs/*.yml').join(' ')}"
  puts 'Generating MOBIs'
  Dir.glob( '_source/assets/ebooks/*.epub').each do |f|
    system "bin/kindlegen #{f}"
  end
end

desc 'update all assets'
task :assets => [:mediaelement] do
	puts 'Successfully updated all assets.'
end

desc 'tidy HTML in public'
task :tidy do
	puts 'Tidying the HTML in public/.'
	sh 'find ./public/ -type f -name "*.html" -exec tidy -config _tidy.config -modify -i {} \;'
	puts 'Done tidying.'
end

desc 'clean generated files in public'
task :clean do
  puts 'Cleaning generated files.'
  sh 'rm -r ./public/*'
end

desc 'Preview using compass'
task :preview => [:assets] do

  puts "Previewing the site locally with Jekyll and Compass."

  system "compass compile"
  jekyllPid  = Process.spawn("jekyll --auto --server --base-url / --url http://localhost:4000")
  compassPid = Process.spawn("compass watch")

  trap("INT") {
    [jekyllPid, compassPid].each { |pid| Process.kill(9, pid) rescue Errno::ESRCH }
    exit 0
  }

  [jekyllPid, compassPid].each { |pid| Process.wait(pid) }

end

