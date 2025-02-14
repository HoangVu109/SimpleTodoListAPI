const Todo = require('../models/todoModel')
const ultis = require('../utils/utils');
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
        if(doc==null) {
            return res.status(404).json({message:'Không tìm thấy bản ghi'})
        } else {
            if(doc.email.localeCompare(reqEmail) != 0) {
                return res.status(403).json({message:'Forbidden'})
            } else {
                next()
            }
        }
    } catch (error) {
        console.log(error);
        
        next(error);
    }
};
