$.github = {};

$.github.repos = function(username, callback) {
  $.getJSON("http://github.com/api/v2/json/repos/show/" + username +
    "?callback=?", callback);
}

$.github.repos('baldowl', function(data) {
  var limit = 5
  var list = $('#github-repos');
  var repos = data.repositories;
  repos.sort(function(a, b) {
    return b.watchers - a.watchers;
  });
  $(repos.slice(0, limit)).each(function() {
    list.append('<li><a href="' + this.url + '">' + this.name + '</a></li>');
  });
});
