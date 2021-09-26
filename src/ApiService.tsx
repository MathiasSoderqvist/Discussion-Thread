/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

const getPagePosts = (pageNumber: number) => fetchRequest(`/api/posts?page${pageNumber}`);

const selectedPageFetch = (selectedPage: number) => {
  const pageIndex = selectedPage + 1;
  return fetchRequest(`/api/posts?page${pageIndex}`);
};

const API = {
  newPost, getPage, getPagePosts, selectedPageFetch,
};
export default API;
