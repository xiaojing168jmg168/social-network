const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// /api/users Get all users, Create user
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId Get single user, Update/Delete user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends Add/Delete friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;