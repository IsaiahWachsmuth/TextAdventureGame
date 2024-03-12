// models/adventures_model.mjs
import mongoose from 'mongoose';
const { Schema } = mongoose;


const choiceSchema = mongoose.Schema({
    text: { type: String, required: false }, // Make text optional
    isCorrect: { type: Boolean, default: false } // Keep as is, default to false
});

const pageSchema = mongoose.Schema({
    page_id: { type: String, required: true },
    content: { type: String, required: true },
    question: { type: String, required: false }, // Make question optional
    choices: { type: [choiceSchema], required: false }, // Choices themselves can be optional
    image: { type: String, required: false }  // Optional image URL for pages
});


const gameSchema = mongoose.Schema({
    game_id: { type: String, required: true },
    class_code: {type: String, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    pages: { type: [pageSchema], required: true },
    image: { type: String, required: false }  // Optional image URL for games
});

const Game = mongoose.model("Game", gameSchema, 'Adventures');

const findAllGames = async () => {
    try {
        const games = await Game.find({});
        return games; 
    } catch (error) {
        console.error("Failed to find games:", error);
        throw error;
    }
};

const findGamesByUser = async (user_id) => {
    try {
        const games = await Game.find({ author: user_id });
        return games;
    } catch (error) {
        console.error("Failed to find games:", error);
        throw error;
    }
}

// Method to create a new game
const createGame = async (classCode, title, description, author, pages, image) => {
    try {
        const game_id = new mongoose.Types.ObjectId();
        const newGame = new Game({ game_id, class_code: classCode, title, description, author, pages, image }); // Notice class_code: classCode
        await newGame.save();
        return newGame;
    } catch (error) {
        console.error("Failed to create game:", error);
        throw error;
    }
};


// Method to find a game by ID
const findGameById = async (game_id) => {
    return await Game.findOne({ game_id });
};

const findGameByClassCode = async (class_code) => {
    return await Game.findOne({ class_code });
};

/*
// Method to update a game
const updateGame = async (game_id, title, description, author, pages, image) => {
    const updateData = { title, description, author, pages }; // Change variable name to updateData
    if (image !== undefined) {
        updateData.image = image;
    }
    const updatedGame = await Game.findOneAndUpdate({ game_id }, updateData, { new: true });
    return updatedGame;
};
*/

// Method to update a game
const updateGame = async (game_id, updateData) => {
    try {
        if ('image' in updateData && !updateData.image) {
            delete updateData.image;
        }

        if ('pages' in updateData) {
            updateData.pages = JSON.parse(updateData.pages);
        }

        const updatedGame = await Game.findOneAndUpdate({ _id: game_id }, updateData, { new: true });
        return updatedGame;
    } catch (error) {
        console.error("Failed to update game:", error);
        throw error;
    }
};


// Method to delete a game
const deleteGame = async (game_id) => {
    const result = await Game.deleteOne({ game_id });
    return result.deletedCount;
};

// Export the functions for use in the controller
export { Game, findAllGames, createGame, findGameById, findGameByClassCode, updateGame, deleteGame };
export default mongoose.model('Game', gameSchema);