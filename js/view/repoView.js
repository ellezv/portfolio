'use strict';
(function(module) {
  var repoView = {};
  var repoCompiler = Handlebars.compile($('#about-me-template').text());
  console.log(repoCompiler);

  repoView.renderRepos = function() {
    $('#about-me').append(
      reposObj.followers.map(repoCompiler)
    );
  };

  reposObj.requestFollowers(repoView.renderRepos);
  module.repoView = repoView;
})(window);
