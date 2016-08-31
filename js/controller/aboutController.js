'use strict';
(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('#articles').hide();
    $('#about-me').show();
  };

  module.aboutController = aboutController;
})(window);
