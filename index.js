import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import User from "./models/user.js";

dotenv.config({path: './config/config.env'});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(helmet());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log(`Successfully connected to MongoDB`);
}).catch(error => {
    console.log(`Error: ${error.message}`);
});


app.post('/api/v1/users', async (req, res) => {
    try {
        const {email, name, bio, occupation, languages, github} = req.body;
        let user = await User.findOne({email});
        if (user) {
            return res.status(409).json({message: `Account with email ${email} already exists`});
        }
        user = await User.create({email, name, occupation, bio, languages, github});
        res.status(201).json({message: `User details successfully saved`, data: user});
    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
});


app.put('/api/v1/users/:email', async (req, res) => {
    try {
        const {email, name, bio, occupation, languages, github} = req.body;
        if (!req.params.email) {
            return res.status(400).json({message: `email required`});
        }
        let user = await User.findOne({email});
        if (!user) {
            user = await User.create({email, name, occupation, bio, languages, github});
            return res.status(201).json({message: `User details successfully saved`, data: user});
        }
        for (let key of Object.keys(req.body)) {
            user[key] = req.body[key];
        }
        await user.save();
        res.status(200).json({data: user});
    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
});


app.get('/api/v1/users/:email', async (req, res) => {
    try {
        const email = req.params.email;
        if (!email) {
            return res.status(400).json({message: `email required`});
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: `user with email ${email} not found`});
        }
        res.status(200).json({data: user});
    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
});


app.listen(PORT, () => {
    console.log(`Connected to server in ${process.env.NODE_ENV} on port ${PORT}`)
});