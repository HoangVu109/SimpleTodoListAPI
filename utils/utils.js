const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname,  '..', '.env') });

const secretKey = process.env.SECRET_KEY;

exports.generateJWT = async function (payload) {
    const options = {
        algorithm: 'HS256',
        expiresIn: '1h'
      };
    try {
      const token = await jwt.sign(payload, secretKey, options);
      return token;
    } catch (error) {
        console.log(error)
        console.error('Lỗi tạo JWT');
    }
  }

exports.decodeToken = function(accessTokenFromHeader) {
    const decoded = jwt.decode(
		accessTokenFromHeader,
		secretKey,
	);
    return decoded
}

exports.verifyToken = async function(accessTokenFromHeader) {
    return new Promise((resolve,reject) => {
        jwt.verify(accessTokenFromHeader, secretKey, (err, result) => {
            if (err) {
                console.error("JWT không hợp lệ:", err);
                return resolve(false);
            } else return resolve(true);
        });
    })
}