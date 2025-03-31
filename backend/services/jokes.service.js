const jokeRepository = require("../repositories/jokes.repository");
const {Jokes} = require("../dataBase");
const {get} = require("axios");

class JokeService {
    async getRandomJoke() {
        const joke = await jokeRepository.getRandomJoke();
        return joke[0];
    }

    async voteForJoke(id, emoji) {
        if (!emoji) {
            throw new Error("Emoji is required");
        }

        const joke = await jokeRepository.findById(id);
        if (!joke) {
            throw new Error("Joke not found");
        }

        const vote = joke.votes.find(v => v.label === emoji);
        if (vote) {
            vote.value += 1;
        } else {
            joke.votes.push({ label: emoji, value: 1 });
        }

        return await jokeRepository.save(joke);
    }

    async changeJoke(id, question, answer) {
        const joke = await jokeRepository.findById(id);
        if (!joke) {
            throw new Error("Joke not found");
        }
        joke.question = question;
        joke.answer = answer;
        return await jokeRepository.save(joke);
    }

    async deleteJoke(id) {
        const joke = await jokeRepository.deleteById(id);
        if (!joke) {
            throw new Error("Joke not found");
        }
        return;
    }

    async getAllJokes() {
        const jokes = await jokeRepository.getAllJokes()
        if (!jokes || jokes.length === 0) {
            return [];  // Або повернути 200, навіть якщо жартів нема
        }
        return jokes;
    }

    async addJokes(count){
        for (let i = 0; i < count; i++) {
            await this.fetchAndSaveJoke();
        }
    }

    async fetchAndSaveJoke() {
        try {
            const response = await get('https://teehee.dev/api/joke');
            const jokeData = response.data;

            const existingJoke = await jokeRepository.findByQuestionAndAnswer(jokeData.question, jokeData.answer);
            if (!existingJoke) {
                const joke = new Jokes({
                    question: jokeData.question,
                    answer: jokeData.answer,
                    votes: [
                        { value: 0, label: "😂" },
                        { value: 0, label: "👍" },
                        { value: 0, label: "❤️" },
                    ],
                });
                await jokeRepository.save(joke); // Зберігаємо жарт
                console.log(`Joke was saved: ${joke.question}`);
            } else {
                console.log(`Joke already exists: ${jokeData.question}`);
            }
        } catch (error) {
            console.error('Error fetching and saving joke:', error);
        }
    }
}

module.exports = new JokeService();