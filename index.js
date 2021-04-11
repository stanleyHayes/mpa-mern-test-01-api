import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";

dotenv.config({path: './config/config.env'});

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log(`Successfully connected to MongoDB`);
}).catch(error => {
    console.log(`Error: ${error.message}`);
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Connected to server in ${process.env.NODE_ENV} on port ${PORT}`)
});