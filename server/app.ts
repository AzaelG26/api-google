import express from 'express'
import dotenv from 'dotenv'
import authRouter from "./src/routes/auth";
import productRoutes from "./src/routes/products";
import Roles  from "./src/routes/roles";
import personaldata from "./src/routes/personal.data"
import {passportConfig} from "./auth";
import passport from "passport";
import orderRoute from "./src/routes/order.route";
import personalData from "./database/models/personalData";
import user from "./database/models/user";
import cors from "cors";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

passportConfig(passport);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.use('/products', productRoutes);
app.use('/auth', authRouter);
app.use('/roles', Roles);
app.use('/orders', orderRoute);
app.use('/personaldata', personaldata);


