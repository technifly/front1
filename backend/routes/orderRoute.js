
import express from 'express';
import Order from '../models/Order.js';

const orderrouter = express.Router();

orderrouter.post('/order',
    async (req, res) => {
        
        let data = req.body.orderdata;
        await data.splice(0, 0, { Order_date: req.body.order_date });

        let emailid = await Order.findOne({'email':req.body.email });
        // console.log(emailid);
        if (emailid === null) {
            try {
                await Order.create({
                    email: req.body.email,
                    orderdata: [data]
                }).then(() => {
                    res.json({ success: true })
                })
            } catch (err) {
                console.log(err);
                res.json({msg:'err at server'})
            }
        }
        else {
            try {
                await Order.findOneAndUpdate({ 'email':req.body.email },
                    { $push: { orderdata: data } })
                    .then(() => { res.json({ success: true }) });
            }
            catch (err) {
               res.json({msg:'err at server', err:err})
            }
        }
    });

export default orderrouter;
