const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const prompt = require('../models/Prompt')
const User = require('../models/User')
const Prompt = require('../models/Prompt')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        // .find() with no arguments gets every single prompt in the collection
        // .sort({ createdAt: -1 }) puts the newest ones at the top!
        const allPrompts = await Prompt.find().sort({ createdAt: -1 });
        
        res.status(200).json(allPrompts);
    } catch (err) {
        res.status(500).json({ message: `Error fetching library prompts: ${err.message}` });
    }
});

router.post('/create', verifyToken, async (req, res) => {

    try {
        const { title, description, tags, promptTemplate, variables, models } = req.body;
        const userId = req.user.id;

        const newPrompt = new prompt({ title: title, description: description, tags: tags, promptTemplate: promptTemplate, variables: variables, models: models, userId: userId });
        await newPrompt.save();

        res.status(201).json({ message: "Prompt created sucessfully" });
    }
    catch (err) {
        res.status(400).json({ message: `Error creating prompt: ${err.message}` });
    }
})

router.get('/my-prompts', verifyToken, async (req, res) => {
    try {
        const myPrompts = await Prompt.find({ userId: req.user.id });

        res.status(200).json(myPrompts);
    }
    catch (err) {
        res.status(400).json({ message: `Error fetching user prompts: ${err.message}` });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const prompt = await Prompt.findById(req.params.id);

        if (!prompt) {
            return res.status(404).json({ message: "Prompt not found" });
        }

        res.json(prompt);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        const idToDelete = req.params.id;
        const promptToDelete = await prompt.findById(idToDelete);

        if (!promptToDelete) {
            return res.status(404).json({ message: "Prompt not found" });
        }

        if (promptToDelete.userId.toString() !== req.user.id) {
            return res.status(400).json({ message: "Not authorized to delete this prompt" });
        }

        await prompt.findByIdAndDelete(idToDelete);
        res.status(200).json({ message: "Prompt deleted successfully" });
    }
    catch (err) {
        res.status(400).json({ message: `Error deleting prompt: ${err.message}` });
    }
})

router.put('/update/:id', verifyToken, async (req, res) => {
    try {
        const idToUpadte = req.params.id;
        const promptToUpate = await prompt.findById(idToUpadte);

        if (!promptToUpate) {
            return res.status(400).json({ message: "prompt not found to update" });
        }

        if (promptToUpate.userId.toString() !== req.user.id) {
            return res.status(400).json({ message: "Not authorized to update this prompt" });
        }

        const { title, description, tags, promptTemplate, variables, models } = req.body;

        const updatedFields = {};
        if (title) updatedFields.title = title;
        if (description) updatedFields.description = description;
        if (tags) updatedFields.tags = tags;
        if (promptTemplate) updatedFields.promptTemplate = promptTemplate;
        if (variables) updatedFields.variables = variables;
        if (models) updatedFields.models = models;

        const updatedPrompt = await prompt.findByIdAndUpdate(
            idToUpadte,
            { $set: updatedFields },
            { new: true }
        );

        res.status(200).json(updatedPrompt);
    }
    catch (err) {
        res.status(400).json({ message: `Error upadting prompt: ${err.message}` });
    }
})

router.post('/:id/copy', async (req, res) => {
    try {
        const updatedPrompt = await Prompt.findByIdAndUpdate(
            req.params.id,
            { $inc: { copyCount: 1 } },
            { new: true, timestamps: false }
        );
        res.json(updatedPrompt);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;