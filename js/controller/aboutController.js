'use strict';
(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('#articles') .fadeOut();
    $('#about-me').fadeIn();
  };

  module.aboutController = aboutController;
})(window);
