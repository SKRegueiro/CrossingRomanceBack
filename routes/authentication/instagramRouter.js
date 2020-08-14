//NOT USED AT THE MOMENT

const router = require('express').Router();
const passport = require('passport');

router.get('/',
    passport.authenticate('instagram', {
        scope:
            ['profile',
                , 'email']
    }
    ));

router.get('/callback',
    passport.authenticate('instagram', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

module.exports = router;