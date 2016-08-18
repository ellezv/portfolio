var articleView = {};

articleView.handleNavMenu = function() {
  $('nav').on('click', '.nav-tab', function() {
    $('.menu-content').hide();
    var $id = $(this).attr('data-content');
    $('main').find('#' + $id).fadeIn();
  });
  $('nav .nav-tab:first').click();
};

articleView.handleShowMore = function() {
  $('.article-body').hide();
  $('article').on('click', '.read-on', function() {
    event.preventDefault();
    console.log('THIS.PARENT', $(this).parent());
    $(this).parent().find('.article-body').show();
    $(this).html('Show less &rarr;').removeClass('read-on').addClass('show-less');
  });

  $('article').on('click', '.show-less', function() {
    event.preventDefault();
    $(this).parent().find('.article-body').hide();
    $(this).html('Read on &rarr;').removeClass('show-less').addClass('read-on');
  });
};

articleView.handleNavMenu();
articleView.handleShowMore();