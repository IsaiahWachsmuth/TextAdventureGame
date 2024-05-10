// server/routes/educatorRoutes.mjs
import express from 'express';
import { 
    createEducator, 
    loginEducator, 
    createSession, 
    addGameToEducator,
    getAdventuresByEducator
} from '../controllers/educator_controller.mjs';

import { checkAuthenticated } from '../middleware/authMiddleware.mjs';

const router = express.Router();

// Public routes
router.post('/create-educator', createEducator);
router.post('/login', loginEducator);

// Protected routes
router.get('/protected', checkAuthenticated); // wut dis do?

router.get('/dashboard', checkAuthenticated, (req, res) => {
    res.status(200).json({ message: 'Hello', user: req.user });
});
router.post('/createSession', checkAuthenticated, createSession);
router.post('/addGame', checkAuthenticated, addGameToEducator);

router.get('/:id/adventures', checkAuthenticated, getAdventuresByEducator);
export default router;
