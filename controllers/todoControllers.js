const Todo = require('../models/todoModel')
const mongoose = require('mongoose')
exports.todoCreate = async function(req,res) {
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

exports.todoUpdate = async function (req,res) {
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

exports.todoDelete = async function (req,res) {
    const _id = new mongoose.Types.ObjectId(req.params.todoId);
    const filter = {_id : _id};
    try {
        var result = await Todo.deleteOne(filter);
    } catch (error) {
        return res.json({ err: error,desc: 'Lỗi' });
    }
    res.status(204).json({deleteCount: result+''})
}

exports.todoGet = async function(req,res) {
    const page = req.query.page
    const limit = req.query.limit
    const filter = {
        email: req.body.email
    }
    const projection = {
        _id : '$id',
        title : 1,
        description : 1
    }
    try {
        var result = await Todo.find(filter,projection).skip((page-1)*limit).limit(limit)
        res.status(200).json({
            data: result,
            page: page,
            limit: limit,
            total: result.length
        })
    } catch {
        return res.json({ err: error,desc: 'Lỗi' });
    }
}