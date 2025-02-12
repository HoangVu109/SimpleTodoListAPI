const Todo = require('../models/todoModel')
const mongoose = require('mongoose')
exports.create = async function(req,res) {
    try {
        const newTodo = new Todo(req.body)
        try {
            const result = await newTodo.save();
            res.json({ id: result._id,title: result.title, description: result.description });
        } catch (saveErr) {
            console.log(saveErr)
            return res.json({ err: saveErr,desc: 'Lỗi' });
        }        
    } catch (error) {
        console.log(error)
        return res.json({ err: error,desc: 'Lỗi' });
    }
}

exports.update = async function (req,res) {
    const _id = new mongoose.Types.ObjectId(req.params.todoId);
    const filter = {_id : _id};
    const update = {
        title : req.body.title,
        description : req.body.description
    }
    try {
        var result = await Todo.findOneAndUpdate(filter, update, {
            returnOriginal: false
        });
    } catch (error) {
        return res.json({ err: error,desc: 'Lỗi' });
    }
    res.status(200).json({ id: result._id,title: result.title, description: result.description });
}

exports.delete = async function (req,res) {
    
}