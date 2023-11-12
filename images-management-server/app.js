// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

const app = express();

require('./config')(app);

const indexRoutes = require('./routes/index.routes');
app.use('/api', indexRoutes);

const imageRoutes = require('./routes/image.routes');
app.use('/api/images', imageRoutes);

require('./error-handling')(app);

module.exports = app;
