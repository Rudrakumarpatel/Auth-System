// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = require('../models/UserSchema');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Register
router.post('/register', [
    body('username').isString().notEmpty(),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser  = await UserSchema.findOne({ username });
        if (existingUser ) {
            return res.status(201).json({ message: 'User  already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser  = new UserSchema({
            username,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser .save();

        return res.status(201).json({ message: 'User  registered successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await UserSchema.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: UserSchema._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;