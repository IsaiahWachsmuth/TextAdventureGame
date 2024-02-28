// server/adventures_model.mjs
import mongoose from 'mongoose';
const { Schema } = mongoose;
// mongoose.connect(
//     "mongodb+srv://adam:zydLJNZ86Ppkbz4B@textadventurecluster.fpuqlbf.mongodb.net/TextAdventures?retryWrites=true&w=majority",
//     { useNewUrlParser: true, useUnifiedTopology: true }
// );

// const db = mongoose.connection;
// db.once("open", () => {
//     console.log("Successfully connected to MongoDB using Mongoose!");
// });

const pageSchema = mongoose.Schema({
    page_id: { type: String, required: true },
    content: { type: String, required: true },
    question: { type: String, required: true },
    choices: { type: [String], required: true }, // Array of strings or another schema if choices are complex
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

// Method to update a game
const updateGame = async (game_id, title, description, author, pages, image) => {
    const updateData = { title, description, author, pages }; // Change variable name to updateData
    if (image !== undefined) {
        updateData.image = image;
    }
    const updatedGame = await Game.findOneAndUpdate({ game_id }, updateData, { new: true });
    return updatedGame;
};


// Method to delete a game
const deleteGame = async (game_id) => {
    const result = await Game.deleteOne({ game_id });
    return result.deletedCount;
};

// Export the functions for use in the controller
export { Game, findAllGames, createGame, findGameById, findGameByClassCode, updateGame, deleteGame };