// routes/transcript_routes.mjs
import express from 'express';
import { 
  createTranscript
} from '../controllers/transcript_controller.mjs';

const router = express.Router();

// Setup the routes
router.post('/createTranscript', createTranscript);
// router.get('/', findAllTranscripts);
// router.get('/:transcript_id', findTranscriptById);
// router.delete('/:transcript_id', deleteTranscript);

export default router;
