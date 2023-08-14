'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Form from '../components/Form'

function CreatePrompt() {
  const router = useRouter();
  const {data: session} = useSession()
const [submitting, setSubmitting] = useState(false)
const [post, setPost] = useState({
  prompt:'', 
  tag: '',

})



const createPrompt = async (e) => {
e.preventDefault()
submitting(true);
try {
  const res = await fetch('/api/prompt/new', {
    method: 'POST',
    body: JSON.stringify({
      prompt: post.prompt,
      userId: session?.user.id,
      tag: post.tag,
    }),
  })
  if (res.status === 200) {
    router.push('/'); // redirect to home page


  }
}catch (error) {
  }
}

  return (
    <Form
    type='Create'
    post={post}
    submitting={submitting}
    setPost={setPost}
    handleSubmit={createPrompt}>

    </Form>

  )
}

export default CreatePrompt