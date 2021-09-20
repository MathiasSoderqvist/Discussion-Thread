import React from 'react';
import ReactDOM from 'react-dom';
import createServer from "./server.js";
import './index.css';
import App from './App';

const NUMBER_OF_POSTS = 100;
const PAGE_SIZE = 20;

createServer(NUMBER_OF_POSTS, PAGE_SIZE);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

