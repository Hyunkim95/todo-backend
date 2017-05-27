var express = require('express');
var mongoose = require('mongoose');
const Item = require('../model/Item');
var router = express.Router();

// Get all Items on localhost
router.get('/', function(req, res) {
  Item.find()
  .then((items) =>{
    res.render('index', {items: items, title: 'To-do List'})
  })
});

// Post an Item on localhost
router.post('/', function(req,res) {
  let item = new Item()
  item.description = req.body.description
  item.due_date = req.body.due_date
  item.save()
    .then(()=>{
      res.redirect('/')
    })
})

// Delete an Item
router.post('/:id', function(req,res) {
  Item.findOneAndRemove({_id: req.params.id})
    .then(()=>{
      res.redirect('/')
    })
})

// Get all items through API
router.get('/api', function(req, res) {
  Item.find()
  .then((items) =>{
    res.json(items)
  })
});

// Post items through API
router.post('/api/item', function(req,res) {
  let item = new Item()
  item.description = req.query.description;
  item.due_date = req.query.due_date
  item.save()
    .then(() => {
      res.json('Successfully Created')
    })
})

// Delete items through API
router.delete('/api/:id', function(req,res) {
  Item.findOneAndRemove({_id: req.params.id})
    .then(()=>{
      res.json('Successfully Deleted')
    })
})

module.exports = router;
