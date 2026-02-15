import {JokeModel} from "../dataBase/jokeModel.js"

class JokesRepository {
    async getRandomJoke() {
        return await JokeModel.aggregate([{ $sample: { size: 1 } }]);
    }

    async findById(id) {
        return await JokeModel.findById(id);
    }

    async save(joke) {
        return await joke.save();
    }

    async deleteById(id) {
        return await JokeModel.findByIdAndDelete(id);
    }

    async getAllJokes() {
        return await JokeModel.find();
    }

    async findByQuestionAndAnswer(question, answer) {
        return await JokeModel.findOne({ question, answer });
    }
}

export const jokesRepository = new JokesRepository();
