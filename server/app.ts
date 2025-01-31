import express from 'express'
import dotenv from 'dotenv'
import authrouter from "./src/routes/auth";
import productRoutes from "./src/routes/products";
import {passportConfig} from "./auth";
import passport from "passport";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
passportConfig(passport);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.use('/products', productRoutes);
app.use('/auth', authrouter);

