jQuery.githubUser = function(username, callback) {
  jQuery.getJSON("http://github.com/api/v1/json/" + username + "?callback=?", callback);
}

$.githubUser('baldowl', function(data) {
  var limit = 5
  var list = $('#github-repos');
  var repos = data.user.repositories;
  repos.sort(function(a, b) {
    return b.watchers - a.watchers;
  });
  $(repos.slice(0, limit)).each(function() {
    list.append('<li><a href="' + this.url + '">' + this.name + '</a></li>');
  });
});
