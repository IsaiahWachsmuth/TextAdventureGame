import { createGameTranscript } from '../models/transcript_model.mjs';

export const createTranscript = async (req, res) => {
    try {
        const { gameId, studentName, playhistory } = req.body;

        // Ensure transcript matches the expected structure
        const formattedTranscript = playhistory.map(entry => ({
            content: entry.content,
            question: entry.question,
            choiceText: entry.choiceText,
            image: entry.image
        }));

        const newTranscript = await createGameTranscript(gameId, studentName, formattedTranscript);

        res.status(201).json(newTranscript);
    } catch (error) {
        console.error('Error creating new transcript:', error);
        res.status(500).json({ message: 'Error creating new transcript' });
    }
};

export const findTranscriptsByGameIdController = async (req, res) => {
    try {
        const { gameId } = req.query;
        const transcripts = await findTranscriptsByGameId(gameId);
        res.json(transcripts);
    } catch (error) {
        console.error('Error fetching transcripts by game ID:', error);
        res.status(500).json({ message: 'Error fetching transcripts by game ID' });
    }
};
