// src/api/controllers/educatorController.mjs
import Educator from '../models/educator_model.mjs';
import passport from 'passport';
import JWT from 'jsonwebtoken';

// Create a new educator
export const createEducator = async (req, res) => {
    try {
        const { name } = req.body;
        const existingEducator = await Educator.findOne({ name });

        if (existingEducator) {
            return res.status(400).json({ success: false, error: 'Educator with this name already exists' });
        }

        const educator = new Educator(req.body);
        await educator.save();
        res.status(201).json({ success: true, educator });
    } catch (error) {
        console.error('Error creating educator:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

// Handle educator login
export const loginEducator = (req, res, next) => {
    console.log("LOGIN EDUCATOR");
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(400).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json({ message: 'Logged in successfully' });
        });
    })(req, res, next);
};

// Check if the educator is authenticated
export const checkAuthenticated = (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ status: 'success', message: 'You are authenticated' });
    } else {
        res.status(401).json({ status: 'error', message: 'You are not authenticated' });
    }
};

// Create session for authenticated educator
export const createSession = async (req, res) => {
    if(req.isAuthenticated()){
        const { _id, name, email } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: { name, email } });
    }
};

// Utility function to sign JWT token
const signToken = userId => {
    return JWT.sign(
        {
            iss: "testing",
            sub: userId
        },
        "testing", // This should be replaced with a process.env variable in production
        { expiresIn: "1h" }
    );
};
