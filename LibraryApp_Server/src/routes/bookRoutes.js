const express = require("express");
const bodyparser = require("body-parser");
const jwt =require('jsonwebtoken');

var ObjectId = require('mongoose').Types.ObjectId;

//access BookData Schema
const Bookdata = require('../models/Bookdata');

const bookRouter = express.Router();

// bookRouter.use(bodyparser.json());
// const urlencodedParser = bodyparser.urlencoded({ extended: false });
// bookRouter.use(urlencodedParser);


function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject;
    // console.log('Loggedin User _id ' + req.userId);
    next()
  }

    //GET ALL Books  
    bookRouter.get('/',(req,res)=>{
        Bookdata.find().sort({_id:-1})
            .then(function(books){
                res.send(books);
            })
    });

    //GET ONE Book
    bookRouter.get('/:id',  (req,res)=>{
        if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
  
        const book_id = req.params.id;
        Bookdata.findById({_id : book_id})
            .then(function(book){
                res.send(book);
            })
    });      

    //POST Book form for ADD
    bookRouter.post('/addbook',verifyToken, (req,res) =>{
        // console.log(req.body);
        //access query parameter values
        var book_item = {
                            book_title      : req.body.book.book_title,   
                            book_author     : req.body.book.book_author,  
                            book_genre      : req.body.book.book_genre,   
                            book_imageUrl   : req.body.book.book_imageUrl
                        };
        
        var book = Bookdata(book_item);
        book.save();            //save to DB
        // res.redirect('/books');
    });

    //PUT Book details for UPDATE
    bookRouter.put('/:id',  (req,res)=>{
        if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
        
        // console.log("Editing - "+req.body.book_title);
        const book_id  = req.params.id;
        var book_item;
         book_item = {
                        _id             : req.params.id,
                        book_title      : req.body.book_title,   
                        book_author     : req.body.book_author,  
                        book_genre      : req.body.book_genre,   
                        book_imageUrl   : req.body.book_imageUrl
                     };
        var book = Bookdata(book_item);
        Bookdata.findByIdAndUpdate(req.params.id, book, {}, function (err,result) {
            if (err) { return next(err); }
        });
    });

    //DELETE One Book
    bookRouter.delete('/:id', (req,res)=>{
        if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
  
        const book_id =req.params.id;
        // console.log("Delete -" + book_id);
        Bookdata.findByIdAndDelete({_id:book_id}, (error)=>{
        console.log(error);
        })
    });    

module.exports = bookRouter;