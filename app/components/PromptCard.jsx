"use client";
import { useState } from "react";
import Image from "next/image";
import useSession from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

function PromptCard({ post, handleTagClick, handleEdit, handleDelete }) {
  const [copied, setCopied] = useState("");
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          {post.userId.image ? (
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
              {post.userId.userName}
            </h3>
            <p className="font-inter text-sm text-gray-800">{post.prompt}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={() => {}}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default PromptCard;
