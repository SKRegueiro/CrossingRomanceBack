const router = require('express').Router();
const passport = require('passport');

router.get('/',
    passport.authenticate('google', {
        scope:
            ['profile',
                , 'email']
    }));

router.get('/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

module.exports = router;