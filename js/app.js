var articles = [];

/* Object constructor based on my data*/
function Article(obj) {
  this.author = obj.author;
  this.publishedOn = obj.publishedOn;
  this.title = obj.title;
  this.body = obj.body;
  this.category = obj.category;
}

Article.prototype.toHtml = function() {
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  var source = $('#article-template').html();
  var templateRender = Handlebars.compile(source);


  return templateRender(this);



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
