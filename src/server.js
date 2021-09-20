import { createServer, Model } from "miragejs";
import faker from "faker";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (numberOfPosts, pagesize) {
  createServer({
    models: {
      posts: Model
    },
    seeds(server) {
      for (let i = 0; i < numberOfPosts; i++) {
        server.create("post", {
          userName: faker.name.firstName(),
          userProfileImgUrl: faker.image.avatar(),
          comment: faker.lorem.paragraphs(Math.floor(Math.random() * 6) + 2),
          validated: isPrime(i),
          postedOn: new Date()
        });
      }
    },
    routes() {
      this.get("/api/posts", (schema, request) => {
        let page = parseInt(request.queryParams.page, 10) || 1;
        let filter = request.queryParams.filter || "";
        let res = postsResults(schema.db.posts, filter, page, pagesize);
        return res;
      });
      this.post("/api/posts", (schema, request) => {
        let postDto = JSON.parse(request.requestBody);
        postDto.postedOn = new Date();
        let post = schema.posts.create(postDto);
        return post;
      });
    }
  });
}

function postsResults(items, filter, current_page, per_page_items) {
  if (filter === "validated") {
    items = items.filter((post) => post.validated === true);
  }

  let page = current_page || 1,
    per_page = per_page_items || 10,
    offset = (page - 1) * per_page,
    paginatedItems = items.slice(offset).slice(0, per_page_items),
    total_pages = Math.ceil(items.length / per_page);

  return {
    page: page,
    per_page: per_page,
    prev_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    posts: paginatedItems
  };
}

function isPrime(num) {
  if (num <= 1) {
    return true;
  } else if (num <= 3) {
    return true;
  } else if (num % 2 === 0 || num % 3 === 0) {
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
