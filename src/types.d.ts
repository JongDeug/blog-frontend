export interface Comment {
  id: string;
  author: {
    name: string;
    image?: string;
  };
  content: string;
  createdAt: Date;
}

export interface Category {
  id: number;
  name: string;
  _count: {
    posts: number;
  };
}

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  prevId: number;
  nextId: number;
  draft: boolean;
  summary: string;
  views: number;
  likes: number;
  authorId: number;
  categoryId: number;
  category: {
    id: number;
    name: string;
  };
  tags: {
    id: number;
    name: string;
  };
  images: {
    id: number;
    url: string;
  }[];
  author: {
    id: number;
    name: string;
    email: string;
  };
  _count: {
    postLikes: number;
  };
  isLiked: boolean;
}

export interface Posts {
  posts: Post[];
  cursor: string;
}
