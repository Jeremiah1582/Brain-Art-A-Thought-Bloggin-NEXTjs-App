'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import Form from '../components/Form'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'

function CreatePrompt() {
  const router = useRouter(); //what does useRouter() do? 
  const {data: session} = useSession()

const [submitting, setSubmitting] = useState(false)
const [post, setPost] = useState({
  prompt:'',
  tag:''
})

useEffect(() => {
  console.log(post);
}, [post])


// const handleTags=(e)=>{
//   console.log(e.target.value);
//     setPost({...post,
//       tag:[...post,e.target.value]
//     })
//     console.log('tags are...',post.tags);
// }

const createMyPrompt = async (e) => {
e.preventDefault()
setSubmitting(true);
console.log('createMyPrompt...',post.prompt,
session?.user.id, post.tag,);
try {

  const res = await fetch('/api/prompt/new', {
    method: 'POST',
    body: JSON.stringify({
      prompt: post.prompt,
      userId: session?.user.id,
      tag: post.tag
    }),
  })
  if (res.ok) {
    router.push('/'); // redirect to home page
  console.log('success saved prompt');
  }
}catch (error) {
  console.log(error);
} finally {
  setSubmitting(false);
  }
}

  return (
    <Form
    type='Create'
    post={post}
    submitting={submitting}
    setPost={setPost}
    handleSubmit={createMyPrompt}
    // handleTags={handleTags}
    />
  );
};

export default CreatePrompt