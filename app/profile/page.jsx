"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; //next/navigation is to be used in the App directory
import Profile from "../components/Profile";


function MyProfile() {
 const {data:session}=useSession();
 const router = useRouter();

  const handleEdit = async (post) => {
   router.push(`/update-post?id=${post._id}`);
  };

  const handleDelete = async (post) => {

  };


 

    const [myPosts, setMyPosts] = useState([])
  console.log('myPosts...', myPosts);

const fetchPosts = async () => {
    console.log(session?.user.id);
    if (session?.user.id) {
        try {
            const res = await fetch(`/api/users/${session?.user.id}/posts`);
            console.log("fetchPosts...", res);
            if (!res.ok) {
              throw new Error("Failed to fetch your posts");
            }
            const data = await res.json();
            console.log(data);
            setMyPosts(data);
          } catch (error) {
            console.log("failed to fetch posts", error);
          }
    }else{
        console.error('no session id, therefore unable to fetchPosts ');
    }
  };

  useEffect(() => {
        fetchPosts() 
  }, []);

  return (
    <Profile
      name="My"
      desc="welcome to my profile page"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default MyProfile;
