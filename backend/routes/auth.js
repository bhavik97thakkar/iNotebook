
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const jwtSecret = "Bhavikisagoodboyandheisbest";



//  route 1: create a user using : POST "/api/auth/createuser". login not require // 1st end point
router.post("/createuser", [ //post api
    body('email', 'Enter valid email id').isEmail(),
    body('password', 'Password length must be mininum 5 characters').isLength({ min: 5 }),
    body('name', 'Enter a valid name').isLength({ min: 5 }),
], async (req, res) => {
    let success= false;
    //if there are error return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    //check whether user with this email exixts already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Email already exists " })
        }
        const salt = await bcrypt.genSalt(10);//adding salt
        const secPass = await bcrypt.hash(req.body.password, salt)// adding hash to password and salt 
        //create a new users using async  await function
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = { //data object
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret)
        success=true;
        res.json({ success, authToken })

        // console.log("User added succesfully")
        // res.json(user)
        //catching errors
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})

//  route 1: create user end point ends here  

//  route 2 : login a user using : POST "/api/auth/login". login not require // 2nd end point
router.post("/login", [ //post api
    body('email', 'Enter valid email id').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success= false;
    //if there are error return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; //destructing 

    try {
        let user = await User.findOne({ email }) //pull user from db whose email is same as email typed by user    
        if (!user) { //check whether user exixts or not
            success=false;
            return res.status(400).json({ error: "Please try to login with correct Credentials" }); //if user does not exixts or password is wrong  show 400 satus and error
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) { //if password doesn't match then error 
            success=false;
            return res.status(400).json({ success, error: "Please try to login with correct Credentials" }); //if user does not exixts or password is wrong  show 400 satus and error
        }
        //if password is correct then send the user data i.e user id
        const data = { //data object
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret) //signing the token
        success=true;
        res.json({ success, authToken })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }

})

//  route 2: login user ends here  

//  route 3  : Get logged-in user details : POST "/api/auth/getuserdetails". login  require // 3rd end point
router.post("/getuserdetails", fetchuser,async (req, res) => { //fetchuser is a middleware here
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }


})





module.exports = router