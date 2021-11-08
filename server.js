'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const handleGetBooks = require('./books')

const app = express();
app.use(cors());

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('mongoose is connected')
});

const PORT = process.env.PORT || 3001;

app.get('/book', handleGetBooks); 

app.listen(PORT, () => console.log(`listening on ${PORT}`));
