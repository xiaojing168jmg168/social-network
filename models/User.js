const { Schema, model, Types } = require('mongoose');

//create user schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                "Please fill a valid email address!",
            ],
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//create virtual called friendCount
userSchema.virtual("friendCount").get(function(){
    return this.friends.length;
})

//create the User model using th userSchema
const User = model('User', userSchema);

//export the User model
module.exports = User;
