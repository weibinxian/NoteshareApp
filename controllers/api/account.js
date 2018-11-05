const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs')

const User = require('../../models').user;

/*
    Validation needs to be implemented 
*/

//@route    POST account/signin
//@desc     POST request to login
router.post('/signin', (req,res) => {
    passport.authenticate('local', {
        successRedirect:'/user',
        failureRedirect:'/signin',
        failureFlash: true
      })(req, res, next);
});

//@route    POST account/signup
//@desc     POST request to handle new accounts being created 
router.post('/signup', (req,res) => {

    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const school = req.body.school;
    const email = req.body.email;
    const passw = req.body.password;

    console.log(req.body);
    console.log(email);
    //console.log(models);

    User.findOne({ where: {email : email} })
    .then(user => {
        if(!user){
            bcrypt.hash(passw, null, null, (err, hashedPassword) => {
                if(err) console.log(err);
                User.create({
                    firstName: fname,
                    lastName: lname,
                    username: username,
                    email: email,
                    school: school,
                    password: hashedPassword
                })
                .then(user => {
                    console.log(user);
                    res.json(user);
                })
                .catch(error => res.status(400).send(error));
            });
        } else {
            res.json('Email already taken')
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    });
    
});

module.exports = router;