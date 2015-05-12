desc 'generate and deploy the development site'
task :dev => [:dev_gen, :dev_deploy] do
	puts 'Generated and deployed the development site.'
end

task :dev_gen do
	puts 'Generating the development site.'
  sh 'jekyll build --config _config.yml,_config-dev.yml'
end

task :dev_deploy do
	puts 'Deploying dev preview to <jsreligion.org/dev/> with rsync.'
  sh 'rsync -avzpe ssh public/ jsreligi@jsreligion.org:/home/jsreligi/public_html/dev/'
end

desc 'generate and deploy the production site'
task :production => [:check_deploy, :production_gen, :production_deploy] do
	puts 'Generated and deployed the production site.'
end

task :check_deploy do
  puts "Are you sure that you want to deploy to production? (yes to proceed)"
  input = STDIN.gets.strip
  if input != "yes"
    abort("You didn't confirm that you want to deploy to production.")
  end
end

task :production_gen do
	puts 'Generating the production site.'
  sh 'jekyll build --config _config.yml,_config-production.yml'
end

task :production_deploy do
	sh "cp -R public/* ../jsr-production/"
  sh 'rsync --exclude=dev/ -avze ssh public/ jsreligi@jsreligion.org:/home/jsreligi/public_html/'
end

desc 'preview site locally'
task :preview do
  sh 'jekyll serve --watch --config _config.yml'
end

desc 'preview site using POW'
task :pow do
  sh 'jekyll build --watch --config _config.yml,_config-pow.yml'
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

