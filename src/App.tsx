import React, {useState, useEffect} from 'react';
import Filter from './Components/Filter';
import PostList from './Components/PostList';
import NewPost from './Components/NewPost';
import newPost from './ApiService';
import CommentBtn from './Components/CommentBtn';
import { makeStyles } from '@mui/styles'
import './App.css';
import { ClassNames } from '@emotion/react';

const useStyles = makeStyles({
  
});

const App: React.FC = () => {
  let [posts, setPosts] = useState<any[]>([])
  let [filter, setFilter] = useState<boolean>(false)
  let [pages, setPages] = useState([])

  const classes = useStyles();

  useEffect(() => {
    getPosts();
  }, [])

  const getPosts = () => {
    for (let i = 1; i < 6; i++) {
      fetch(`/api/posts?page=${i}`)
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
      .catch((error) => console.log('Error fetching posts', error));
    } 
  };

  const createPost = (body: any) => {
    newPost(body)
      .then(post => {
        console.log("POST", post.posts);
        setPosts(prevPosts => [...prevPosts,  post.posts])
      })
  }

  const filterValidated = () => {
    if(!filter) {
      setPosts(posts.filter((post) => post.validated));
      setFilter(true);
    } else {
      getPosts();
      setFilter(false);
    }
  }

  console.table(posts);

  return (
    <div className="App">
      <h1>Comments</h1>
      <Filter filterValidated={filterValidated}/>
      {(posts.length > 0) ?
      <PostList posts={posts}/>
      : <div></div>}
      <NewPost createPost={createPost} />
      <CommentBtn />
    </div>
  );
}

export default App;
