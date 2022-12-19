const {User, Thought} = require("../models");

module.exports = {
    // Get all thoughts
    getThoughts(req, res){
        Thought.find()
            .then((thoughts) => res.json(thoughts));
            .catch((err) => res.status(500).json(err));
    },
    // Get single thought
    getSingleThought(req, res){
        Thought.findOne({_id: req.params.thoughtId})
            .select('-__v')
            .then((thought) =>
                !thought
                ? res.status(404).json({message: 'No Thought found with this id!'})
                : res.json(thought)
           )
           .catch((err) => res.status(500).json(err));
    },
    // Create a thought and add thought's _id to the associated user's thoughts
    createThought(req, res){
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    {_id: req.body.userId},
                    {$addToSet:{thoughts: thought._id}},
                    {new: true}
                );
            })
            .then((user) =>
             !user
               ? res.status(404).json({message: 'Thought created, but no user found with that id!'})
               : res.json('Created the thought 🎉')
            )
            .catch((err) =>{
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Update a thought
    updateThought(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((user) =>
        !user
          ? res.status(404).json({message:'No thought found with this id'})
          : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete a thought
    deleteThought(req, res){
        Thought.findOneAndRemove({_id: req.params.thoughtId})
        .then((thought) =>
            !thought
            ? res.status(404).json({message: 'No thought found with this id!'})
            : user.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            )
        )
        .then((user) =>
          !user
             ? res.status(404).json({message: 'Thought deleted, but no user found!'})
             : res.json({message: 'Thought successfully deleted!'})
        )
        .catch((err) => res.status(500).json(err));
    },

}