const Account = require('../models/accountModel')
const bcrypt = require('bcrypt')

exports.login = async function(req, res, next) {
    try {
        const account = await Account.findOne({ email: req.body.email });

        if (account == null) {
            res.status(400).json({ err: 'Email hoặc mật khẩu không đúng' });
        } else {
            bcrypt.compare(req.body.password, account.password, (err, result) => {
                if (err) {
                    console.log('Lỗi')
                    return next(err);
                }
                if(result === true){
                    return res.json({result:'Thành công',
                        hash : account.password
                    })
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