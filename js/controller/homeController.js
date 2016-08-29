'use strict';
(function(module) {
  var homeController = {};

  homeController.reveal = function() {
    $('#about-me').fadeOut();
    $('#articles').fadeIn();
  };
  module.homeController = homeController;
})(window);
