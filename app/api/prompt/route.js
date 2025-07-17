import Prompt from "../../../app/models/prompt";
import { connectToDatabase } from "../../../app/utils/database";

export const GET= async (request)=>{
try {
    await connectToDatabase();

    // 🎯 OPTIMIZATION: Extract pagination parameters from URL
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    
    // Calculate how many documents to skip
    const skip = page * limit;
    
    // 🎯 OPTIMIZATION: Paginated query with sorting
    const prompts = await Prompt.find()
        .populate('userId') // Populate user data
        .sort({ date: -1 }) // Newest first (important for consistent pagination)
        .skip(skip) // Skip previous pages
        .limit(limit); // Limit current page size
    
    // 🎯 OPTIMIZATION: Get total count for pagination metadata
    const totalCount = await Prompt.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    
    // Return data with pagination metadata
    const response = {
        prompts,
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
    return new Response(JSON.stringify({error, msg:'get prompt prompts function failed'}))
}
}