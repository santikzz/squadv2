const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const config = require('../config');

passport.use(
    new GoogleStrategy(
        {
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL,
            scope: ['profile', 'email'],
        },
        async (accessToken, refreshToken, profile, done) => {
            // find or create a user in the database based on the Google profile
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
                user = new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    surname: '',
                    email: profile.emails[0].value,
                });
                await user.save();
            }
            done(null, user);
        }
    )
);

// serialize and deserialize user for session management
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});