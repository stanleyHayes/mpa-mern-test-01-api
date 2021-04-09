import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    bio: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    occupation: {
        type: String,
        trim: true
    },
    hobbies: {
        type: [String],
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    }
});

const User = mongoose.model('User', userSchema);

export default User;