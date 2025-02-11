const Account = require('../models/accountModel')
const bcrypt = require('bcrypt')
const ultis = require('../ultis/ultis')

exports.register = async function(req, res) {
    try {
        const existingAccount = await Account.findOne({ email: req.body.email });

        if (existingAccount == null) {
            bcrypt.hash(req.body.password, 10, async function(err, hash) {
                if (err) {
                    return next(err);
                }
                const newAccount = new Account(req.body);
                newAccount.password = hash;

                try {
                    const result = await newAccount.save();
                    const token = await ultis.generateJWT({name: newAccount.name, email: newAccount.email})
                    res.json({ token: token });
                } catch (saveErr) {
                    console.log(saveErr)
                    return res.json({ err: saveErr,desc: 'Lỗi' });
                }
            });
        } else {
            res.status(409).json({ err: 'Email đã được sử dụng' });
        }
    } catch (error) {
        return res.status(500).json({ err: "Lỗi server." });
    }
};

exports.login = async function(req, res) {
    try {
        const account = await Account.findOne({ email: req.body.email });

        if (account == null) {
            res.status(400).json({ err: 'Email hoặc mật khẩu không đúng' });
        } else {
            bcrypt.compare(req.body.password, account.password, async (err, result) => {
                if (err) {
                    console.log('Lỗi')
                    return next(err);
                }
                if(result === true){
                    const token = await ultis.generateJWT({name: account.name, email: account.email})
                    res.json({ token: token });
                }else{
                    return res.json({err: 'Email hoặc mật khẩu không đúng'})
                }
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ err: "Lỗi server." });
    }
};