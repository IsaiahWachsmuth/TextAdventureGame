// routes/educatorRoutes.mjs
import express from 'express';
import { 
    createEducator, 
    loginEducator, 
    checkAuthenticated, 
    createSession, 
    addGameToEducator
} from '../controllers/educator_controller.mjs';

const router = express.Router();

router.post('/create-educator', createEducator);
router.post('/login', loginEducator);
router.get('/protected', checkAuthenticated);
router.post('/createSession', createSession);
router.post('/addGame', addGameToEducator);

export default router;
