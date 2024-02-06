const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Educator = require('./educator_model.mjs');
const JwtStrategy = require('passport-jwt').Strategy;

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
}

// authorization
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "testing"
}, (payload, done) => {
    Educator.findById({ _id: payload.sub }, (err, educator) => {
        if (err) {
            return done(err, false);
        }
        if (educator) {
            return done(null, educator);
        } else {
            return done(null, false);
        }
    });
}));

// authenticated local strategy
passport.use(new LocalStrategy((email, password, done) => {
    Educator.findOne({ email: email }, (err, educator) => {
        if (err) {
            return done(err);
        }
        if(!educator) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        educator.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(null, educator);
            }
            return done(null, false, { message: 'Incorrect password.' });
        });
    });
}));

