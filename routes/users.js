import User from "../models/user";
import express from "express";

const router = express.Router();

router.post('/', async (req, res) => {
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


router.put('/:email', async (req, res) => {
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


router.get('/:email', async (req, res) => {
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

export default router;