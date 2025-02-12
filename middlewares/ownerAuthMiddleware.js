const Todo = require('../models/todoModel')
const ultis = require('../ultis/ultis');
const path = require('path');
const mongoose = require('mongoose');
const { log } = require('console');
require('dotenv').config({ path: path.join(__dirname,  '..', '.env') });

const secretKey = process.env.SECRET_KEY;

exports.ownerAuthMiddleware = async function(req,res,next) {
    const reqEmail = req.body.email;
    const _id = new mongoose.Types.ObjectId(req.params.todoId);
    try {
        const doc = await Todo.findById(_id)
        console.log(doc);
        
        if(doc==null) {
            return res.status(404).json({message:'Không tìm thấy bản ghi'})
        } else {
            console.log(doc)
            console.log(doc.email)
            if(doc.email.localeCompare(reqEmail) != 0) {
                return res.status(403).json({message:'Forbidden'})
            } else {
                next()
            }
        }
    } catch (error) {
        next(error);
    }
};
