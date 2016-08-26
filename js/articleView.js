'use strict';
(function(module) {
  var articleView = {}; //JUDY: Same thing I advised in article.js to rename this to something other than 'articleView.' Might also be good to just rename your entire JS files too to be more relevant.

  articleView.handleNavMenu = function() {
    $('nav').on('click', '.nav-tab', function() {
      $('.menu-content').hide();
      var $id = $(this).attr('data-content');
      $('main').find('#' + $id).fadeIn();
    });
    $('nav .nav-tab:first').click();
  };

  //JUDY: Style-comment: It would be better to show your pictures first AND THEN have the 'READ MORE' displayed after pics are already being shown. A lazy user might not immediately care to click 'READ MORE' without seeing something interesting first, such as the pictures.
  articleView.handleShowMore = function() {
    $('.article-body').hide(); /*TODO: show only first paragraph */
    $('.screenshots').hide();
    $('article').on('click', '.read-on', function() {
      event.preventDefault();
      console.log('THIS.PARENT', $(this).parent());
      $(this).parent().find('.article-body').show();
      $(this).parent().find('.screenshots').show();
      $(this).html('Show less &rarr;').removeClass('read-on').addClass('show-less');
    });

    $('article').on('click', '.show-less', function() {
      event.preventDefault();
      $(this).parent().find('.article-body').hide();
      $(this).parent().find('.screenshots').hide();
      $(this).html('Read on &rarr;').removeClass('show-less').addClass('read-on');
    });
  };


  articleView.renderIndex = function() {
    Article.allArticles.forEach(function(a) {
      $('#articles').append(a.toHtml('#article-template'));
    });
    articleView.handleNavMenu();
    articleView.handleShowMore();
    //JUDY: I had no idea your pics had this effect until I read this code. Can you use some CSS hover styling so a user can know that the pics are clickable and do this animation? E.g. cursor: pointer, or whatever makes it obvious that the pic should be clicked.
    $('.screenshots').flip(); /* TODO: fix the screenshots. Size and paths*/
  };

  Article.fetchAll(articleView.renderIndex);
  module.articleView = articleView;

})(window);
