require 'rubygems'
require 'jekyll'

task :default => ['archives:years:check', 'archives:tags:check']

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

      year_list = File.read('_includes/year_list.html')
      published_years.each do |year|
        puts "Missing year reference: #{year}" if year_list.lines.grep(Regexp.new(year.to_s)).empty?
      end
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
title: Archive of #{args.year} posts
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

  namespace :tags do
    desc "Check tag archives' consistency"
    task :check do
      puts "Checking tag archives..."
      published_tags = gathered_data.posts.map {|p| p.tags}.flatten.uniq.sort
      archived_tags = Dir.glob('archives/tags/*').map {|f| File.basename(f)}

      ghost_archives = archived_tags - published_tags
      puts "Unneeded tag archives: #{ghost_archives.join(', ')}" unless ghost_archives.empty?

      missing_archives = published_tags - archived_tags
      puts "Missing tag archives: #{missing_archives.join(', ')}" unless missing_archives.empty?
    end

    desc "Build the TAG archive"
    task :build, :tag do |t, args|
      if args.tag
        page = "archives/tags/#{args.tag}/index.html"
        unless File.file?(page)
          FileUtils.mkdir_p File.dirname(page)
          File.open page, 'w' do |f|
            f.puts "---
layout: default
title: Archive of \"#{args.tag}\" posts
---
{% assign archive_tag = '#{args.tag}' %}
{% include tag.html %}"
          end
        else
          puts "#{args.tag} archive already exists; nothing to do"
        end
      else
        puts 'Missing tag; nothing to do'
      end
    end
  end
end

def gathered_data
  old_stdout = $stdout.clone
  $stdout.reopen('/dev/null')
  $stdout.sync = true
  @site ||= Jekyll::Site.new(Jekyll.configuration({}))
  @site.read_directories
  $stdout.reopen old_stdout
  @site
end

require 'cgi'
require 'net/http'

desc "Ping Google after a sitemap update"
task :ping do
  pinging_url = "http://www.google.com/webmasters/tools/ping?sitemap=" +
    CGI.escape("http://baldowl.github.io/sitemap.xml")
  google_response = Net::HTTP.get_response(URI.parse(pinging_url))
  case google_response
  when Net::HTTPOK
    puts "Successfully pinged Google"
  else
    puts "Problems reported by Google: see the response's body\n\n"
    puts google_response.body
  end
end
