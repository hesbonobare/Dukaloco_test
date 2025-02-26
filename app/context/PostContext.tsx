import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
  
 interface PostFormValues {
    title: string;
    body: string;
  }

interface PostContextType {
  posts: Post[];
  addPost: (post: PostFormValues) => void;
  editPost: (id: number, updatedPost: PostFormValues) => void;
  deletePost: (id: number) => void;
}

const PostContext = createContext<PostContextType | null>(null);

interface PostProviderProps {
  children: ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
      console.log('posts',posts)
  }, []);

  const addPost = async (post: PostFormValues) => {
    try {
      const response = await axios.post<Post>('https://jsonplaceholder.typicode.com/posts', {
        ...post,
        userId: 1, // Hardcoded user ID
      });
      setPosts([...posts, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const editPost = async (id: number, updatedPost: PostFormValues) => {
    try {
      const response = await axios.put<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...updatedPost,
        userId: 1, // Hardcoded user ID
      });
      setPosts(posts.map(post => (post.id === id ? response.data : post)));
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostContext.Provider value={{ posts, addPost, editPost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};