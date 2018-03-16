const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/', (req, res) => {
  db.Article.find({}).populate('comments').then((data) => {
    res.render('index', {articles: data});
  });
});

module.exports = router;