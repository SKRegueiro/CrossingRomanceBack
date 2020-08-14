var router = require('express').Router();
var Users = require('../models/usersModels')

router.post('/', function (req, res) {
  Users.getNewUser(req.body.limit, req.user[0].id)
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

router.post('/registerProfile', function (req, res) {
  Users.addProfile(req.body)
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

router.post('/like', async function (req, res) {
  var result = await Users.like(req.body, req.user[0].id).catch(err => console.log(err))
  res.json(result)
})

router.post('/likesBack', function (req, res) {
  Users.likesBack(req.body.likedId, req.user[0].id)
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

router.get('/matches', function (req, res) {
  Users.getMatches(req.user[0].id)
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

router.post('/getUser', function (req, res) {
  Users.findById(req.body.id)
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

router.get('/current', function (req, res) {
  res.send(req.user)
})
module.exports = router;
