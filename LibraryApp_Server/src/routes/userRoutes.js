const express = require("express");
const bodyparser = require("body-parser");
const jwt =require('jsonwebtoken');

//access BookData Schema
const Userdata = require('../models/Userdata');

//create seperate route handler for Admin
const userRouter = express.Router();

userRouter.use(bodyparser.json());
const urlencodedParser = bodyparser.urlencoded({ extended: false });
userRouter.use(urlencodedParser);

userRouter.get('/', (req,res)=>{

})

//signup
userRouter.post('/signup',(req,res)=>{
    
    if( req.body.user_name == null     || req.body.user_name == ''    ||
        req.body.user_email == null    || req.body.user_email == ''   ||
        req.body.user_password == null || req.body.user_password == '' )
    {
        res.json({success:false, message: 'All Fields Are Required'});
    }
    else
    {   const username = req.body.user_email;
        Userdata.findOne({user_email: username})
        .then(function(user){
            if(user !== null)
            { //console.log(user);
                res.json({success:false, message: 'Email Already exists'}); 
            }
            else
            {
                var user_data = {
                    user_name       : req.body.user_name,
                    user_email      : req.body.user_email,
                    user_password   : req.body.user_password   
                };
                var user = Userdata(user_data);
                user.save((err)=>{
                    if(err){
                        res.json({success:false, message:'Error Occurred...try again'});
                    } else{
                        res.json({success:true, message: 'User Account Created Successfully'});
                    }
                }); 
            }
        })
        
    }

})

//login
userRouter.post('/login',(req,res)=>{
    
    // var err;
    const username = req.body.user_email;
    const password = req.body.user_password;
    let user_data = req.body;
    // console.log(req.body);

    Userdata.findOne({user_email : username})
    .then(function(user){
        if(user === null)
        {
            // res.status(401).send('Invalid User - SignUp for Login');
            res.json({success:false, message: 'Invalid User - SignUp for Login'});
        }
        else
        {
            if(user.user_password === password)
            {
                //Valid User
                const id=user._id;
                let payload = {subject:id};
                let token = jwt.sign(payload,'secretKey');
                // console.log(token);
                res.status(200).send({'token':token,'user':user, success:true, message: 'Login Success'});
            } //send user_role after login success
            else
            {
                // res.status(401).send('Invalid Username or Password');
                res.json({success:false, message: 'Invalid Username or Password'});
            }
        }
    })

})



module.exports = userRouter;