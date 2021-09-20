import React, {useState, useEffect} from 'react';
import Filter from './Components/Filter';
import './App.css';

const App: React.FC = () => {
  let [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    getPosts();
  }, [])

  const getPosts = () => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
      .catch((error) => console.log('Error fetching notes', error));
  };
  console.table(posts);

  console.log(posts);

  return (
    <div className="App">
      <h1>Comments</h1>
      <Filter />
      {/* <PostList />
      <Comment */}
      <p>Filter discussion component: all posts / only validated posts </p>
      <p>List of posts component </p>
      <p>Create new post component</p>
    </div>
  );
}

export default App;
