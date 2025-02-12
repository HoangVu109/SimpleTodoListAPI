const Account = require('../models/accountModel')
const ultis = require('../ultis/ultis');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname,  '..', '.env') });

const secretKey = process.env.SECRET_KEY;

exports.authMiddleware = async function(req,res,next) {
    const accessTokenFromHeader = req.headers.authorization;
	if (!accessTokenFromHeader) {
		return res.status(400).json({err:'Không tìm thấy access token'});
	}
    const verified = await ultis.verifyToken(accessTokenFromHeader);
    console.log(verified)
	if (!verified) { 
		return res
			.status(403)
			.json({err:'Access token không hợp lệ.'});
	}

	const decoded = await ultis.decodeToken(accessTokenFromHeader);
    if (!decoded) {
		return res.status(403).json({err : 'Access token không hợp lệ.'});
	}
    const email = decoded.email;
    res.email = email;

	return next();
};
