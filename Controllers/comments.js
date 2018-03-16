const express = require('express');
const router = express.Router();
const db = require('../models');
const mongoose = require('mongoose')

router.post('/comments', (req, res) => {
  console.log(req.body);
  db.Comment.create({'body': req.body.comment}).then(comment => {
    console.log('Comment id:', mongoose.Types.ObjectId(comment._id));
    db.Article.findOneAndUpdate({'_id': mongoose.Types.ObjectId(req.body.article)},
     {$push: {comments: mongoose.Types.ObjectId(comment._id)}}).then(article => {
      res.redirect('/');
    });
  });
})

router.delete('/comments/:id', (req, res) => {
  db.Comment.deleteOne({'_id': mongoose.Types.ObjectId(req.params.id)}).then( () => {
    res.end();
  })
})


module.exports = router;