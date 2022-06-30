const User = require('../models/User')
const { sign } = require('../utils/jwt')
const { hashPassword, matchPassword } = require('../utils/bcrypt.js')
const { findOneAndUpdate } = require('../models/User')


module.exports.register = async (req, res) => {
    try {
        if (!req.body.email) throw 'Email is required'
        if (!req.body.password) throw 'Password is required'
        if (!req.body.name) throw 'Name is required'

        //check existing user
        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) throw 'Email already used'

        const hash = await hashPassword(req.body.password)
        const user = new User({
            email: req.body.email,
            password: hash,
            name: req.body.name,
            bio: req.body.bio,
        })
        User.saveUser(user)

        user.token = await sign(user)
        user.password = undefined
        res.status(201).json({ user })

    } catch (err) {
        res.json({ err })
    }

}

module.exports.login = async (req, res) => {

    try {
        if (!req.body.email) throw 'Username is Required'
        if (!req.body.password) throw 'Password is Required'

        // fetch DB 
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            throw 'User not found'
        }

        // check matching
        const matching = await matchPassword(req.body.password, user.password)
        if (!matching) return res.status(401).json('Invalid password or email id')

        // gen token AND del password
        user.token = await sign(user)
        user.password = undefined
        res.json({ user })

    } catch (err) {
        res.json({ err })
    }

}

module.exports.setting = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email })
        console.log('hi');

        if (!user) throw 'No such user found'
        user.password = undefined
        user.token = req.header('Authorization').split(' ')[1]
        return res.status(200).json({ user })

    } catch (e) {
        return res.status(404).json({
            errors: { body: [e.message] }
        })
    }
}

module.exports.updateSetting = async (req, res) => {
    try {
        // get req data 
        const user = await User.findOne({ email: req.user.email })
        if (!user) throw 'No such user found'
        console.log(req.body);

        if (req.body) {
            const name = req.body.name ? req.body.name : user.name
            const bio = req.body.bio ? req.body.bio : user.bio
            let image = user.image
            let password = user.password

            if (req.file) {
                image = req.file.filename
            }
            console.log("rf", req.file);
            console.log("rfn", req.file.filename);
            if (req.body.password) {
                password = await hashPassword(req.body.password)
            }

            User.findOneAndUpdate({ email: req.user.email },
                { name: name, bio: bio, image: image, password: password }, { new: true }, (err, data) => {
                    if (err) res.json(data)
                    else {
                        data.password = undefined
                        data.token = req.header('Authorization').split(' ')[1]
                        res.json(data)
                    }
                })

        } else {
            user.password = undefined
            user.token = req.header('Authorization').split(' ')[1]
            return res.json(user)
        }

    } catch (err) {
        return res.status(404).json({
            errors: { body: [err.message] }
        })
    }
}

// module.exports.delete = async (req, res) => {
//     try {
//         console.log(req.body);
//         User.findOneAndDelete({ email: req.body.email }, (err, data) => {
//             if (err) console.log(err);
//             else {
//                 res.json(data)
//             }
//         })

//     } catch (err) {
//         return res.status(404).json({
//             errors: { body: [err.message] }
//         })
//     }

// }
