'use strict';
(function(module) {
  var repoView = {};
  var repoCompiler = Handlebars.compile($('#repo-template').text());

  repoView.renderRepos = function() {
    $('#about ul').empty().append(
      reposObj.withTheAttribute('name')
      .map(repoCompiler)
    );
  };

  reposObj.requestRepos(repoView.renderRepos);
})(window);
