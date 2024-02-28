// educator_controller.mjs
import Educator from '../models/educator_model.mjs';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
const PORT = 3002;
const app = express();
import JWT from 'jsonwebtoken';
import passport from 'passport';
import passportConfig from '../passport.mjs';


const userInput = {
  name: "testname",
  email: "testemail@email.com",
  password: "badpassword",
}

app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}
app.use(cors(corsOptions));
app.use(session({
  secret: 'testing',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true }
}))
app.use(passport.initialize());
app.use(passport.session());


// Create a new educator
app.post('/create-educator', async (req, res) => {
  try {
    const { name } = req.body;

    const existingEducator = await Educator.findOne({ name });

    if (existingEducator) {
      return res.status(400).json({ success: false, error: 'Educator with this name already exists' });
    }

    const educator = new Educator(req.body);
    await educator.save();
    res.status(201).json({ success: true, educator });
  } catch (error) {
    console.error('Error creating educator:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      // Login successful, user will be redirected or responded with success message
      // The session cookie is automatically set by express-session
      return res.json({ message: 'Logged in successfully' });
    });
  })(req, res, next);
});

app.get('/protected', (req, res) => {
  if (req.isAuthenticated()) {
    // User is authenticated
    res.json({ status: 'success', message: 'You are authenticated' });
  } else {
    // User is not authenticated
    res.status(401).json({ status: 'error', message: 'You are not authenticated' });
  }
});

app.post('/createSession', async (req, res) => {
  if(req.isAuthenticated()){
    const { _id, name, email } = req.user;
    const token = signToken(_id);
    res.cookie('access_token', token, { httpOnly: true, sameSite: true });
    res.status(200).json({ isAuthenticated: true, user: { name, email } }); 
  }
});


const signToken = userId => {
  return JWT.sign(
    {
      iss: "testing",
      sub: userId
    },
    "testing",
    { expiresIn: "1h" }
  );
}

// Get educator by ID
export async function getEducatorById(id) {
  try {
    const educator = await Educator.findById(id).populate('students adventures');
    return educator;
  } catch (error) {
    console.error('Error fetching educator:', error);
  }
}

// Update an educator
export async function updateEducator(id, data) {
  try {
    const educator = await Educator.findByIdAndUpdate(id, data, { new: true });
    return educator;
  } catch (error) {
    console.error('Error updating educator:', error);
  }
}

// Delete an educator
export async function deleteEducator(id) {
  try {
    await Educator.findByIdAndDelete(id);
    console.log('Educator deleted successfully.');
  } catch (error) {
    console.error('Error deleting educator:', error);
  }
}
async function testingEducators() {
  const educator = await Educator.findOne({ name: "a@b.c" });
  if (educator) {
    educator.comparePassword("!123456789Ab", (err, result) => {
      if (err) {
        console.error('Error comparing password:', err);
      } else {
        console.log('Password match result:', result);
      }
    });
  } else {
    console.log('Educator not found');
  }
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});