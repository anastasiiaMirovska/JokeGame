import axios from 'axios';
import JokeModel from '../dataBase/jokeModel.js';

export const fetchAndSaveJokes = async () => {
    try {
        const response = await axios.get('https://teehee.dev/api/joke');
        const jokeData = response.data;

        const existingJoke = await JokeModel.findOne({
            question: jokeData.question,
            answer: jokeData.answer
        });

        if (existingJoke) {
            console.log(`Joke with question "${jokeData.question}" and answer "${jokeData.answer}" already in the db`);
        } else {
            const joke = {
                question: jokeData.question,
                answer: jokeData.answer,
                votes: [
                    {
                        value: 0,
                        label: "😂",
                    },
                    {
                        value: 0,
                        label: "👍",
                    },
                    {
                        value: 0,
                        label: "❤️",
                    },
                ],
                // availableVotes: ["😂", "👍", "❤️"]
            };

            const newJoke = new JokeModel(joke);
            await newJoke.save();

            console.log(`joke was saved: ${joke.question}`);
        }

    } catch (error) {
        console.error('Error occurred while getting or saving the joke:', error);
    }
};


export const fetchMultipleJokes = async (count) => {
    for (let i = 0; i < count; i++) {
        await fetchAndSaveJokes(); // Викликаємо fetchAndSaveJokes
    }
};

