const { User, Thought } = require("../models");


module.exports = {
    // Get all user
    getUsers(req, res){
        User.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    // Get single user
    getSingleUser(req, res){
        User.findOneAndDelete({_id: req.params.userId})
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then((user) => 
        !user
          ? res.status(404).json({message:'No user find with this ID'})
          : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create a user
    createUser(req, res){
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    //Delete a User
    deleteUser(req, res){
        User.findOneAndDelete({_id:req.params.userId})
        .then((user) =>
        !user
        ? res.status(404).json({message:"No user with that Id!"})
        : Thought.deleteMany({_id:{ $in: user.thoughts}})
        )
        .then(() => res.json({message:'User and thoughts deleted!'}))
        .catch((err) => res.status(500).json(err));
    },
    // Update a user
    updateUser(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((user) =>
        !user
        ? res.status(404).json({message:'No user with this id!'})
        : res.json(user)
     )
     .catch((err)=> res.status(500).json(err));
    },
    // Add a friend to a User
    addFriend(req, res){
        console.log('You are adding a friend');
        console.log(req.body);
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.body}},
            {runValidators: true, new: true}
        )
            .then((user) =>
                !user
                ? res
                    .status(404)
                    .json({message:'No user found with this id!'})
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Remove friend from a user
    removeFriend(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: {friendId: req.params.friendId}}},
            {runValidators: true, new: true}
        )
        .then((user) =>
            !user
            ? res
                .status(404)
                .json({message:'No user found with that id!'})
            : res.json(user)
       )
       .catch((err) => res.status(500).json(err));
    },
    
};