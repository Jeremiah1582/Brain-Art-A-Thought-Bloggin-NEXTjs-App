// GET all prompts related to input, be it Tag, Prompt or User
import { connectToDatabase } from "../../../utils/database";
import Prompt from "../../../models/prompt";

export const GET = async (req, { params }) => {
    const { input } = params;
    try {
        await connectToDatabase();
        await Prompt.find({ $or: [{ prompt: { $regex: input, $options: "i" } }, { tag: { $regex: input, $options: "i" } }] })
        .populate('userId')
        .exec((err, prompts) => {
            if (err) {
                return new Response(JSON.stringify({ msg: 'prompt not found' }), { status: 404 })
            }
            return new Response(JSON.stringify(prompts), { status: 200 })
        })
    } catch (error) {
        console.error('failed to search and return item',error);
        
    }
}