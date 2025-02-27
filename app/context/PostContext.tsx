import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { showMessage } from "react-native-flash-message";


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
      const response = await axios.post<Post>(
        "https://jsonplaceholder.typicode.com/posts",
        {
          ...post,
          userId: 1, 
        }
      );
  
      const newPost = {
        ...response.data,
        id: Math.floor(Math.random() * 10000), 
      };
  
      setPosts((prevPosts) => [...prevPosts, newPost]);

      showMessage({
        message: "Post created successfully!",
        type: "success",
        icon: "success",
      });
    } catch (error) {
      
      showMessage({
        message: "Could not create post",
        type: "danger",
        icon: "danger",
      });
    }
  };
  

  

  const editPost = async (id: number, updatedPost: { title: string; body: string }) => {
    try {
      
      const response = await axios.put<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...updatedPost,
        // userId: 1, 
      });
  
      if (response.status === 200) {
        
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === id ? { ...post, ...updatedPost } : post 
          )
        );

        showMessage({
          message: "Post edited successfully!",
          type: "success",
          icon: "success",
        });
        // console.log("Post updated successfully:", response.data);
      } else {
        // console.error("Failed to update post:", response.status);
        showMessage({
          message: response?.status === 500 ? "Server error!" : "Something went wrong.",
          type: "success",
          icon: "success",
        });

        
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  

  const deletePost = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
      showMessage({
        message: "Post deleted successfully!",
        type: "success",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
      showMessage({
        message: "Failed to delete post!",
        type: "danger",
        icon: "danger",
      });
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