'use strict';
(function(module) {
  var reposObj = {};
  reposObj.followers = [];

  reposObj.requestFollowers = function(callback) {
    $.when(
     $.get('/github/users/ellezv/followers')
        .done(function(data) {
          reposObj.followers = data;
          console.log(reposObj.followers);
        })
    ).done(callback);
  };

  reposObj.withTheAttribute = function(attr) {
    return reposObj.allRepos.filter(function(aRepo) {
      return aRepo[attr];
    });
  };

  module.reposObj = reposObj;

})(window);
