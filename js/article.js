'use strict';

//JUDY: I would rename your object constructor to something other than "Article," since technically, the projects aren't articles. Rick always stresses proper naming of things and to be specific as possible, so another person doesn't get confused. If a new dev came in, knowing the website is a portfolio of your projects, but all the objects are called 'Articles', it might be briefly confusing. Of course, they'll get over their confusion once they realize what 'Article' is but best to avoid that initial confusion. No further suggestions as to functionality, it all looks great.

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

//JUDY: Suggestion to try to use map/reduce in a practical way - You've mentioned you have other projects outside of Codefellows you have worked on. Even if you don't want to show them on your site now, you can still add them as objects to projects.json, and maybe give them a different category, i.e. 'Other'. Or, once we start creating our own projects in 301, you'll have a new 301 category anyway. Then you can create the new object(s) and just map/reduce out your projects according to their category, or whatever other property you want, and display them accordingly however you want on your site. 

//here is my reduce function but I don't need it on my portfolio.
//TODO: make it actually do something for the portfolio.
  Article.numWordsAll = function() {
    return Article.allArticles.map(function(currentArticle) {
      return currentArticle.body.match(/\w+/g).length;
    }).reduce(function(prev,cur){
      return prev + cur;
    });
  };

  module.Article = Article;
})(window);


/*TODO: Admin page with form to add another project?
Google analytics?*/
