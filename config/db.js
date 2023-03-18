const mongoose=require('mongoose');
const colors=require('colors');

const connectDB=async ()=>{

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected db succesfully ${mongoose.connection.host}`.bgYellow.white);
    } catch (error) {
        console.log(`Mongo Error${error}`.bgRed.white);
    }
};

module.exports=connectDB;