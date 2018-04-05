const express = require('express');
const router = express.Router();
const Story = require('../models/story');

router.get('/storyes', function(req, res, next) {
  Story.find({}).then(function(notes) {
    res.send(notes);
  }).catch(function(next) {
    res.send({error: '500'});
  });
});

router.post('/storyes', function(req, res, next) {
  Story.create(req.body).then(function(story) {
    res.send(story);
  }).catch(function(next) {
    res.send({error: '500'});
  });
});

router.put('/storyes/:id', function(req, res, next) {
  Story.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
    Story.findOne({_id: req.params.id}).then(function(story) {
      res.send(story);
    }).catch(function(next) {
      res.send({error: '404'});
    });
  }).catch(function(next) {
    res.send({error: '500'});
  });
});

module.exports = router;