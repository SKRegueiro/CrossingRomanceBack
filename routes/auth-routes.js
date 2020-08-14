const express = require('express');
const router = express.Router();
const googleRouter = require('./authentication/googleRouter');
const facebookRouter = require('./authentication/facebookRouter');
const twitterRouter = require('./authentication/twitterRouter')
const instagramRouter = require('./authentication/instagramRouter')


router.use('/google', googleRouter)
router.use('/facebook', facebookRouter)
router.use('/twitter', twitterRouter)

//Not used at the moment
router.use('instagram', instagramRouter)

router.get('/success', (req, res) => {
    res.redirect('http://localhost:8080/')
})
router.get('/failure', (req, res) => res.send('You failed to log in!'))

module.exports = router;