// eslint-disable-next-line no-undef
function fetchRequest(path: string, options?: RequestInit | undefined) {
  return fetch(path, options)
    .then((res) => (res.status <= 400 ? res : Promise.reject()))
    .then((res) => (res.status === 204 ? res : res.json()))
    .catch((err) => {
      console.log(`Error fetching ${path}`, err);
    });
}

function newPost(body: Record<string, unknown>) {
  return fetchRequest('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

const getPage = (pageNumber: number) => fetchRequest(`/api/posts?page${pageNumber}`);

const getPagePosts = (currentPage: number) => fetchRequest(`/api/posts?page${currentPage}`);

const API = { newPost, getPage, getPagePosts };
export default API;
