import express from 'express'
import dotenv from 'dotenv'
import authrouter from "./src/routes/auth";
dotenv.config();

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

