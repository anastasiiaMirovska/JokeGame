var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const {Jokes} = require('../dataBase')

router.get('/', async (req, res) => {
    const joke = await Jokes.aggregate([{ $sample: { size: 1 } }]);
    res.json(joke[0]);
});

router.post('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { emoji } = req.body;

        if (!emoji) {
            return res.status(400).json({ error: 'Emoji is required' });
        }

        const joke = await Jokes.findById(id);
        if (!joke) {
            return res.status(404).json({ error: 'Joke not found' });
        }

        // // Ініціалізуємо масив votes, якщо він ще не існує
        // if (!joke.votes) {
        //     joke.votes = [];
        // }

        const vote = joke.votes.find(v => v.label === emoji);
        if (vote) {
            vote.value += 1;
        } else {
            joke.votes.push({ label: emoji, value: 1 });
        }

        await joke.save();
        res.json(joke);

    } catch (error) {
        console.error('Error updating votes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    try {
        const joke = await Jokes.findById(id);
        if (!joke) return res.status(404).json({ error: 'Joke not found' });

        joke.question = question;
        joke.answer = answer;

        await joke.save(); // Використовуємо `.save()` замість `findByIdAndUpdate`
        res.json(joke);
    } catch (e) {
        console.error('Error updating joke:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const joke = await Jokes.findByIdAndDelete(id);
    if (!joke) return res.status(404).json({ error: 'Joke not found' });

    res.json({ message: 'Joke deleted successfully' });
});

// Additional:
router.get('/all', async (req, res) => {
    const jokes = await Jokes.find();
    res.json(jokes);
});


module.exports = router;
