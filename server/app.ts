import express from 'express'
import dotenv from 'dotenv'
import authrouter from "./src/routes/auth";
import {passportConfig} from "./auth";
import passport from "passport";

dotenv.config();
passportConfig(passport);

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.use('/auth', authrouter);

