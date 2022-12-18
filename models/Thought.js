const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

//create reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createAt: {
            type: Date,
            default: Date.now,
            get: createAtVal => moment(createAtVal).format('MM DD, YYYY [at] hh:mm a'),
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);


//create thought schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createAt: {
            type: Date,
            default: Date.now,
            get: createAtVal => moment(createAtVal).format('MM DD, YYYY [at] hh:mm a'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

//create a virtual called reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

//create the THought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);

//export the Thought model
module.exports = Thought;

