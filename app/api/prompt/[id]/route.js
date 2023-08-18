import Prompt from "@/app/models/prompt";
import { connectToDatabase } from "@/app/utils/database";

// get 
export const GET= async (req,{params})=>{
    // const {userID}=req.json(); 
    try {
        await connectToDatabase();
    
        const singlePrompt = await Prompt.findById(params.id).
        populate('userId'); //the string arg refers to the field in the prompt model
        if (!singlePrompt) {
            return new Response(JSON.stringify({msg:'prompt not found'}), { status: 404 })
        }
        return new Response(JSON.stringify(singlePrompt), { status: 200 })
         
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({error, msg:'get prompt prompts function failed'}), {status:500} )
    }
    }
// update/ patch 
export const PATCH= async (req,{params})=>{
    const { prompt, tag } = await req.json();
    try {
        await connectToDatabase();
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) {
            return new Response(JSON.stringify({msg:'prompt not found'}), { status: 404 })
        }
        existingPrompt.prompt = prompt;//update the prompt
        existingPrompt.tag = tag;//update the tag
        existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({error, msg:'patch prompt prompts function failed'}), {status:500} )
        
    }

}
// delete
export const DELETE= async (req,{params})=>{
    try {
        await connectToDatabase();
        const existingPrompt = await Prompt.findByIdAn(params.id);
        if (!existingPrompt) {
            return new Response(JSON.stringify({msg:'prompt not found'}), { status: 404 })
        }
        await existingPrompt.remove();
        return new Response(JSON.stringify({msg:'prompt removed'}), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({error, msg:'failed to delete prompt'}), {status:500} )
        
    }

}