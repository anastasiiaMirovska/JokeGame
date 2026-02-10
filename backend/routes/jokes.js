import express from 'express';
const router = express.Router();

import JokeModel from '../dataBase/jokeModel.js';
import { fetchMultipleJokes } from '../services/jokeService.js';

router.get('/', async (req, res) => {
    const joke = await JokeModel.aggregate([{ $sample: { size: 1 } }]);
    res.json(joke[0]);
});

router.post('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { emoji } = req.body;

        if (!emoji) {
            return res.status(400).json({ error: 'Emoji is required' });
        }

        const joke = await JokeModel.findById(id);
        if (!joke) {
            return res.status(404).json({ error: 'Joke not found' });
        }

        const vote = joke.votes.find((v) => v.label === emoji);
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
        const joke = await JokeModel.findById(id);
        if (!joke) return res.status(404).json({ error: 'Joke not found' });

        joke.question = question;
        joke.answer = answer;

        await joke.save();
        res.json(joke);
    } catch (e) {
        console.error('Error updating joke:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const joke = await JokeModel.findByIdAndDelete(id);
    if (!joke) return res.status(404).json({ error: 'Joke not found' });

    res.json({ message: 'Joke deleted successfully' });
});

router.get('/all', async (req, res) => {
    const jokes = await JokeModel.find();
    res.json(jokes);
});

router.get('/add', async (req, res) => {
    try {
        await fetchMultipleJokes(10);
        res.json({ message: 'Jokes added successfully' });
    } catch (error) {
        console.error('Error fetching jokes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
