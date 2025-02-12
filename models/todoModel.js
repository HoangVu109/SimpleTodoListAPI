const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    email: {type: String, unique: false},
    title: {type: String, required: false},
    description: {type: String, required: false},
});

module.exports = mongoose.model('Todo', todoSchema)