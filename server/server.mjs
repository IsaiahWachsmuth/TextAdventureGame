// app.mjs
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';
import educatorRoutes from './routes/educator_routes.mjs';
import adventuresRoutes from './routes/adventures_routes.mjs';
import './passport.mjs';

const PORT = 3001;
const app = express();

const mongoURI = "mongodb+srv://adam:zydLJNZ86Ppkbz4B@textadventurecluster.fpuqlbf.mongodb.net/TextAdventures?retryWrites=true&w=majority";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(session({
  secret: 'testing',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/educator', educatorRoutes);
app.use('/games', adventuresRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
