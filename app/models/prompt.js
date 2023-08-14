import {Schema,model, models} from 'mongoose';

const promptSchema = new Schema({
    creator: {type: String, required: true, ref: 'User'	}, //ref = one to many relationship
    prompt: {type: String, required: [true, 'Please add a prompt']},
    tag: {type: String, required:[ true ,  'Please add a tag']},
    date: {type: Date, default: Date.now},
})

const Prompt = models.Prompt || model('Prompt', promptSchema); // More efficient: if model exist use it else create a new model
export default Prompt;