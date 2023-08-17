import {Schema ,model, models} from 'mongoose';

const promptSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, // this is the ID object of the User
        ref:'User'//ref = one to many relationship
    }, 
    prompt: {
        type: String, 
        required: [true, 'Please add a prompt'] // [] allows us to add a custom message
    },
    tag: {
        type:[String,], 
        required:[ true ,  'Please add a tag']
    },
    // date: {type: Date, default: Date.now},
})

const Prompt = models.Prompt || model('Prompt', promptSchema); // More efficient: if model exist use it else create a new model based on the promptSchema schema
export default Prompt;