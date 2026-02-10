const { Jokes } = require("../dataBase");

class JokesRepository {
    async getRandomJoke() {
        return await Jokes.aggregate([{ $sample: { size: 1 } }]);
    }

    async findById(id) {
        return await Jokes.findById(id);
    }

    async save(joke) {
        return await joke.save();
    }

    async deleteById(id) {
        return await Jokes.findByIdAndDelete(id);
    }

    async getAllJokes() {
        return await Jokes.find();
    }

    async findByQuestionAndAnswer(question, answer) {
        return await Jokes.findOne({ question, answer });
    }
}

module.exports = new JokesRepository();