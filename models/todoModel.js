const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    email: {type: String, unique: true},
    title: {type: String, required: true},
    decription: {type: String, required: true},
});

module.exports = mongoose.model('Todo', todoSchema)