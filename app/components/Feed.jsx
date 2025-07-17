"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import PromptCardList from "./PromptCardList";
import { useDebounce } from "../hooks/useDebounce";

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    hasNextPage: false,
    totalCount: 0
  });
  const { data: session } = useSession();
  
  // 🎯 OPTIMIZATION: Debounce search input
  // Only updates 300ms after user stops typing
  const debouncedSearchText = useDebounce(searchText, 300);

  // 🎯 OPTIMIZATION: Memoized search results
  // Only recalculates when debouncedSearchText or allPosts change
  const searchResults = useMemo(() => {
    if (!debouncedSearchText.trim() || allPosts.length === 0) {
      return allPosts;
    }

    // Split the search text into an array of keywords
    const keywords = debouncedSearchText.split(" ").filter(keyword => keyword.trim());

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

    // 🎯 OPTIMIZATION: More efficient duplicate removal using Map
    const uniqueResultsMap = new Map();
    filteredResults.forEach(post => {
      uniqueResultsMap.set(post._id, post);
    });
    
    return Array.from(uniqueResultsMap.values());
  }, [debouncedSearchText, allPosts]);

  // 🎯 OPTIMIZATION: Memoized page message
  const pageMessage = useMemo(() => {
    if (loading && allPosts.length === 0) {
      return "Loading posts...";
    }
    
    if (allPosts.length === 0) {
      return "No posts to display, create a post and it will appear here";
    }
    
    if (!debouncedSearchText.trim()) {
      return `Explore Your Feed (${pagination.totalCount} total posts)`;
    }
    
    return `${searchResults.length} ${
      searchResults.length === 1 ? "post matches" : "posts match"
    } your search`;
  }, [searchResults.length, debouncedSearchText, allPosts.length, loading, pagination.totalCount]);

  // Simple input handler - just updates the input value
  const handleSearchChange = (e) => {
    if (e.type === "submit") {
      e.preventDefault(); // Prevent the form from refreshing
      return;
    }
    setSearchText(e.target.value); // This triggers debounce, not immediate search
  };

  const handleTagClick = (clickedTag) => {
    // 🎯 OPTIMIZATION: Set search text instead of manually filtering
    // This will trigger our debounced search automatically
    const keyword = clickedTag.slice(1);
    setSearchText(keyword);
  };

  // 🎯 OPTIMIZATION: Paginated post fetching
  const fetchPosts = async (page = 0, append = false) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/prompt?page=${page}&limit=20`);

      if (!res.ok) {
        throw new Error("Failed to fetch your posts");
      } else {
        const data = await res.json();
        
        // Either append to existing posts or replace them
        setAllPosts(prevPosts => 
          append ? [...prevPosts, ...data.prompts] : data.prompts
        );
        
        setPagination(data.pagination);
      }
    } catch (error) {
      // TODO: Implement proper error handling UI
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to load more posts
  const loadMorePosts = () => {
    if (pagination.hasNextPage && !loading) {
      fetchPosts(pagination.currentPage + 1, true); // append = true
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  
  return (
    <section className="feed">
      <form
        onSubmit={handleSearchChange}
        className="relative w-full flex-center "
      >
        <input
          type="text"
          placeholder="Search via tag or keyword"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>
      <h2 className="font-satoshi text-gray-500">{pageMessage}</h2>
      <PromptCardList
        data={searchResults} // 🎯 OPTIMIZATION: Always use searchResults (includes all posts when no search)
        handleTagClick={handleTagClick}
      />
      
      {/* 🎯 OPTIMIZATION: Load More Button - only show when not searching and has more pages */}
      {!debouncedSearchText.trim() && pagination.hasNextPage && (
        <div className="w-full flex-center mt-8">
          <button 
            onClick={loadMorePosts}
            disabled={loading}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
              loading 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
            }`}
          >
            {loading ? 'Loading...' : `Load More Posts (${pagination.totalCount - allPosts.length} remaining)`}
          </button>
        </div>
      )}
      
      {/* Show total loaded posts */}
      {!debouncedSearchText.trim() && allPosts.length > 0 && (
        <div className="w-full flex-center mt-4">
          <p className="text-sm text-gray-500">
            Showing {allPosts.length} of {pagination.totalCount} posts
          </p>
        </div>
      )}
    </section>
  );
}

export default Feed;
