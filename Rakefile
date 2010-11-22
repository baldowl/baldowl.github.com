require 'rubygems'
require 'jekyll'

task :default => :check_yearly_archives

task :check_yearly_archives do
  puts "Checking yearly archives..."
  published_years = gathered_data.posts.map {|p| p.date.year}.uniq.sort
  archived_years = Dir.glob('archives/years/*').map {|f| File.basename(f).to_i}

  ghost_archives = archived_years - published_years
  puts "Unneeded year archives: #{ghost_archives.join(', ')}" unless ghost_archives.empty?

  missing_archives = published_years - archived_years
  puts "Missing year archives: #{missing_archives.join(', ')}" unless missing_archives.empty?

  unless !ghost_archives.empty? || !missing_archives.empty?
    puts "Nothing to do"
  end
end

def gathered_data
  old_stdout = $stdout.clone
  $stdout.reopen('/dev/null')
  $stdout.sync
  @site ||= Jekyll::Site.new(Jekyll.configuration({}))
  @site.read_posts ''
  $stdout.reopen old_stdout
  @site
end
