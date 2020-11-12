const passport = require("passport");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");
const GOOGLE_APP_ID = process.env.GOOGLE_APP_ID;
const GOOGLE_APP_SECRET = process.env.GOOGLE_APP_SECRET;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});


passport.use(
    // 1st arg is configuration
    new FacebookTokenStrategy(
        {
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
        },
        // verification function (callback)
        async (accessToken, refreshToken, profile, done) => {
            try {
                if (profile.emails && profile.emails[0].value) {
                    // Extract the minimal profile information we need from the profile object
                    const user = {
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        provider: "facebook",
                        id: profile.id,
                    };
                    return done(null, user);
                } else {
                    done(null, false);
                }
            } catch (err) {
                console.log("FACEBOOK TOKEN STRATEGY", err);
                return done(err, null);
            }
        }
    )
);


passport.use(
    // 1st arg is configuration
    new GoogleTokenStrategy(
        {
            clientID: GOOGLE_APP_ID,
            clientSecret: GOOGLE_APP_SECRET,
        },
        // verification function (callback)
        async (accessToken, refreshToken, profile, done) => {
            try {
                if (profile.emails && profile.emails[0].value) {
                    // Extract the minimal profile information we need from the profile object
                    const user = {
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        provider: "google",
                        googleID: profile.id,
                    };
                    return done(null, user);
                } else {
                    done(null, false);
                }
            } catch (err) {
                console.log("GOOGLE TOKEN STRATEGY", err);
                return done(err, null);
            }
        }
    )
);
