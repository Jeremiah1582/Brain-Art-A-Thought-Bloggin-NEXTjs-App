'use client'

import PromptCard from "./PromptCard"

function PromptCardList({data, handleTagClick, handleEdit, handleDelete}) {

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
  }
  export default PromptCardList