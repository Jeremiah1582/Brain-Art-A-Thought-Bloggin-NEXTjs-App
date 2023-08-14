import {connectToDatabase} from '../../../utils/database.js'
import Prompt from '../../../models/prompt.js'

export const POST = async (req,res) =>{
    const {userId, prompt, tag } = req.body;

    try {
        await connectToDatabase() //we have to connect to the database everytime we want to use it because we are using serverless/lambda functions that are stateless (they die after they are used)
        const newPrompt = await new Prompt({
            creator: userId,
            prompt,
            tag,
        })
        await newPrompt.save();

        res.status(200).json({success: true, data: newPrompt})

    }
    catch (error) {
        console.log(error);
        res.status(500).json({success: false, data: 'failed to make new prompt'})
    }

}