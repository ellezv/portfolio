'use strict';
(function(module) {
  var reposObj = {};

  reposObj.allRepos = [];

  reposObj.requestRepos = function(callback) {

    $.ajax({
      url: 'https://api.github.com/users/ellezv/repos' + '?per_page=5' + '&sort=updated',
      type: 'GET',
      headers: {'Authorization': 'token ' + token},
      success: function(data) {
        reposObj.allRepos = data;
        callback();
      }
    });
  };

  module.reposObj = reposObj;
})(window);
