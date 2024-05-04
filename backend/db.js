import mongoose from 'mongoose';

const conn = async () => {
    await mongoose.connect(process.env.mongoURL , { useNewUrlParser: true },
        async (err)=>{
        if (err) {
            console.log(err);
        }
        else {
            console.log('connected.')
            const getdata = await mongoose.connection.db.collection('food_items');

            getdata.find({}).toArray( async (err, data)=> {
                const foodCategory = await mongoose.connection.db.collection('food_category')
                foodCategory.find({}).toArray( (err, catdata)=>{
                    if(err){
                            console.log(err);
                        }
                        else{
                            global.food_items = data;
                            global.food_category = catdata;
                        }
                })
                
            })
        }
    }
);


}
export default conn;