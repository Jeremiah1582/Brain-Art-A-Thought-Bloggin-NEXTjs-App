import mongoose from 'mongoose'



export const connectToDatabase = async () => {
    
    mongoose.set('strictQuery', true) // sets mongoose options: this is to prevent mongoose from using deprecated methods and prevents warnings in the console (recommended)
    if (mongoose.connection.readyState) { // checks if there is already a connection
        console.log('using existing connection')
        return
    }
    if (!process.env.MONGODB_URI || !process.env.DB_NAME) {
        throw new Error('MONGODB_URI and DB_NAME must be defined');
      }

        try {
            await mongoose.connect(process.env.MONGODB_URI,{
                dbName: process.env.DB_NAME,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
           
            console.log('MongoDB is connection')
        } catch (error) {
            console.log('not connected to DB',error);
            throw error
        }

    
}