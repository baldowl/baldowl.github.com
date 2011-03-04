require 'rubygems'
require 'jekyll'

task :default => 'archives:years:check'

namespace :archives do
  namespace :years do
    desc "Check year archives' consistency"
    task :check do
      puts "Checking year archives..."
      published_years = gathered_data.posts.map {|p| p.date.year}.uniq.sort
      archived_years = Dir.glob('archives/years/*').map {|f| File.basename(f).to_i}

      ghost_archives = archived_years - published_years
      puts "Unneeded year archives: #{ghost_archives.join(', ')}" unless ghost_archives.empty?

      missing_archives = published_years - archived_years
      puts "Missing year archives: #{missing_archives.join(', ')}" unless missing_archives.empty?
    end

    desc "Build the YEAR archive"
    task :build, :year do |t, args|
      if args.year
        page = "archives/years/#{args.year}/index.html"
        unless File.file?(page)
          FileUtils.mkdir_p File.dirname(page)
          File.open page, 'w' do |f|
            f.puts "---
layout: default
---
{% assign archive_year = '#{args.year}' %}
{% include year.html %}"
          end
        else
          puts "#{args.year} archive already exists; nothing to do"
        end
      else
        puts 'Missing year; nothing to do'
      end
    end
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
