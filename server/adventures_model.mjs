import mongoose from 'mongoose';

mongoose.connect(
    "mongodb+srv://adam:zydLJNZ86Ppkbz4B@textadventurecluster.fpuqlbf.mongodb.net/?retryWrites=true&w=majority",
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
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    pages: { type: Map, of: pageSchema, required: true }
});

const Game = mongoose.model("Game", gameSchema);

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

// Export the functions for use in the controller
export { Game, findAllGames };
