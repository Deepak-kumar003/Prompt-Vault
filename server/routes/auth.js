const express = require('express')
const router = express.Router()
const user = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/verifyToken')

router.post('/register', async (req,res) => {
    try{
        const {name, email, password} = req.body;

        if(await user.findOne({email: email})){
            return res.status(400).json({message: "user already exists."});
        }

        const newUser = new user({name:name, email:email, password:password});
        await newUser.save();
        res.status(201).json({message: "User created"});
    }
    catch(err){
        res.status(400).json({message: `Error creating user: ${err.message}`});
    }
});

router.post("/login", verifyToken, async (req, res) => {
    try{
        const {email, password} = req.body;

        const userFound = await user.findOne({email: email})

        if(userFound){
            const isMatch = await bcrypt.compare(password, userFound.password)

            if(isMatch){
                const token = jwt.sign({id : userFound._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
                return res.status(200).json({message: `LogIn sucessful. Welcome back ${userFound.name}!`, token: token});
            }
        }
        res.status(400).json({message: "Invalid password or email"})
    }
    catch(err){
        res.status(400).json({message: `Error: ${err.message}`})
    }
})

module.exports = router;    