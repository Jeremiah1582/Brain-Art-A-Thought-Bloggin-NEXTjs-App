'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Form from '../components/Form'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'

function CreatePrompt() {
  const router = useRouter(); //what does useRouter() do? 
  const {data: session} = useSession()

const [submitting, setSubmitting] = useState(false)
const [post, setPost] = useState({
  prompt:'', 
  tag: '',
})

const createMyPrompt = async (e) => {
e.preventDefault()
setSubmitting(true);
console.log('createMyPrompt...',post.prompt,
session?.user.id,post.tag,);
try {

  const res = await fetch('/api/prompt/new', {
    method: 'POST',
    body: JSON.stringify({
      prompt: post.prompt,
      userId: session?.user.id,
      tag: post.tag,
    }),
  })
  console.log('res.status...',res.status);
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
    />
  );
};

export default CreatePrompt