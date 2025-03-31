const jokeService = require("../services/jokes.service");
const mongoose = require('mongoose');


class JokesController {
    async getJoke(req, res) {
        try {
            const joke = await jokeService.getRandomJoke();
            res.status(200).json(joke);
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async voteForJoke(req, res) {
        try {
            const { id } = req.params;
            const { emoji } = req.body;
            const updatedJoke = await jokeService.voteForJoke(id, emoji);
            res.status(201).json(updatedJoke);
        } catch (error) {
            if (error.message === "Emoji is required") {
                return res.status(400).json({ error: error.message });
            }
            if (error.message === "Joke not found") {
                return res.status(404).json({ error: error.message });
            }
            console.error("Error updating votes:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async changeJoke(req, res) {
        try {
            const { id } = req.params;
            const { question, answer } = req.body; // Оновлення через body

            const changedJoke = await jokeService.changeJoke(id, question, answer);
            res.status(200).json(changedJoke);
        } catch (error) {
            if (error.message === "Joke not found") {
                return res.status(404).json({ error: error.message });
            }
            console.error("Error updating joke:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async deleteJoke(req, res) {
        try {
            const { id } = req.params;

            // Перевіряємо, чи є ID валідним
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "Invalid ID format" });
            }

            await jokeService.deleteJoke(id); // Видаляємо жарт
            res.status(204).send(); // 204 No Content
        } catch (error) {
            if (error.message === "Joke not found") {
                return res.status(404).json({ error: error.message });
            }
            console.error("Error deleting joke:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getAllJokes(req, res) {
        try{
            const jokes = await jokeService.getAllJokes();
            res.status(200).json(jokes);
        }
        catch(error) {
            console.error("Error retrieving jokes:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async addJokes(req, res) {
        try {
            // Викликаємо сервіс для додавання жартів
            await jokeService.addJokes(10); // Додаємо 10 жартів
            res.status(201).json({ message: "Jokes added successfully" });
        } catch (error) {
            console.error("Error fetching jokes:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = new JokesController();