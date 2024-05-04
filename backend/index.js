
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import conn from './db.js';
import router from './routes/userRoute.js';
import displayRoute from './routes/displayRoute.js';
import orderrouter from './routes/orderRoute.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/user' , router);
app.use('/user' , displayRoute);
app.use('/foodorder', orderrouter);

conn();
const Port = process.env.PORT || 2001 ;
app.listen(Port , ()=>console.log(`server run on port ${Port}`));
