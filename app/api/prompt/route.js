import Prompt from "@/app/models/prompt";
import { connectToDatabase } from "@/app/utils/database";

export const GET= async (req,{params})=>{
// const {userID}=req.json(); 
try {
    await connectToDatabase();

    const allPrompts = await Prompt.find().
    populate('userId'); //the string arg refers to the field in the prompt model. It will populate the userId field (in the returned object) with the Users document's info
    console.log(allPrompts);
   return new Response(JSON.stringify(allPrompts), { status: 200 })
} catch (error) {
    console.log(error);
    return new Response(JSON.stringify({error, msg:'get prompt prompts function failed'}))
}
}