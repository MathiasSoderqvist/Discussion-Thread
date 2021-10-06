/* eslint-disable camelcase */
export interface Post {
  userName: string,
  userProfileImgUrl: string,
  comment: string,
  validated: boolean,
  postedOn: string,
  id: string,
}

export interface Page {
  page: number,
  per_page: number,
  prev_page?: number,
  next_page: number,
  posts: Post[],
  total: number,
  total_pages: number,
}
