// EducatorModel.mjs
import mongoose from 'mongoose';
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const educatorSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  name: { type: String, min: 1, max: 100},
  email: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  adventures: [{ type: Schema.Types.ObjectId, ref: 'Adventure' }]
});
educatorSchema.pre('save',function(next){
  if(!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if(err) {
      return next(err);
    }
    this.password = passwordHash;
    next();
  });
});

export const Educator = mongoose.model('Educator', educatorSchema);
