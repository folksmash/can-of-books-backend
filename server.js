'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const handleGetBooks = require('./books');
const handlePostBooks = require('./books');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('mongoose is connected')
});

const PORT = process.env.PORT || 3001;

app.get('/book', handleGetBooks); 
app.post('/book', handlePostBooks);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
