const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://iqbaal230902:Pl7xIDQ4fXow9yzN@cluster0.zvosfuq.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

app.use(cors({
    origin: "https://filmku-frontend.vercel.app",
    credentials: true,
}));

app.use(bodyParser.json());

app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error', message: `${error}` });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const session_id = generateSessionId();

        res.status(200).json({ session_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error', message: `${error}` });
    }
});

function generateSessionId() {
    return Math.random().toString(36).substring(7);
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
