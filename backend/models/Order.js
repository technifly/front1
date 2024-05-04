import mongoose from 'mongoose';

const orderschema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    orderdata:{
        type:Array,
        required:true
    }
});

const Order = mongoose.model('Order',orderschema);

export default Order;


