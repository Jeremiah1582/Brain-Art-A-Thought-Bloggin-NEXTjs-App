// GET all prompts related to input, be it Tag, Prompt or User
import { connectToDatabase } from "../../../../app/utils/database";
import Prompt from '../../../../app/models/prompt';

export const GET = async (request) => {
    try {
        // Get the search query from the URL
        const url = new URL(request.url);
        const searchText = url.searchParams.get('searchText');

        await connectToDatabase();
        
        // Don't use exec() with a callback - use async/await instead
        const prompts = await Prompt.find({
            $or: [
                { prompt: { $regex: searchText, $options: "i" } },
                { tag: { $regex: searchText, $options: "i" } }
            ]
        }).populate('userId');

        return new Response(JSON.stringify(prompts), { status: 200 });

    } catch (error) {
        console.error('Failed to search and return item:', error);
        return new Response(JSON.stringify({ msg: 'Failed to search and return item' }), { status: 500 });
    }
}
