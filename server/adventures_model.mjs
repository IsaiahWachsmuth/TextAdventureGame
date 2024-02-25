import mongoose from 'mongoose';


mongoose.connect(
    "mongodb+srv://adam:zydLJNZ86Ppkbz4B@textadventurecluster.fpuqlbf.mongodb.net/TextAdventures?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const pageSchema = new mongoose.Schema({
    page_id: { type: String, required: true },
    content: { type: String, required: true },
    choices: { type: [String], required: true },
    image: { type: String, required: false }  // Optional image URL for pages
});

const gameSchema = new mongoose.Schema({
    game_id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    pages: { type: Map, of: pageSchema, required: true },
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

const createGame = async (game_id, title, description, author, pages, image) => {
    const newGame = new Game({ game_id, title, description, author, pages, image });
    await newGame.save();
    return newGame;
};

const findGameById = async (game_id) => {
    return await Game.findOne({ game_id });
};

const updateGame = async (game_id, title, description, author, pages, image) => {
    const updateGame = { title, description, author, pages };
    if (image !== undefined) {
        updateGame.image = image;
    }
    const updatedGame = await Game.findOneAndUpdate({ game_id }, updateData, { new: true });
    return updatedGame;
};

const deleteGame = async (game_id) => {
    const result = await Game.deleteOne({ game_id });
    return result.deletedCount;
};

export { Game, findAllGames, createGame, findGameById, updateGame, deleteGame };
