var jwt = require('jsonwebtoken');

const generateToken = (id) =>{
 return jwt.sign(
        {
            id: id,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: '1770h' })
}

module.exports = {
    generateToken,
}