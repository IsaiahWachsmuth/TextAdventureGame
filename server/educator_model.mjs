// EducatorModel.mjs
import mongoose from 'mongoose';

const { Schema } = mongoose;

const educatorSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  name: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  adventures: [{ type: Schema.Types.ObjectId, ref: 'Adventure' }]
});

export const Educator = mongoose.model('Educator', educatorSchema);
