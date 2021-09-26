/* eslint-disable camelcase */
import { createServer, Model } from 'miragejs';
import faker from 'faker';

function isPrime(num) {
  if (num <= 1) {
    return true;
  } if (num <= 3) {
    return true;
  } if (num % 2 === 0 || num % 3 === 0) {
    return false;
  }

  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false;
    }
    i += 6;
  }
  return true;
}

function postsResults(items, filter, current_page, per_page_items) {
  if (filter === 'validated') {
    // eslint-disable-next-line no-param-reassign
    items = items.filter((post) => post.validated === true);
  }

  const page = current_page || 1;
  const per_page = per_page_items || 10;
  const offset = (page - 1) * per_page;
  const paginatedItems = items.slice(offset).slice(0, per_page_items);
  const total_pages = Math.ceil(items.length / per_page);

  return {
    page,
    per_page,
    prev_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: items.length,
    total_pages,
    posts: paginatedItems,
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (numberOfPosts, pagesize) {
  createServer({
    models: {
      posts: Model,
    },
    seeds(server) {
      for (let i = 0; i < numberOfPosts; i += 1) {
        server.create('post', {
          userName: faker.name.firstName(),
          userProfileImgUrl: faker.image.avatar(),
          comment: faker.lorem.paragraphs(Math.floor(Math.random() * 6) + 2),
          validated: isPrime(i),
          postedOn: new Date(),
        });
      }
    },
    routes() {
      this.get('/api/posts', (schema, request) => {
        const page = parseInt(request.queryParams.page, 10) || 1;
        const filter = request.queryParams.filter || '';
        const res = postsResults(schema.db.posts, filter, page, pagesize);
        return res;
      });
      this.post('/api/posts', (schema, request) => {
        const postDto = JSON.parse(request.requestBody);
        postDto.postedOn = new Date();
        const post = schema.posts.create(postDto);
        return post;
      });
    },
  });
}
