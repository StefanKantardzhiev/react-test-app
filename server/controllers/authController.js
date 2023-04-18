const { getOffersByOwner } = require('../services/offerService');
const { register, login } = require('../services/userService');


const authController = require('express').Router();

// Register route
authController.post('/register', async (req, res) => {
    const { email, password, rePass } = req.body;
    try {
        const user = await register(email, password, rePass);
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
    res.end()
});

// Login route
authController.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await login(email, password)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    res.end()
});

// Logout route
authController.get('/logout', (req, res) => {
    // api.logout(req.user.token);
    res.status(204).end();
});

// get offers by owner

authController.get('/profile', async (req, res) => {
    const _id = req?.user?._id;
    const cars = await getOffersByOwner(_id)
    res.status(200).json(cars)
    res.end()
});
module.exports = authController;