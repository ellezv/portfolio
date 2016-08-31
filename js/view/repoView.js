'use strict';
(function(module) {
  var repoView = {};
  var repoCompiler = Handlebars.compile($('#about-me-template').text());

  repoView.renderFollowers = function() {
    reposObj.followers.forEach(function() {
      $('#about-me').append(repoCompiler); //TODO : FIGURE THIS SHIT OUT!!!
    });
  };

  reposObj.requestFollowers(reposView.renderFollowers);
})(window);
