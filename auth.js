const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const con = require('./db');
require('dotenv/config');

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://www.examstudytool.com/google/callback",
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {

        process.nextTick(function() {
            con.query("select * from user1 where user_email = ?;", [profile.emails[0].value], (err, user) => {
                if (err) {
                    return done(err);
                } else if (user && user != 0) {
                    return done(null, user);
                } else {
                    con.query('insert into user1 set user_name = ?, user_email = ?, created_date = now()', [profile.displayName, profile.emails[0].value], (err, rows) => {
                        if (err) {
                            console.log(err);
                        } else {
                            con.query("select * from user1 where user_email = ?;", [profile.emails[0].value], (err, user) => {
                                if (err) {
                                    return done(err);
                                } else if (user && user != 0) {
                                    return done(null, user);
                                }
                            });
                        }
                    })
                }
            });
        });

    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
})

passport.deserializeUser(function(user, done) {
    done(null, user);
})