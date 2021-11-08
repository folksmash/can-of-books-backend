"user strict";
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Book = require("./bookModel");

async function handleGetBooks(req, res) {
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
};

module.exports = handleGetBooks;

