# frozen_string_literal: true

source 'https://rubygems.org'

gem 'jekyll', '~> 4.3'

group :jekyll_plugins do
  gem 'jekyll-seo-tag', '~> 2.8'
  gem 'jekyll-sitemap', '~> 1.4'
end

# Build-time only: the link check in CI. script/fetch-releases.rb uses only
# stdlib (net/http + json), so it runs before `bundle install` if it has to.
gem 'html-proofer', '~> 5.0'
