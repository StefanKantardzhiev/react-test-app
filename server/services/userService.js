const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const server = require('../environment')
const User = require('../models/User')

const validateToken = (token) => {
    try {
        const data = jwt.verify(token, server.SECRET_KEY)
        return data
    } catch (error) {
        throw new Error('Invalid access token!')
    }
}
const createAccessToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email
    }
    const accessToken = jwt.sign(payload, server.SECRET_KEY)
    return {
        email: user.email,
        accessToken,
        _id: user._id
    };
}
const register = async (email, password, rePass) => {
    const existingEmail = await User.findOne({ email })
    // console.log(password,rePass)
    if (password != rePass) {
        throw new Error('Passwords dont match')
    }

    if (existingEmail) {
        throw new Error('Email already exists!')
    }

    const user = await User.create({ email, password })
    return createAccessToken(user)
}
const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password!')
    }
    const isUser = await bcrypt.compare(password, user.password)
    if (isUser) {
        return createAccessToken(user)
    } else {
        throw new Error('Invalid email or password!')
    }
}

const updateUserOffers = async (_id, offerId) => {
    try {
        const user = await User.findById(_id);
        let offerArray = user.offers
        offerArray.push(offerId)
        await User.findByIdAndUpdate(_id, { offers: offerArray })
    } catch (error) {
        throw new Error(error)
    }

    
}

const logout = (token) => {
    blacklist.add(token)
}
module.exports = {
    login,
    register,
    createAccessToken,
    validateToken,
    updateUserOffers
}
