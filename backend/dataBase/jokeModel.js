const {Schema, model} = require('mongoose');

const jokeSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    votes: [
        {
            value: {
                type: Number,
                required: true,
                default: 0
            },
            label: {
                type: String,
                default: '😂',
                required: true
            }
        }
    ],
    // availableVotes: {
    //     type: [String],
    //     default: ["😂", "👍", "❤️"]
    // }
}, {timestamps: true})

module.exports = model('jokes', jokeSchema)

