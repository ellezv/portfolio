var articles = [];

/* Object constructor based on my data*/
function Article(obj) {
  this.author = obj.author;
  this.publishedOn = obj.publishedOn;
  this.title = obj.title;
  this.body = obj.body;
  this.category = obj.category;
}

/* method for my Article object constructor so it will have my data*/
Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  $newArticle.find('.byline span').text(this.author);
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');
  $newArticle.find('h1').html(this.title);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.attr('data-category', this.category);

  $newArticle.removeClass('template'); /* removing class so display changes from none to block */
  return $newArticle;
};

/* sort method so object in myLocalData array with most recent publishedOn(=property) date (=value) will be first in the array */
myLocalData.sort(function(a, b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

/*  for each object in myLocalData array, create a new object with Article obj constructor, then push it to the articles array */
myLocalData.forEach(function(obj) {
  articles.push(new Article(obj));
});

/* appending each article to my html as a new <article> within my #articles section*/
articles.forEach(function(a) {
  $('#articles').append(a.toHtml());
});
