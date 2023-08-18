'use client';

import {useState, useEffect} from 'react'
import {useSession} from 'next-auth/react'
import PromptCardList from '../components/PromptCardList'

function Feed() {
  const [searchText, setSearchText] = useState('')
  const [allPosts, setAllPosts] = useState([])
  const [searchResults, setSearchResults] = useState([]);
  const {data: session} = useSession();

  const handleSearchChange = (e) => {

  }
  const handleTagClick = (tag) => {

  }

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/prompt');
      console.log('fetchPosts...', res);
      
      if (!res.ok) {
        
        throw new Error('Failed to fetch your posts');
      }else{
        const data = await res.json();
        console.log(data);
        setAllPosts(data);
      }
  
    } catch (error) {
      console.log('failed to fetch posts', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [])

  return (
    <section className='feed'>
      {session?.user ?(
      <h1>your feed</h1>):(null)}
    <form action="" className="relative w-full flex-center ">
      <input type="text" 
      placeholder='Search for a tag or userName'
      value ={searchText}
      onChange={handleSearchChange}
      required
      className="search_input peer"
      />
    </form>

        <PromptCardList
        data={allPosts}
        handleTagClick={handleTagClick}
        
        />
    </section>
  )
}

export default Feed