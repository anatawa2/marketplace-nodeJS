var jwt = require('jsonwebtoken')

module.exports.sign = async (user, exp) => {
    const JWT_SECRET = 'testy'
    return new Promise((resolve, reject) => {
        jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: exp + 's' }, (err, token) => {
            if (err) return reject(err)
            resolve(token)
        })
    })
}

module.exports.decode = async (token) => {
    const JWT_SECRET = 'testy'
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, doc) => {
            if (err) return reject(err)
            return resolve(doc)
        })
    })
}