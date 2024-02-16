const mongoose = require('mongoose');
const trackerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

trackerSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.date = ret.date.toISOString().split('T')[0];
        return ret;
    }
});

module.exports = mongoose.model('Notes', trackerSchema);
