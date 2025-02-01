import express from 'express'
import dotenv from 'dotenv'
import authRouter from "./src/routes/auth";
import productRoutes from "./src/routes/products";
import Roles  from "./src/routes/roles";
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

app.use('/products', productRoutes);
app.use('/auth', authRouter);
app.use('/roles', Roles);


app.get('/', async (req, res) => {
    res.json('Hello World!');
})

