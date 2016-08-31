'use strict';
(function(module) {
  var reposObj = {};
  reposObj.followers = [];

  reposObj.requestFollowers = function(callback) {
    $.when(
     $.get('/github/users/ellezv/followers')
        .done(function(data) {
          reposObj.allRepos = data;
        })
    ).done(callback);
  };

  module.reposObj = reposObj;
})(window);
