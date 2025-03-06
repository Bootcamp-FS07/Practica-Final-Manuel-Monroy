export interface RegisterResponse {
  _id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface Author {
  _id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Comment {
  _id: string;
  text: string;
  author: Author;
  post: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface Post {
  _id: string;
  text: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  __v: number;
  comments?: Comment[];
}
