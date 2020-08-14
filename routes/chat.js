var router = require('express').Router();
var Chat = require('../models/chatModels');

router.post('/getChat', function (req, res) {
    //This should aldo call Chat and update the messages seen status. Maybe identifying then by an id
    Chat.getChatHistory(req.body.recipientEmail)
        .then(result => res.json(result))
        .catch(err => console.log(err))
});

router.post('/storeMsg', function (req, res) {
    Chat.storeMessage(req.body)
        .then(result => res.json(result))
        .catch(err => console.log(err))
})

router.post('/lastMessage', function (req, res) {
    Chat.getLastChat(req.body.recipientEmail)
        .then(result => res.json(result))
        .catch(err => console.log(err))
})

module.exports = router;