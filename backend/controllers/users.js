const User = require('../models/User')
const { sign } = require('../utils/jwt')
const { hashPassword, matchPassword } = require('../utils/bcrypt.js')

module.exports.register = async (req, res) => {

    let a = new Date(Date.now())
    let dateUTC = a.toUTCString().slice(0, 16)

    try {
        if (!req.body.email) throw 'Email is required'
        if (!req.body.name) throw 'Name is required'
        if (!req.body.password) throw 'Password is required'
        if (req.body.password !== req.body.repassword)
            throw "Both Password don't match"

        //check existing user
        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) throw 'Email already used'

        const hash = await hashPassword(req.body.password)
        const user = new User({
            email: req.body.email,
            password: hash,
            name: req.body.name,
            date: dateUTC
        })
        User.saveUser(user)

        user.token = await sign(user, 86400)
        user.password = undefined
        res.status(201).json({ status: "ok", user: user })

    } catch (err) {
        res.json({ err: err })
    }

}

module.exports.login = async (req, res) => {

    try {
        if (!req.body.email) throw 'Email is Required'
        if (!req.body.password) throw 'Password is Required'

        // fetch DB 
        const user = await User.findOne({ email: req.body.email })
        if (!user) throw 'Invalid Password or Email'

        // check matching
        const matching = await matchPassword(req.body.password, user.password)
        if (!matching) throw 'Invalid Password or Email'

        // gen token AND del password 
        user.token = await sign(user, req.body.expiresIn)
        user.password = undefined
        res.json({ user })

    } catch (err) {
        res.json({ err: err })
    }
}

module.exports.setting = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email })
            .select('name').select('bio').select('avatar').select('date')

        if (!user) throw 'No such user found'
        // user.token = req.header('Authorization').split(' ')[1]
        return res.status(200).json({ status: 'ok', user: user })

    } catch (err) {
        return res.status(400).json({ err: err })
    }
}

module.exports.chatDisplay = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
            .select('name').select('avatar')

        if (!user) throw 'No such user found'
        // user.token = req.header('Authorization').split(' ')[1]
        return res.status(200).json({ status: 'ok', user: user })

    } catch (err) {
        return res.status(400).json({ err: err })
    }
}

module.exports.updateSetting = async (req, res) => {

    try {

        if (req.body.password !== req.body.repassword)
            throw "Both Password don't match"
        // get req data 
        const user = await User.findOne({ email: req.user.email })
        if (!user) throw 'User not found'

        if (req.body) {

            const name = req.body.name ? req.body.name : user.name
            const bio = req.body.bio ? req.body.bio : user.bio
            let avatar = user.avatar
            let password = user.password

            const image = req.file
            if (image) {
                // delete file in folder
                let fs = require('fs');
                try {
                    let filePath = `../frontend/public/${avatar}`
                    fs.unlinkSync(filePath);
                }
                catch (err) {
                    console.log(err);
                }
                avatar = image.destination.slice(18,) + '/' + image.filename
            }

            if (req.body.password) {
                password = await hashPassword(req.body.password)
            }

            User.findOneAndUpdate({ email: req.user.email },
                { name: name, bio: bio, avatar: avatar, password: password }, { new: true }, (err, data) => {
                    if (!err) {
                        data.password = undefined
                        data.token = req.header('Authorization').split(' ')[1]
                        res.json({ status: 'ok' })
                    }
                    else return res.json({ err: err })
                })

        } else {
            user.password = undefined
            user.token = req.header('Authorization').split(' ')[1]
            return res.json({ err: err })
        }

    } catch (err) {
        return res.status(400).json({ err: err })
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
