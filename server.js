'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const verifyUser = require('./auth');
const mongoose = require('mongoose');
const Book = require("./bookModel");
const { response } = require('express');

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
app.delete('/book/:id', handleDeleteBooks);
app.put('/book/:id', handlePutBook);
app.get('/test', getTest);
app.listen(PORT, () => console.log(`listening on ${PORT}`));


async function handleGetBooks(req, res) {
  verifyUser(req, async(err, user) => {
    console.log('hi', err);
    if (err) {
      res.send('invalid token');
    } else {    
      let queryObj = {};
      if (req.query.email) {
        queryObj = {
          email: req.query.email
        };
      }
    
      try {
        let booksFromDB = await Book.find(queryObj);
        if (booksFromDB) {
          res.status(200).send(booksFromDB);
        } else {
          res.status(404).send("no book for you");
        }
      } catch (e) {
        console.error(e);
        res.status(500).send("server error");
      }
    }
  })
}


async function handlePostBooks(req, res){
  verifyUser(req, async(err, user) => {
    if (err) {
      res.send('invalid token');
    } else {
      try {
        let newBook = await Book.create(req.body)
        res.status(201).send(newBook);
        console.log(req.body);
      } catch (e){
        res.status(500).send('we were unable to add your book');
      }
    }
  })
}


async function handleDeleteBooks(req, res){
  verifyUser(req, async(err, user) => {
    if (err) {
      res.send('invalid token');
    } else {
      const id = req.params.id;
      console.log(id);
      const book = req.params.book;
      console.log(book);
      const email = req.query.email;
      console.log(email);
      try {
      
        const deletedBook = await Book.findOneAndDelete({ 
          _id: id});
        if (deletedBook) {
          res.status(204).send('book is deleted')
        } else {
          res.status(404).send('no book there')
        }
      }
      catch (e){
        res.status(500).send('server error')
      }
    }
  })
}


async function handlePutBook(req, res) {
  verifyUser(req, async(err, user) => {
    if (err) {
      res.send('invalid token');
    } else {
      const id = req.params.id;
      const updatedData = { ...req.body }
    try {
      const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new:true, overwrite: true});
      res.status(200).send(updatedBook)
    } catch (e) {
      res.status(500).send('server error');
    }
    }
  })
}

async function getTest(req, res) {
  verifyUser(req, (err, user) =>{
    if (err) {
      res.send('invalid token');
    } else {
      console.log(user);
      res.send(user);
    }
    }
)}