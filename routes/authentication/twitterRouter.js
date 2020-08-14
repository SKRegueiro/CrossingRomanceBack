const router = require('express').Router();
const passport = require('passport');

router.get('/',
    passport.authenticate('twitter', {
        scope:
            ['profile',
                , 'email']
    }
    ));

router.get('/callback',
    passport.authenticate('twitter', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure',
        session: true
    }));

module.exports = router;