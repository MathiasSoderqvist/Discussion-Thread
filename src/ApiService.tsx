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

const getPage = (pageNumber: number | undefined) => fetchRequest(`/api/posts?page${pageNumber}`);

const API = {
  newPost, getPage,
};
export default API;
