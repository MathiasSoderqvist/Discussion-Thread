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
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<boolean>(false);
  const [focusClicked, setFocusClicked] = useState<boolean>(false);
  const [page, setPage] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPagePrepend, setCurrentPagePrepend] = useState<number>(LAST_PAGE + 1);
  const [currentPageAppend, setCurrentPageAppend] = useState<number>(START_PAGE);

  useEffect(() => {
    API.getPage(START_PAGE)
      .then((data: React.SetStateAction<Page[]>) => setPage(data))
      .catch((error) => console.log('Error fetching page', error));
    API.getPagePosts(START_PAGE)
      .then((data) => setPosts((prevPosts) => [...prevPosts, ...data.posts]))
      .catch((error) => console.log('Error fetching page', error));
  }, []);

  const selectPage = (selectedPage: number) => {
    setCurrentPage(selectedPage);
    setCurrentPagePrepend(selectedPage);
    setCurrentPageAppend(selectedPage);
    API.selectedPageFetch(selectedPage)
      .then((data: { posts: React.SetStateAction<Post[]>; }) => setPosts(data.posts))
      .catch((error: unknown) => console.log('Error fetching clicked page', error));
  };

  const getNextPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setCurrentPageAppend(pageNumber);
    API.getPagePosts(pageNumber)
      .then((data) => setPosts((prevPosts) => [...prevPosts, ...data.posts]))
      .catch((error) => console.log('Error fetching posts', error));
  };

  const getPrevPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setCurrentPagePrepend(pageNumber);
    API.getPagePosts(pageNumber)
      .then((data) => setPosts((prevPosts) => [...data.posts, ...prevPosts]))
      .catch((error) => console.log('Error fetching posts', error));
  };

  const createPost = (body: Record<string, unknown>) => {
    API.newPost(body)
      .then((post) => {
        setPosts((prevPosts) => [...prevPosts, post.posts]);
      });
  };

  const checkFirstPage = () => {
    if (currentPagePrepend <= START_PAGE) {
      setCurrentPagePrepend(LAST_PAGE + 1);
    }
  };

  const checkLastPage = () => {
    if (currentPageAppend >= LAST_PAGE) {
      setCurrentPageAppend(START_PAGE);
    }
  };

  const filterValidated = () => {
    if (!filter) {
      setFilteredPosts(posts.filter((post) => post.validated));
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
      {(posts.length > 0)
        ? (
          <PostList
            posts={posts}
            filter={filter}
            focusClicked={focusClicked}
            getNextPage={getNextPage}
            getPrevPage={getPrevPage}
            filteredPosts={filteredPosts}
            selectPage={selectPage}
            currentPage={currentPage}
            currentPagePrepend={currentPagePrepend}
            currentPageAppend={currentPageAppend}
            checkFirstPage={checkFirstPage}
            checkLastPage={checkLastPage}
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
