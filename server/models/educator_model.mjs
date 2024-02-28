// EducatorModel.mjs
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema } = mongoose;

// mongoose.connect(
//     "mongodb+srv://adam:zydLJNZ86Ppkbz4B@textadventurecluster.fpuqlbf.mongodb.net/Users?retryWrites=true&w=majority",
//     { useNewUrlParser: true, useUnifiedTopology: true }
// );

// const db = mongoose.connection;
// db.once("open", () => {
//     console.log("Successfully connected to MongoDB using Mongoose!");
// });
const educatorSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  name: { type: String, min: 1, max: 100},
  email: { type: String, required: true },
  password: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  adventures: [{ type: Schema.Types.ObjectId, ref: 'Adventure' }]
});

educatorSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) {
      return next(err);
    }
    this.password = passwordHash;
    next();
  });
});

educatorSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    } else {
      if (!isMatch) {
        return cb(null, isMatch);
      }
      console.log('Password match:', isMatch);
      return cb(null, this);
    }
  });
}

const Educator = mongoose.model("Educator", educatorSchema, 'Educators');
const createEducator = async (name, email, password) => {
  const newEducator = new Educator({ name, email, password});
  await newEducator.save();
  return newEducator;
};

// createEducator("testname", "testemail", "testpassword");
export default mongoose.model('Educator', educatorSchema);
