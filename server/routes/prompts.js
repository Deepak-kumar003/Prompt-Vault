const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const prompt = require('../models/Prompt')
const router = express.Router()

router.post('/create', verifyToken, async (req, res) => {

    try{
        const {title, description, tags, promptTemplate,variables, models} = req.body;
        const userId = req.user.id;

        const newPrompt = new prompt({title:title, description:description, tags: tags, promptTemplate: promptTemplate,variables:variables, models: models, userId: userId});
        await newPrompt.save();

        res.status(201).json({message: "Prompt created sucessfully"});
    }
    catch(err){
        res.status(400).json({message: `Error creating prompt: ${err.message}`});
    }
})

module.exports = router;