import mongoose from 'mongoose'
let isConnected = false  //track the connection status


export const connectToDatabase = async () => {
    
    mongoose.set('strictQuery', true) // sets mongoose options: this is to prevent mongoose from using deprecated methods and prevents warnings in the console (recommended)
    if (isConnected) {
        console.log('using existing connection')
        return
    }else{
        try {
            await mongoose.connect(process.env.MONGODB_URI,{
                dbName: process.env.DB_NAME,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            isConnected = true
            console.log('MongoDB is connection')
        } catch (error) {

            console.log('not connected to DB',error);
        }

    }
}