import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';
import Educator from './educator_model.mjs';

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
};

// Authorization
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "testing"
}, async (payload, done) => {
    try {
        const educator = await Educator.findById({ _id: payload.sub });
        if (educator) {
            done(null, educator);
        } else {
            done(null, false);
        }
    } catch (err) {
        done(err, false);
    }
}));

// Authenticated local strategy
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const educator = await Educator.findOne({ email: email });
        if (!educator) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        educator.comparePassword(password, (err, isMatch) => {
            if (err) return done(err);
            if (isMatch) return done(null, educator);
            else return done(null, false, { message: 'Incorrect password.' });
        });
    } catch (err) {
        return done(err);
    }
}));

export default passport;
