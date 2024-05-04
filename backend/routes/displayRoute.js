
import express from 'express';

const displayRoute = express.Router();

displayRoute.post('/fooddata' , (req,res)=>{

    try {
        // console.log(global.food_items)
        res.send([global.food_items , global.food_category])
    } catch (err) {
        console.log(err);
        res.send('server err' )
    }
})

export default displayRoute;