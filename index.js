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
        const {email, name, bio, occupation, hobbies, website} = req.body;
        let user = await User.findOne({email});
        if (!user) {
            return res.status(409).json({message: `Account with email ${email} already exists`});
        }
        user = await User.create({email, name, occupation, bio, hobbies, website});
        res.status(201).json({message: `User details successfully saved`, data: user});
    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
});


app.get('/api/v1/users', async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
});


app.get('/api/v1/users/:id', async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({message: `${e.message}`});
    }
});


app.listen(PORT, () => {
    console.log(`Connected to server in ${process.env.NODE_ENV} on port ${PORT}`)
});