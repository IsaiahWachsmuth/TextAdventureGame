// server/middleware/authMiddleware.mjs

import passport from 'passport';

// Check if the user is authenticated
export const checkAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: "Error in authentication", err });
        }
        if (!user) {
            return res.status(401).json({ message: "No user found" });
        }
        req.user = user; // Attach user to the request object
        next();
    })(req, res, next);
};

// Check if the user is logged in (session-based)
export const checkLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "You need to log in" });
};
