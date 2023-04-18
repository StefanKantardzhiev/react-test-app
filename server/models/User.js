const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
        minlength: [6, 'Password should have at least 5 characters!'],
        maxlength: [12, 'Password cannot have more than 12 characters!'],
    },
    offers: [
        {
            type: Array,
            ref: 'Offer',
        }
    ],
    comments: [
        {
            type: Array,
            ref: 'Offer',
        }
    ]
})
userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then((hash) => {
            this.password = hash
            return next()
        })
})
const user = new mongoose.model('User', userSchema);
module.exports = user;