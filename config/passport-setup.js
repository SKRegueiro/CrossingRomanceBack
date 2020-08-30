const passport = require('passport')
const User = require('../models/usersModels')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const keys = require('./keys')
// const InstagramStrategy = require('passport-instagram').Strategy;

passport.deserializeUser(function (user, done) {
    console.log('deserialize')
    User.inDatabase(user)
        .then(result => {
            // console.log('RESULTADO ', result);

            done(null, result)
        })
        .catch(err => done(err, user))
});

passport.serializeUser(function (user, done) {
    console.log('serialize')
    //SHOULD CHANGE EMAIL TO PROVIDER ID
    done(null, user._json.email);
});

passport.use(new GoogleStrategy({
    clientID: keys.google.CLIENT_ID,
    clientSecret: keys.google.CLIENT_SECRET,
    callbackURL: "https://server.crossingpaths.site/auth/google/callback",
    // callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        findUserOrCreate(profile._json)
        return done(null, profile)
    }
));

passport.use(new FacebookStrategy({
    clientID: keys.facebook.CLIENT_ID,
    clientSecret: keys.facebook.SECRET_ID,
    callbackURL: "https://crossingpathsserver.herokuapp.com/auth/facebook/callback",
    // callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name'],
    passReqToCallback: false,
},
    function (accessToken, refreshToken, profile, done) {
        findUserOrCreate(
            {
                given_name: profile._json.first_name,
                family_name: profile._json.last_name,
                email: profile._json.email
            })
        return done(null, profile)
    }
));

passport.use(new TwitterStrategy({
    consumerKey: keys.twitter.CONSUMER_KEY,
    consumerSecret: keys.twitter.CONSUMER_SECRET,
    callbackURL: "https://crossingpathsserver.herokuapp.com/auth/twitter/callback",
    // callbackURL: "http://localhost:3000/auth/twitter/callback"
},
    function (token, tokenSecret, profile, done) {
        //PROBLEMA: USUARIOS NO TIENEN EMAIL
        findUserOrCreate(profile._json)
        return done(null, profile)
    }
));

//Not used at the moment
// passport.use(new InstagramStrategy({
//     clientID: INSTAGRAM_CLIENT_ID,
//     clientSecret: INSTAGRAM_CLIENT_SECRET,
//     callbackURL: "http://127.0.0.1:3000/auth/instagram/callback"
// },
//     function (accessToken, refreshToken, profile, done) {
//         return done(err, user);
//     }
// ));

function findUserOrCreate(user) {
    User.inDatabase(user.email)
        .then(result => {
            if (!result[0]) createUser(user)
        })
        .catch(err => console.log(err));
}

function createUser(user) {
    User.registerProfile({
        name: user.given_name,
        firstName: user.family_name,
        email: user.email
    }).then(result => console.log('User registered'))
        .catch(err => console.log(err))
}


