require 'rubygems'
require 'jekyll'

task :default => :check_yearly_archives

desc "Check yearly archives' consistency"
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

require 'net/http'

desc "Ping Google after a sitemap update"
task :ping do
  pinging_url = "http://www.google.com/webmasters/tools/ping?sitemap=" +
    "http%3A%2F%2Fbaldowl.github.com%2Fsitemap.xml"
  google_response = Net::HTTP.get_response(URI.parse(pinging_url))
  case google_response
  when Net::HTTPOK
    puts "Successfully pinged Google"
  else
    puts "Problems reported by Google: see the response's body\n\n"
    puts google_response.body
  end
end
