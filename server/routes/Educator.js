const express = require('express');
const educatorRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport.mjs');
const Educator = require('../educator_model.mjs');
const JWT = require('jsonwebtoken');

educatorRouter.post();