# Modified from Jason Heppler:
# https://github.com/hepplerj/jekyll-blog/blob/master/Rakefile
# and from Jeff McFadden:
# http://jeffmcfadden.com/blog/2011/04/13/rsync-your-jekyll/

desc 'build site'
task :default => [:build] do
  puts 'Successfully updated website!'
end

desc 'build site using Jekyll'
task :build do
  # builds the site using Jekyll
  # Jekyll will get is configuration from _config.yaml
  puts 'BUILDING SITE USING JEKYLL'
  sh "jekyll"
  puts 'Successfully built site!'
end

#desc 'deploy to lincolnmullen.com via rsync'
#task :deploy do
  # uploads changes via SSH and rsync
  # does NOT delete other files on the server
  #puts 'BUILDING AND DEPLOYING TO LINCOLNMULLEN.COM'
  #sh 'time rsync --progress -artze ssh _site/ lam:/home/lincolnm/public_html/'
  #puts 'Successfully deployed site!'
#end
