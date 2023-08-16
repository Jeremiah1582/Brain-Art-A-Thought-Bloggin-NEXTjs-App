import Prompt from "../../models/prompt";
import { connectToDatabase } from "../../utils/database";

export const GET= async (req,res)=>{
// const {userID}=req.json(); 
try {
    await connectToDatabase();

    const allPrompts = await Prompt.find({}).
    populate('userId'); //the string arg refers to the field in the prompt model
    console.log(allPrompts);
   return new Response(JSON.stringify(allPrompts), { status: 200 })

} catch (error) {
    console.log(error);
    return new Response(JSON.stringify({error, msg:'get prompts function failed'}))
}

}