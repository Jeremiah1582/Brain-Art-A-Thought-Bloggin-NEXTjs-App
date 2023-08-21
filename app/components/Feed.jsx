"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PromptCardList from "../components/PromptCardList";

function Feed() {
  const [pageMsg, setPageMsg] = useState("Your Feed");
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const { data: session } = useSession();

  const handleSearchChange = (e) => {
    setSearchText(e.target.value); // Set the search text without trimming spaces
    if (e.type === "submit") {
      e.preventDefault(); // Prevent the form from refreshing
      return;
    }
    if (allPosts.length === 0) {
      setPageMsg("No posts to search, create a post and it will appear here");
      return;
    }

    if (e.target.value.length > 0) {
      // Split the search text into an array of keywords
      const keywords = e.target.value.split(" ");

      // Filter the posts by checking if any keyword is included in the prompt or tags
      const filteredResults = allPosts.filter((post) =>
        keywords.some(
          (keyword) =>
            post.prompt.toLowerCase().includes(keyword.toLowerCase()) ||
            post.tag.some((tag) =>
              tag.slice(1).toLowerCase().includes(keyword.toLowerCase())
            )
        )
      );

      // Remove duplicates by unique _id
      const uniqueResults = Array.from(
        new Set(filteredResults.map((post) => post._id))
      ).map((id) => filteredResults.find((post) => post._id === id));

      setSearchResults(uniqueResults);
      setPageMsg(
        `${uniqueResults.length} ${
          uniqueResults.length === 1 ? "post matches" : "posts match"
        } your search`
      );
    } else {
      setSearchResults(allPosts);
      setPageMsg("Explore Your Feed");
    }
  };

  const handleTagClick = (clickedTag) => {
    const keyword = clickedTag.slice(1);
    const result = allPosts.filter((post) =>post.tag.some((tag) =>tag.slice(1).toLowerCase().includes(keyword.toLowerCase())
  ) ); 
    setSearchResults(result);
    setPageMsg(
      `${result.length} ${
        result.length === 1 ? "post matches" : "posts match"
      } the ${clickedTag} tag`)
  };

  // ----------------------------------------
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/prompt");

      if (!res.ok) {
        throw new Error("Failed to fetch your posts");
      } else {
        const data = await res.json();

        setAllPosts(data.reverse());
      }
    } catch (error) {
      console.log("failed to fetch posts", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  console.log(searchResults);
  return (
    <section className="feed">
      <form
        onSubmit={handleSearchChange}
        className="relative w-full flex-center "
      >
        <input
          type="text"
          placeholder="Search for a tag or userName"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <h2 className="font-satoshi text-gray-500">{pageMsg}</h2>
      <PromptCardList
        data={searchResults.length !== 0 ? searchResults : allPosts} //a way to dynamically change the value of a property
        handleTagClick={handleTagClick}
      />
    </section>
  );
}

export default Feed;
