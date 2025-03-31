var express = require('express');
var router = express.Router();
const {Jokes} = require('../dataBase')
const {fetchMultipleJokes} = require("../services/jokeService");
const jokesController = require("../controllers/jokes.controller");

router.get('/', async (req, res) => {jokesController.getJoke(req, res)});
router.post('/:id', async (req, res) => {jokesController.voteForJoke(req, res)});
router.put('/:id', async (req, res) => {jokesController.changeJoke(req, res)});
router.delete('/:id', async (req, res) => {jokesController.deleteJoke(req, res)});
// Additional:
router.get('/all', async (req, res) => {jokesController.getAllJokes(req, res)});

router.get('/add', async (req, res) => {jokesController.addJokes(req, res)});
module.exports = router;
