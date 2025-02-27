import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const fetchPosts=()=>{
    axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    .then(response => setPosts(response.data))
    .catch(error => console.error(error));
    console.log('posts',posts)
  }


const addPost = async (post: PostFormValues) => {
  try {
    const response = await axios.post<Post>("https://jsonplaceholder.typicode.com/posts", {
      ...post,
      userId: 1,
    });

    const newPost = {
      ...response.data,
      id: Math.floor(Math.random() * 10000),
    };

    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);

    await AsyncStorage.setItem("posts", JSON.stringify(updatedPosts));

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


useEffect(() => {
  const loadPosts = async () => {
    const storedPosts = await AsyncStorage.getItem("posts");

    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      await fetchPosts(); 
    }
  };

  loadPosts(); 
}, []);
  
  const editPost = async (id: number, updatedPostData: Partial<Post>) => {
    try {
      const storedPosts = await AsyncStorage.getItem("posts");
      let postsArray = storedPosts ? JSON.parse(storedPosts) : [];
  
      const localPostIndex = postsArray.findIndex((post: Post) => post.id === id);
  
      if (localPostIndex !== -1) {
        postsArray[localPostIndex] = { ...postsArray[localPostIndex], ...updatedPostData };
  
        await AsyncStorage.setItem("posts", JSON.stringify(postsArray));
        setPosts(postsArray);
  
        showMessage({
          message: "Post updated",
          type: "success",
          icon: "success",
        });
      } else {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedPostData);
  
        if (response.status === 200) {
          setPosts((prevPosts) =>
            prevPosts.map((post) => (post.id === id ? { ...post, ...updatedPostData } : post))
          );
  
          showMessage({
            message: "Post updated successfully!",
            type: "success",
            icon: "success",
          });
        } else {
          throw new Error("Failed to update post");
        }
      }
    } catch (error) {
      showMessage({
        message: "Failed to update post!",
        type: "danger",
        icon: "danger",
      });
    }
  };

  const deletePost = async (id: number) => {
    try {
      const storedPosts = await AsyncStorage.getItem("posts");
      let postsArray = storedPosts ? JSON.parse(storedPosts) : [];
  
      const localPostIndex = postsArray.findIndex((post: Post) => post.id === id);
  
      if (localPostIndex !== -1) {
        const updatedPosts = postsArray.filter((post: Post) => post.id !== id);
        await AsyncStorage.setItem("posts", JSON.stringify(updatedPosts));
  
        setPosts(updatedPosts);
        showMessage({
          message: "Post deleted!",
          type: "success",
          icon: "success",
        });
      } else {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        showMessage({
          message: "Post deleted!",
          type: "success",
          icon: "success",
        });
      }
    } catch (error) {
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