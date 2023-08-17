import {connectToDatabase} from '../../../utils/database.js'
import Prompt from '../../../models/prompt.js'

// POST defines the http method we want to use 
export const POST = async (req) =>{
    const {userId, prompt, tag } = await req.json();
    // console.log('POST func...',userId, prompt, tags);
    const tagsArray = await tag.split(/\s+/)
    console.log('this is the tags turned into array....',tagsArray);
    try {
    await connectToDatabase() //we have to connect to the database everytime we want to use it because we are using serverless/lambda functions that are stateless (they die after they are used)
      const newPrompt = await new Prompt({
            userId,
            prompt,
            tag
        })
        console.log('new/route.js ',newPrompt);
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        console.error(error)
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}

// note: try and create the same function using res.status() instead of return