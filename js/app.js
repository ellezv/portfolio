/* Object constructor based on my data*/
function Article(obj) {
  for (keys in obj) {
    this[keys] = obj[keys];
  }
}

Article.allArticles = [];

Article.prototype.toHtml = function() {
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  var source = $('#article-template').text();
  var templateRender = Handlebars.compile(source);

  return templateRender(this);
};


/* sort method so object in myLocalData array with most recent publishedOn(=property) date (=value) will be first in the array */
Article.loadAll = function(inputData) {
  inputData.sort(function(a, b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });
};

Article.fetchAll = function() {
  if (localStorage.projects) {
    Article.loadAll(JSON.parse(localStorage.projects));
    articleView.renderIndex();
  }else {
    $.getJSON('data/projects.json', function(a) {
      Article.loadAll(a);
      localStorage.projects = JSON.stringify(a);
      articleView.renderIndex();
    }
  }
}
