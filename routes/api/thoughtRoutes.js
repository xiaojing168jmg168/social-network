const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts Get all thoughts and Post thought
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId Get one thought, put and delete thought by id
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions Post new reaction
router.route('/:thoughtId/reactions').post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId Delete reaction by id
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;