import React, { useState, useEffect, useCallback } from 'react';
import Filter from './Components/Filter';
import PostList from './Components/PostList';
import NewPost from './Components/NewPost';
import API from './ApiService';
import CommentBtn from './Components/CommentBtn';
import { Post, Page } from './interfaces';
import './App.css';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<boolean>(false);
  const [focusClicked, setFocusClicked] = useState<boolean>(false);
  const [page, setPage] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterPosts, setFilterPosts] = useState<boolean>(false);
  const START_PAGE = 1;

  useEffect(() => {
    API.getPage(START_PAGE)
    .then((data: React.SetStateAction<Page[]>) => setPage(data))
    .catch((error: any) => console.log('Error fetching page', error));
    getPagePosts(START_PAGE);
    setFilterPosts(true);
  }, []);

  // useEffect(() => {
  //   const filterAllPosts = () => {
  //     setFilteredPosts(posts.filter(post => post.validated));
  //   }
  //   filterAllPosts()
  // }, [filter])

  // const filterAllPosts = useCallback(() => {
  //   setFilteredPosts(posts.filter(post => post.validated));
  // }, [])
  // useEffect(() => {
  //   filterAllPosts()
  // }, [filterAllPosts])

//   const getFilterPagePosts = () => {
//     setFilteredPosts(posts.filter(post => post.validated));
// }

useEffect(() => {
  setFilteredPosts(posts.filter(post => post.validated));
}, [filter]);

  const getPagePosts = (currentPage: number) => {
    fetch(`/api/posts?page${currentPage}`)
    .then((res) => res.json())
    .then((data) => setPosts(prevPosts => [...prevPosts,  ...data.posts]))
    .catch((error) => console.log('Error fetching page', error));
}

// Load posts for next page
  const getNextPage = (pageNumber: number) => { 
    setCurrentPage(currentPage + 1);
      fetch(`/api/posts?page=${pageNumber}`)
      .then((res) => res.json())
      .then((data) => setPosts(prevPosts => [...prevPosts,  ...data.posts]))
      .catch((error) => console.log('Error fetching posts', error)); 
  }
  // Load posts for previous page
  const getPrevPage = (pageNumber: number) => {
    setCurrentPage(currentPage - 1);
    fetch(`/api/posts?page=${pageNumber}`)
    .then((res) => res.json())
    .then((data) => setPosts(prevPosts => [ ...data.posts, ...prevPosts]))
    .catch((error) => console.log('Error fetching posts', error)); 
}

  console.log("POSTS: ", posts);
  console.log("PAGE: ", page);
  console.log("FILTERED POSTS: ", filteredPosts);

  const createPost = (body: Object) => {
    API.newPost(body)
      .then(post => {
        setPosts(prevPosts => [...prevPosts,  post.posts])
      })
  }

  const filterValidated = () => {
    if(!filter) {
      setFilter(true);
    } else {
      setFilter(false);
    }
  }

  const handleFocus = () => {
    return setFocusClicked(!focusClicked);
  }

  return (
      <div className="App">
      <h1>Comments</h1>
      <Filter 
        filterValidated={filterValidated} 
        filter={filter}
      />
      {(posts.length > 0) ?
        <PostList 
          posts={posts}
          filter={filter}
          focusClicked={focusClicked}
          getNextPage={getNextPage}
          getPrevPage={getPrevPage}
          filteredPosts={filteredPosts}
        />
      : <div></div>}
      {(focusClicked) ?
        <NewPost 
        createPost={createPost} 
        focusClicked={focusClicked}
        handleFocus={handleFocus}
      />
      : <div></div>}
      <CommentBtn 
      focusClicked={focusClicked}
      handleFocus={handleFocus}/>
    </div>
  );
}

export default App;
