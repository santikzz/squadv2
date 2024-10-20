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
        },
        async (accessToken, refreshToken, profile, done) => {
            // find or create a user in the database based on the Google profile
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) {
                return done(null, existingUser);
            }
            console.log(profile);
            const newUser = new User({
                googleId: profile.id,
                name: profile.displayName,
                surname: '',
                email: profile.emails[0].value,
            });
            await newUser.save();
            done(null, newUser);
        }
    )
);

// serialize and deserialize user for session management
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
