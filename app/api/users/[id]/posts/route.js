import Prompt from "../../../../models/prompt";
import { connectToDatabase } from "../../../../utils/database";

export const GET= async (request,{params})=>{
try {
    await connectToDatabase();

    // 🎯 OPTIMIZATION: Add pagination for user posts too
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const skip = page * limit;

    const usersPrompts = await Prompt.find({userId: params.id})
        .populate('userId') //the string arg refers to the field in the prompt model
        .sort({ date: -1 }) // Newest first
        .skip(skip)
        .limit(limit);
        
    const totalCount = await Prompt.countDocuments({userId: params.id});
    const totalPages = Math.ceil(totalCount / limit);
    
    const response = {
        prompts: usersPrompts,
        pagination: {
            currentPage: page,
            totalPages,
            totalCount,
            hasNextPage: page < totalPages - 1,
            hasPreviousPage: page > 0
        }
    };
    
   return new Response(JSON.stringify(response), { status: 200 })

} catch (error) {
    return new Response(JSON.stringify({error, msg:'get user prompts function failed'}))
}

}