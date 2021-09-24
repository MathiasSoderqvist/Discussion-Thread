function newPost (body: Object) {
  return fetchRequest('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });
}

const getPage = (pageNumber: number) => {
  return fetchRequest(`/api/posts?page${pageNumber}`);
}

const getPagePosts = (currentPage: number) => {
  return fetchRequest(`/api/posts?page${currentPage}`);
}

function fetchRequest (path: string, options?: RequestInit | undefined) {
  return fetch(path, options)
  .then(res => res.status <= 400 ? res : Promise.reject())
  .then(res => res.status === 204 ? res : res.json())
  .catch(err => {
    console.log(`Error fetching ${path}`, err)
  })
}

const API = { newPost, getPage, getPagePosts };
export default API;