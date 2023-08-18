import Prompt from "../../../../models/prompt";
import { connectToDatabase } from "../../../../utils/database";

export const GET= async (res,{params})=>{
// const {userID}=req.json(); 
console.log('params and RES ....',params);
try {
    await connectToDatabase();

    const usersPrompts = await Prompt.find({userId: params.id}).
    populate('userId'); //the string arg refers to the field in the prompt model
    console.log(usersPrompts);
   return new Response(JSON.stringify(usersPrompts), { status: 200 })

} catch (error) {
    console.log(error);
    return new Response(JSON.stringify({error, msg:'get user prompts function failed'}))
}

}