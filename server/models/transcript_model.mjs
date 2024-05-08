import mongoose from 'mongoose';

const { Schema } = mongoose;

const gameTranscriptSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  gameId: { type: String, required: true },
  studentName: { type: String, required: true },
  playhistory: {
    type: [
      {
        content: { type: String, required: true },
        question: { type: String, required: true },
        choiceText: { type: String },
        image: { type: String }
      }
    ],
    required: true
  }
}, {
  timestamps: true
});

const GameTranscript = mongoose.model("GameTranscript", gameTranscriptSchema, 'GameTranscripts');

export const createGameTranscript = async (gameId, studentName, playhistory) => {
  const newTranscript = new GameTranscript({ gameId, studentName, playhistory });
  await newTranscript.save();
  return newTranscript;
};

export const findTranscriptsByGameId = async (gameId) => {
  return await GameTranscript.find({ gameId });
};

export default GameTranscript;
