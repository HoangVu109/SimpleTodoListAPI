const Account = require('../models/accountModel')
const bcrypt = require('bcrypt')

exports.register = async function(req, res, next) {
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
                    res.json({ account: result });
                } catch (saveErr) {
                    return res.json({ err: saveErr });
                }
            });
        } else {
            res.status(409).json({ err: 'Email đã được sử dụng' });
        }
    } catch (error) {
        return res.status(500).json({ err: "Lỗi server." });
    }
};