import {connectToDatabase} from '@/app/utils/database.js'
import Prompt from '@/app/models/prompt.js'

// POST defines the http method we want to use 
export const POST = async (req) =>{
    const {userId, prompt, tag } = await req.json();
    // console.log('POST func...',userId, prompt, tags);
    const tagsArray = tag.split(/\s+/)
  .filter(t => t.length > 0)
  .map(tag => tag.startsWith('#') ? tag.toLowerCase().trim() : '#' + tag.toLowerCase().trim());

    try {
    await connectToDatabase() //we have to connect to the database everytime we want to use it because we are using serverless/lambda functions that are stateless (they die after they are used)
      const newPrompt = await new Prompt({
            userId,
            prompt,
            tag: tagsArray
        })
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        console.error(error)
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}

// note: try and create the same function using res.status() instead of return