const express = require ('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt =require('jsonwebtoken');

const mongoose = require('mongoose');
const db_url = 'mongodb+srv://userone:userone@ictak-dbfiles.5dz3o.mongodb.net/LibraryApp_MongoDB?retryWrites=true&w=majority';
// const db_url = 'mongodb://localhost:27017/LibraryApp_MongoDB';

var app = new express();

const port = process.env.PORT || 3000;

//Database connection
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error)=>{
    if(!error)
    {
        console.log('Success - Database Connected.');
    }
    else{
        console.log('Error - Unable to connect Database.')
    }
});

app.use(cors({ origin: 'http://localhost:4200' }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

//to ensure large file upload
app.use(bodyParser.json({
    limit: '50mb'
  }));
  
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
  }));

const userRouter = require('./src/routes/userRoutes');
app.use('/user',userRouter);

const authorRouter = require('./src/routes/authorRoutes');
app.use('/authors',authorRouter);

const bookRouter = require('./src/routes/bookRoutes');
app.use('/books',bookRouter);


app.get('/',(req,res)=>{
    res.send('Invalid');
})


app.listen(port,(error)=>{
    if(!error)
    {
        console.log("Server Ready at "+ port);
    }
    else{
        console.log('Error Occurred');
    }
    
});

