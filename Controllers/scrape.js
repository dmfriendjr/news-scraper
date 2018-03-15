const cheerio = require('cheerio');
const request = require('request-promise-native');
const express = require('express');
const router = express.Router();

const db = require('../models');

const options = {
  uri: 'https://politics.theonion.com/',
  transform: function (body) {
    return cheerio.load(body);
  }
}

router.get('/scrape', (req, res) => {
  request(options)
  .then(function ($) {
    let promises = [];
    let articles = [];
    $('article.postlist__item').each( (index, element) => {
      let newArticle = {
        title: '',
        link: '',
        content: []
      };
  
      $(element).children('header').children('h1.headline').each( (index, headline) => {
        newArticle.title = $(headline).children('a').text(),
        newArticle.link = $(headline).children('a').attr('href');
      });
  
      let reqOptions = {
        uri: newArticle.link,
        transform: function (body) {
          return cheerio.load(body);
        }
      };

      promises.push(request(reqOptions));
      articles.push(newArticle);
    })

    Promise.all(promises).then((allContent) => {
      console.log('All done!');
      let i = 0;
      let j = 0;
      allContent.forEach(function(content) {
        content('div.post-content').children('p').each( (index, textContent) => {
          articles[i].content.push($(textContent).text());
        });
  
        //Only insert if article has content and is not in db already
        console.log('Length check is:' + articles[i].content.length);
        if (articles[i].content.length !== 0) {
          let currentArticle = articles[i];
          db.Article.find({"title": articles[i].title}, (err, data) => {
            if (data.length === 0) {
              console.log("creating article in db!");
              db.Article.create(currentArticle);
            } 
          });
        }
        i++;
      });
      res.redirect('/');
    });
  });
});


module.exports = router;
