# Modified from Jason Heppler:
# https://github.com/hepplerj/jekyll-blog/blob/master/Rakefile
# and from Jeff McFadden:
# http://jeffmcfadden.com/blog/2011/04/13/rsync-your-jekyll/

desc 'build and deploy site'
task :default => [:build, :deploy] do
  puts 'Successfully updated website!'
end

desc 'build site using Jekyll'
task :build do
  # builds the site using Jekyll
  # Jekyll will get its configuration from _config.yaml
  puts 'BUILDING SITE USING JEKYLL'
  sh "jekyll --no-auto"
  puts 'Successfully built site!'
end

desc 'deploy to lincolnmullen.com via rsync'
task :deploy do
   # uploads changes via SSH and rsync
   # does NOT delete other files on the server
  puts 'DEPLOYING TO LINCOLNMULLEN.COM'
  sh 'rsync -artze ssh _site/ lam:/home/lincolnm/public_html/jsrdev/'
  puts 'Successfully deployed site!'
end
