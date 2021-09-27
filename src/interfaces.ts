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
  next_page: number,
  page: number,
  per_page: number,
  posts: Post[],
  prev_page?: number,
  total: number,
  total_pages: number,
}
