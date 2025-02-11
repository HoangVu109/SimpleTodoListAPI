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