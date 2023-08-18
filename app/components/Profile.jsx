'use client'
import PromptCardList from './PromptCardList'

function Profile({name, desc, data, handleEdit, handleDelete}) {
  console.log(data);
  return (
    <section className='w-full'>
    
    
      <h1 className="head_text text-left">
      <span className="blue_gradient">{name} Profile </span>
      </h1>
      <p className="desc text-left">{desc}</p>
   
      <PromptCardList
      data={data}
      {...handleEdit && (handleEdit={handleEdit})} //this is how we can customize the properties of a component
      {...handleDelete && (handleDelete={handleDelete})}
      />
    </section>
  )
}

export default Profile