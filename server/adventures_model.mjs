import mongoose from 'mongoose';

mongoose.connect(
    "mongodb+srv://adam:zydLJNZ86Ppkbz4B@textadventurecluster.fpuqlbf.mongodb.net/TextAdventures?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const pageSchema = mongoose.Schema({
    page_id: { type: String, required: true },
    content: { type: String, required: true },
    choices: { type: [String], required: true } // Array of strings or another schema if choices are complex
});

const gameSchema = mongoose.Schema({
    game_id: { type: String, required: true },
    class_code: {type: String, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    pages: { type: Map, of: pageSchema, required: true }
});

const Game = mongoose.model("Game", gameSchema, 'Adventures');

// Method to find all games
const findAllGames = async () => {
    try {
        const games = await Game.find({});
        return games; // Returns an array of game documents
    } catch (error) {
        // Log or handle error appropriately
        console.error("Failed to find games:", error);
        throw error; // Rethrow or handle as needed
    }
};

// Method to create a new game
const createGame = async (game_id, class_code, title, description, author, pages) => {
    const newGame = new Game({ game_id, class_code, title, description, author, pages });
    await newGame.save();
    return newGame;
};

// Method to find a game by ID
const findGameById = async (game_id) => {
    return await Game.findOne({ game_id });
};

// const findGameByClassCode = async (class_code) => {
//     return await Game.findOne({ class_code });
// };



// Method to update a game
const updateGame = async (game_id, class_code, title, description, author, pages) => {
    const updatedGame = await Game.findOneAndUpdate({ game_id }, { class_code, title, description, author, pages }, { new: true });
    return updatedGame;
};

// Method to delete a game
const deleteGame = async (game_id) => {
    const result = await Game.deleteOne({ game_id });
    return result.deletedCount; // Returns the number of documents deleted
};

// Export the functions for use in the controller
export { Game, findAllGames, createGame, findGameById, updateGame, deleteGame };