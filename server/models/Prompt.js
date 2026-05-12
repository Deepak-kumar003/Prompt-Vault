const mongoose = require('mongoose')

const versionSchema = new mongoose.Schema({
        versionId: {
            type: Number,
            required: true
        },
        changes: {
            type: String,
            required: true
        }
})

const promptSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    tags: [{
        type: String,

    }],
    promptTemplate: {
        type: String
    },
    variables: [{
        type: String
    }],
    copyCount: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true
    },
    versions: [versionSchema],
    models: [{
        type: String
    }]
},
{
    timestamps: true
})

const Prompt = mongoose.model('Prompt', promptSchema)
module.exports = Prompt
