import React, {useState, useEffect} from 'react';
import Filter from './Components/Filter';
import PostList from './Components/PostList';
import NewPost from './Components/NewPost';
import './App.css';

const App: React.FC = () => {
  let [posts, setPosts] = useState<any[]>([])
  let [filter, setFilter] = useState<boolean>(false)

  useEffect(() => {
    getPosts();
  }, [])

  const getPosts = () => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
      .catch((error) => console.log('Error fetching posts', error));
  };

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

  console.log("Posts:", posts);

  return (
    <div className="App">
      <h1>Comments</h1>
      <Filter filterValidated={filterValidated}/>
      {(posts.length > 0) ?
      <PostList posts={posts}/>
      : <div></div>}
      <NewPost  />
    </div>
  );
}

export default App;
