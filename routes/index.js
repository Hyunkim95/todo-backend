var express = require('express');
var mongoose = require('mongoose');
const Item = require('../model/Item');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  Item.find()
  .then((items) =>{
    res.render('index', {items: items, title: 'To-do List'})
  })
});

router.post('/', function(req,res) {
  let item = new Item()
  item.description = req.body.description
  item.due_date = req.body.due_date
  item.save()
    .then(()=>{
      res.redirect('/')
    })
})

router.post('/:id', function(req,res) {
  Item.findOneAndRemove({_id: req.params.id})
    .then(()=>{
      res.redirect('/')
    })
})

router.get('/api', function(req, res) {
  Item.find()
  .then((items) =>{
    res.json(items)
  })
});

router.post('/api', function(req,res) {
  let item = new Item()
  item.description = req.query.description
  item.due_date = req.query.due_date
  item.save()
    .then(()=>{
      res.json('Successfully Created')
    })
})

router.delete('/api/:id', function(req,res) {
  Item.findOneAndRemove({_id: req.params.id})
    .then(()=>{
      res.json('Successfully Deleted')
    })
})

module.exports = router;
