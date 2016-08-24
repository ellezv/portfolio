'use strict';
(function(module) {
  function Article(obj) {
    for ( var key in obj) {
      this[key] = obj[key];
    }
  };

  Article.allArticles = [];

  Article.prototype.toHtml = function() {
    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    var source = $('#article-template').text();
    var templateRender = Handlebars.compile(source);

    return templateRender(this);
  };

  Article.loadAll = function(inputData) {
    Article.allArticles = inputData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    }).map(function(ele) {
      return new Article(ele);
    });
  };

  Article.fetchAll = function(nextFunction) {
    if (localStorage.projects) {
      $.ajax({
        type: 'HEAD',
        url: 'data/projects.json',
        success: function(data, message, xhr) {
          var eTag = xhr.getResponseHeader('eTag');
          if (!localStorage.eTag || eTag !== localStorage.eTag) {
            Article.getAll(nextFunction);
          } else {
            Article.loadAll(JSON.parse(localStorage.projects));
            nextFunction();
          }
        }
      });
    } else {
      Article.getAll(nextFunction);
    }
  };

  Article.getAll = function(nextFunction) {
    $.getJSON('data/projects.json', function(data, message, xhr) {
      localStorage.eTag = xhr.getResponseHeader('eTag');
      Article.loadAll(data);
      localStorage.projects = JSON.stringify(data);
      nextFunction();
    });
  };

//here is my reduce function but I don't need it on my portfolio.
  Article.numWordsAll = function() {
    return Article.allArticles.map(function(currentArticle) {
      return currentArticle.body.match(/\w+/g).length;
    }).reduce(function(prev,cur){
      return prev + cur;
    });
  };

  module.Article = Article;
})(window);
