const Todo = require('../models/todoModel')

exports.create = async function(req,res) {
    try {
        const newTodo = new Todo(Object.assign(req.body,req.email))
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