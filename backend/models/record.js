
const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    id: Number,
    actionName: String,
    actionNumber: String,
    actionType: String,
    amount: Number,
    impact: String,
    postingMonth: String,
    postingYear: Number,
    quantity: Number,
    status: String
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
