const express = require("express");
const bodyparser = require("body-parser");
const jwt =require('jsonwebtoken');

var ObjectId = require('mongoose').Types.ObjectId;

//access AuthorData Schema
const Authordata = require('../models/Authordata');

const authorRouter = express.Router();

// authorRouter.use(bodyparser.json());
// const urlencodedParser = bodyparser.urlencoded({ extended: false });
// authorRouter.use(urlencodedParser);


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

    //GET ALL Authors  
    authorRouter.get('/',(req,res)=>{
        Authordata.find().sort({_id:-1})
            .then(function(authors){
                res.send(authors);
            })
    });

    //GET ONE Author
    authorRouter.get('/:id',  (req,res)=>{
        if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
  
        const author_id = req.params.id;
        Authordata.findById({_id : author_id})
            .then(function(author){
                res.send(author);
            })
    });      

    //POST Author form for ADD
    authorRouter.post('/addauthor',verifyToken, (req,res) =>{
        // console.log(req.body);
        //access query parameter values
        var author_item = {
                            author_name         : req.body.author.author_name,
                            author_nationality  : req.body.author.author_nationality,
                            author_dob          : req.body.author.author_dob,
                            author_genre        : req.body.author.author_genre,
                            author_imageUrl     : req.body.author.author_imageUrl   
                        };
        
        var author = Authordata(author_item);
        author.save();            //save to DB
        // res.redirect('/authors');
    });

    //PUT Author details for UPDATE
    authorRouter.put('/:id',   (req,res)=>{
        if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
        
        // console.log("Editing - "+req.body.author_name);
        const author_id  = req.params.id;
        var author_item;
         author_item = {
                        _id                 : req.params.id,
                        author_name         : req.body.author_name,
                        author_nationality  : req.body.author_nationality,
                        author_dob          : req.body.author_dob,
                        author_genre        : req.body.author_genre,
                        author_imageUrl     : req.body.author_imageUrl 
                     };

        var author = Authordata(author_item);
        Authordata.findByIdAndUpdate(req.params.id, author, {}, function (err,result) {
            if (err) { return next(err); }
        });
    });

    //DELETE One Author
    authorRouter.delete('/:id', (req,res)=>{
        if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
  
        const author_id =req.params.id;
        // console.log("Delete -" + author_id);
        Authordata.findByIdAndDelete({_id:author_id}, (error)=>{
        console.log(error);
        })
    });    

module.exports = authorRouter;