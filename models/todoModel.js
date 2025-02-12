const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    email: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
});

module.exports = mongoose.model('Todo', todoSchema)