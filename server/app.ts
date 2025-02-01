import express from 'express'
import dotenv from 'dotenv'
import authRouter from "./src/routes/auth";
import productRoutes from "./src/routes/products";
import {passportConfig} from "./auth";
import passport from "passport";
import orderRoute from "./src/routes/order.route";
import personalData from "./database/models/personalData";
import user from "./database/models/user";

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
app.use('/orders', orderRoute)



app.get('/', async (req, res) => {
    const finduser = await user.findOne({where: {email:'sebas@gmail.com'}})
    if(!finduser){
        res.status(401).json({message:'User not found'});
        return;
    }
    const userData = await personalData.create({
        name: 'azael es un pendejo',
        address: 'calle culera',
        last_name: 'y un estupido',
        age: '22',
        user_id: finduser.id})
    res.status(200).json({userData})
})

