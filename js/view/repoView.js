'use strict';
(function(module) {
  var repoView = {};
  var repoCompiler = Handlebars.compile($('#repo-template').text());

  repoView.renderRepos = function() {
    $('#about-me').append(repoCompiler); //TODO : FIGURE THIS SHIT OUT!!!

  };

  reposObj.requestRepos(repoView.renderRepos);
})(window);
