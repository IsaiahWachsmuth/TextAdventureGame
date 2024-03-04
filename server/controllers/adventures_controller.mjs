// server/controllers/adventures_controller.mjs
import fs from 'fs';
import * as games from '../models/adventures_model.mjs';


// Create a new game
export const createGame = async (req, res) => {
    try {
        const classCode = await generateUniqueClassCode();
        const { title, description, author, pages } = req.body;

        let imageBase64 = null;
        if (req.file) {
            // Convert image to Base64 string
            const imgBuffer = fs.readFileSync(req.file.path);
            imageBase64 = imgBuffer.toString('base64');
            // Optionally delete the file after conversion
            fs.unlinkSync(req.file.path);
        }

        const game = await games.createGame(classCode, title, description, author, pages, imageBase64 );
        res.status(201).json(game);
    } catch (error) {
        console.error('Error creating new game:', error);
        res.status(500).json({ message: 'Error creating new game' });
    }
};

// List all games
export const findAllGames = async (req, res) => {
    try {
        const allGames = await games.findAllGames();
        res.json(allGames);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({ Error: 'Failed to fetch games' });
    }
};

// Find game by ID
export const findGameById = async (req, res) => {
    try {
        const game = await games.findGameById(req.params.game_id);
        if (game) {
            res.json(game);
        } else {
            res.status(404).json({ Error: 'Game not found' });
        }
    } catch (error) {
        console.error('Error finding game:', error);
        res.status(500).json({ Error: 'Request failed' });
    }
};

/* SAVE
// Update a game
export const updateGame = async (req, res) => {
    try {
        const { title, description, author, pages } = req.body;
        const updatedGame = await games.updateGame(req.params.game_id, { title, description, author, pages });

        if (updatedGame) {
            res.json(updatedGame);
        } else {
            res.status(404).json({ Error: 'Game not found' });
        }
    } catch (error) {
        console.error('Error updating game:', error);
        res.status(500).json({ Error: 'Request failed' });
    }
};
*/
// Update a game
export const updateGame = async (req, res) => {
    try {
        const { game_id } = req.params;
        let updateData = {
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
        };

        if (req.file) {
        }

        const updatedGame = await games.updateGame(game_id, updateData);
        res.json(updatedGame);
    } catch (error) {
        res.status(500).json({ message: 'Error updating game', error });
    }
};



// Delete a game
export const deleteGame = async (req, res) => {
    try {
        const deleted = await games.deleteGame(req.params.game_id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ Error: 'Game not found' });
        }
    } catch (error) {
        console.error('Error deleting game:', error);
        res.status(500).json({ Error: 'Request failed' });
    }
};

// Utility function to generate a unique class code
const generateUniqueClassCode = async () => {
    let classCode, existingGame;
    do {
        classCode = generateClassCode();
        existingGame = await games.findGameByClassCode(classCode);
    } while (existingGame);
    return classCode;
};

// Utility function to generate a class code
const generateClassCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

// Add a page to a game
export const addPageToGame = async (req, res) => {
    const { game_id } = req.params;
    const { page_id, content, question, choices, image } = req.body;

    try {
        const game = await games.findGameById(game_id);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        let imageBase64 = null;
        if (image) {
            // Assuming 'image' is already a Base64-encoded string
            imageBase64 = image;
        }

        const newPage = { page_id, content, question, choices, image: imageBase64 };
        game.pages.push(newPage);

        const updatedGame = await games.updateGame(game_id, game);
        res.status(201).json({ message: 'Page added successfully', game: updatedGame });
    } catch (error) {
        console.error('Error adding page to game:', error);
        res.status(500).json({ message: 'Error adding page to game' });
    }
};