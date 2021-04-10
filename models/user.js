import mongoose from "mongoose";
const Schema = mongoose.Schema;
import validator from "validator";


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
    github: {
        type: String,
        trim: true
    },
    occupation: {
        type: String,
        trim: true
    },
    languages: {
        type: [String],
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
        validate: function (value) {
            if(!validator.isEmail(value)){
                throw new Error(`Invalid email ${value}`);
            }
        }
    }
});

const User = mongoose.model('User', userSchema);

export default User;