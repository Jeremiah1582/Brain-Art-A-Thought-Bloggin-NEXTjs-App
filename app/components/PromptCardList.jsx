'use client'

import { memo } from 'react'
import PromptCard from "./PromptCard"

// 🎯 OPTIMIZATION: Memoize PromptCardList to prevent re-renders when data hasn't changed
const PromptCardList = memo(function PromptCardList({data, handleTagClick, handleEdit, handleDelete}) {

    return (
      <div className='prompt_layout mt-16'>
        
        {!data.length < 1 ? 
          data.map(
          (prompt) => (
          <PromptCard
            key={prompt._id}
            post={prompt}
            handleTagClick={handleTagClick}
            // {...handleEdit && (handleEdit={handleEdit})} //this is how we can customize the properties of a component
            // {...handleDelete && (handleDelete={handleDelete})}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />

        )):(null)}
      </div>
    )
  });
  
  export default PromptCardList