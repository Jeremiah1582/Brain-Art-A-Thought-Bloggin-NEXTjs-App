"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

function PromptCard({ post, handleTagClick, handleEdit, handleDelete }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    //this function copies the text to clip board
    setCopied(post.prompt);
   console.log('userName...',post.userId.userName);
    navigator.clipboard.writeText(`' ${post.prompt} '` + '\n' +  `   Quote by ${post.userId.userName}   `);

    setTimeout(() => setCopied(""), 3000);
  };
// when profile name or image is clicked it will route to the profile page of the user who created the post
  const handleRouteToProfile=(post)=>{
    console.log(post);
    router.push(`/profile/?id=${post.userId._id}`)
  }

  return (
    <div className="prompt_card" key={post.userId?.id}>
      <div className="flex justify-between items-start gap-5">
        <div 
        
        className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          {post.userId?.image ? (
            <Image
              src={post.userId.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
              onClick={()=> handleRouteToProfile(post)}
            />
          ) : null}
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-400"
            onClick={()=> handleRouteToProfile(post)}>
              {post.userId?.userName}
            </h3>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            alt="copy"
            src={
              copied === post.prompt
              ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E"
              : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='9' y='9' width='13' height='13' rx='2' ry='2'%3E%3C/rect%3E%3Cpath d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'%3E%3C/path%3E%3C/svg%3E"
          }
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-inter text-sm text-gray-800">{post.prompt}</p>

     
        {post.tag?
         <div className='flex flex-wrap'>
          {post.tag.map((tag,indx) => (
              <span
                key={tag + indx}
                className="text-gray-400 w-fit mx-4 cursor-pointer font-inter text-sm blue-gradient"
                onClick={() => handleTagClick && handleTagClick(tag)}
              >
                {tag}
              </span>
            ))
          }

         </div>
          : null}
      

      {/* below condition only allows the edit and delete button to be visible on the profile page as the props are being passed to the component dynamically */}
      {session?.user.id === post.userId._id && handleEdit && handleDelete ? (
        <div className="mt-5 flex flex-end">
          <span
            className=" font-inter mx-4 text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit(post)}
          >
            {" "}
            Edit
          </span>
          <span
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete(post)}
          >
            {" "}
            delete
          </span>
        </div>
      ) : null}
    </div>
  );
}

export default PromptCard;
