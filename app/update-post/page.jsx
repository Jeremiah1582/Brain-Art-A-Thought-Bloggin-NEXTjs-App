"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Form from "../components/Form";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

function EditPost() {
  const searchParams = useSearchParams();
  const router = useRouter(); //what does useRouter() do?
  const promptId = searchParams.get("id"); //get the id from the url

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "", //string of tags is converted to an array in the back end
  });
  const updateMyPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) {
      return alert("promptId is missing");
    } //if there is no promptId, then don't do anything
    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (res.ok) {
        router.push("/"); // redirect to home page
        console.log("success saved prompt");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  const getPromptDetails = async () => {
    try {
      const res = await fetch(`/api/prompt/${promptId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch prompt");
      }
      const data = await res.json();
      console.log(data);
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    } catch (error) {
      console.log("failed to fetch prompt", error);
    }
  };
  useEffect(() => {
    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  return (
    <Form
      type="Edit"
      post={post}
      submitting={submitting}
      setPost={setPost}
      handleSubmit={updateMyPrompt}
      // handleTags={handleTags}
    />
  );
}

export default EditPost;
