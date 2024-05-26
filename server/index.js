import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Test from './models/Test.js';

function configDotEnv() {
    try {
        dotenv.config();
    }
    catch (err) {
        console.log(err);
    }
}

async function connectDatabase(DB_USER, DB_PASSWORD, DB_NAME) {
    try {
        DB_USER = String(DB_USER);
        DB_PASSWORD = String(DB_PASSWORD);
        DB_NAME = String(DB_NAME);

        mongoose
        .connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.wgh65sg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
        )
        .then(() => console.log("Database connected"))
        .catch((err) => console.log(`Database error: ${err}`));
    }
    catch (err) {
        console.log(`Database error: ${err}`);
    }
}

async function startServer(PORT, DB_USER, DB_PASSWORD, DB_NAME) {
    try {
        PORT = Number(PORT);
        await connectDatabase(DB_USER, DB_PASSWORD, DB_NAME);

        app.listen(PORT, (err) => {
            if (err) 
                return console.log(`Server error: ${err}`);
            console.log(`Server started on port ${PORT}`);
        })
    }
    catch (err) {
        console.log(`Server error: ${err}`);
    }
}

configDotEnv();

const PORT = process.env.PORT || 3000;
const DB_USER = process.env.DB_USER || "vladhaleta2023";
const DB_PASSWORD = process.env.DB_PASSWORD || "vladhaleta2023";
const DB_NAME = process.env.DB_NAME || "GWEBTEST";

const app = express();

app.use(express.json());
app.use(cors());

/*
app.use(
    cors({
        origin: "http//localhost:3000",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [],
    })
);
*/

// get all tests
app.get('/tests', async(req, res) => {
    try {
        const tests = await Test.find({});

        return res.status(200).json({
            tests,
            message: "Get tests successfully"
        });
    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            message: "No access",
        });
    }
});

// add new test
app.post('/tests', async(req, res) => {
    try {
        const title = req.body.title;

        if (!title) {
            return res.status(400).json({
                message: "Send required fields: title",
            });
        }

        const newTest = new Test ({
            title: title,
        });

        await newTest.save();

        res.status(200).json({
            message: "Add test successfully"
        });
    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            message: "No access",
        });
    }
});

// delete test
app.delete('/tests/:testId', async(req, res) => {
    try {
        const { testId } = req.params;

        const result = await Test.findByIdAndDelete(testId);

        if (!result) {
            return res.status(400).json({
                message: "Test not found",
            })
        }

        return res.json({
            message: "Delete successfully"
        })
    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            message: "No access",
        });
    }
});

startServer(PORT, DB_USER, DB_PASSWORD, DB_NAME);

app.get('/', (req, res) => {
    return res.json({message: "Server connected"});
});