function newPost (body: Object) {
  return fetchRequest('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });
}

function fetchRequest (path: string, options: RequestInit | undefined) {
  return fetch(path, options)
  .then(res => res.status <= 400 ? res : Promise.reject())
  .then(res => res.status === 204 ? res : res.json())
  .catch(err => {
    console.log(`Error fetching ${path}`, err)
  })
}

export default newPost;