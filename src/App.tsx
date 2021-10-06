/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Filter from './Components/Filter';
import PostList from './Components/PostList';
import NewPost from './Components/NewPost';
import API from './ApiService';
import CommentButton from './Components/CommentButton';
import { Post, Page } from './interfaces';
import './App.css';

const App: React.FC = () => {
  const START_PAGE = 1;
  const LAST_PAGE = 5;
  const [page, setPage] = useState<Page>();
  const [posts, setPosts] = useState<Post[] | undefined>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[] | undefined>([]);
  const [filter, setFilter] = useState<boolean>(false);
  const [focusClicked, setFocusClicked] = useState<boolean>(false);

  useEffect(() => {
    API.getPage(START_PAGE)
      .then((data) => {
        setPage(data);
        setPosts(() => (data.posts));
      })
      .catch((error) => console.log('Error fetching page', error));
  }, []);

  const selectPage = (selectedPage: number) => {
    API.getPage(selectedPage)
      .then((data) => {
        setPage(data);
        setPosts(data.posts);
      })
      .catch((error: unknown) => console.log('Error fetching clicked page', error));
  };

  const getNextPage = () => {
    let next = page?.next_page;
    if (next === null) next = START_PAGE;
    API.getPage(next)
      .then((data) => {
        setPage(data);
        setPosts(posts && page ? [...posts, ...page.posts] : posts);
      })
      .catch((error) => console.log('Error fetching next page', error));
  };

  const getPrevPage = () => {
    let prev = page?.prev_page;
    if (prev === null) prev = LAST_PAGE;
    API.getPage(prev)
      .then((data) => {
        setPage(data);
        setPosts(posts ? [...data.posts, ...posts] : posts);
      })
      .catch((error) => console.log('Error fetching previous page', error));
  };

  const createPost = (body: Record<string, unknown>) => {
    API.newPost(body)
      .then((post) => {
        setPosts((prevPosts: Post[] | undefined) => (prevPosts ? [...prevPosts, post.posts] : [post.posts]));
      });
  };

  const filterValidated = () => {
    if (!filter) {
      setFilteredPosts(posts?.filter((post) => post.validated));
      setFilter(true);
    } else {
      setFilter(false);
    }
  };

  const handleFocus = () => {
    setFocusClicked(!focusClicked);
  };

  return (
    <div className="App">
      <h1>Comments</h1>
      <Filter
        filterValidated={filterValidated}
        filter={filter}
      />
      {posts && (posts.length > 0)
        ? (
          <PostList
            posts={posts}
            filter={filter}
            focusClicked={focusClicked}
            getNextPage={getNextPage}
            getPrevPage={getPrevPage}
            filteredPosts={filteredPosts}
            selectPage={selectPage}
          />
        )
        : <div />}
      {(focusClicked)
        ? (
          <NewPost
            createPost={createPost}
            focusClicked={focusClicked}
            handleFocus={handleFocus}
          />
        )
        : <div />}
      <CommentButton
        focusClicked={focusClicked}
        handleFocus={handleFocus}
      />
    </div>
  );
};

export default App;
