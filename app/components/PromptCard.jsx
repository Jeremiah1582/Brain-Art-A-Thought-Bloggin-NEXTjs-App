"use client";
import { useState } from "react";
import Image from "next/image";
import useSession from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

function PromptCard({ post, handleTagClick, handleEdit, handleDelete }) {
  const [copied, setCopied] = useState("");
  const handleCopy = () => {
  setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(()=>setCopied(''),3000)
}
  return (
    <div className="prompt_card"
    key={post.userId?.id}>
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          {post.userId?.image ? (
            <Image
              src={post.userId.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          ) : null}
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-400">
              {post.userId?.userName}
            </h3>
           
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
          alt='copy'
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-inter text-sm text-gray-800">{post.prompt}</p>
      <p className='my-4 placeholder:cursor-pointer font-inter text-sm blue-gradient' 
      onClick={()=>handleClick && handleTagClick(post.tag)}>
        {post.tag}
      </p>
    </div>
  );
}

export default PromptCard;
