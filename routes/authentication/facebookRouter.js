const router = require('express').Router();
const passport = require('passport');

router.get('/',
    passport.authenticate('facebook', { scope: ['email'] }
    ));

router.get('/callback',
    passport.authenticate('facebook', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure',
        session: true
    }));

module.exports = router;