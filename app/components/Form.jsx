'use client'
import Link from 'next/link'

function Form({type,post,submitting,setPost,handleSubmit}) {
 
    return (
    <section className='w-full max-w-full flex-col flex-start'>
        <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
        </h1>
        <p className="desc text-left max-w-md"> {type} and share amazing prompts with your network. let your imagination run wild with the power of AI</p>

        <form onSubmit={handleSubmit} 
        className='mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism'> 
        <label>
            <span className='font-satoshi font-semibold text-base text-grey-700'>
               Keep it Short, Keep it Sweet
            </span>
            <textarea  
            maxLength={380}
            placeholder='Enter your prompt here'
            required
            className='form_textarea' value={post.prompt}
            onChange={(e)=>setPost({...post,prompt:e.target.value})}></textarea>
        </label>
        <label>
            <span className='font-satoshi font-semibold text-base text-grey-700'>
                Post Tag
                <span className="font-normal">( #design #tech #web_dev)</span>
            </span>
            <textarea
            maxLength={80}
            placeholder='#tag'
            required
            className='form_input' 
            value={post.tag}
            onChange={(e)=>setPost({...post,tag:e.target.value})}
            >

            </textarea>

        </label>

        {/* buttons */}
        <div className="flex-end mx-3 mb-4 gap-4">
            <Link href='/' className='text-gray-500 text-sm' >
            Cancel
            </Link>
        <button type='submit'
        disable={submitting}
        className="px-5 py-2 text-sm bg-primary-orange rounded-full text-white">
            {submitting? `${type}...`:type}  {/* dynamic button text */}
        </button>
        </div>
        </form>
    </section>
  )
}

export default Form