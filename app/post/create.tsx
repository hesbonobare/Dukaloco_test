import React, { useState } from "react";
import { useRouter } from "expo-router";
import PostForm from "../components/PostForm";
import { usePosts } from "../context/PostContext";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Toast from "react-native-toast-message"; // Import Toast


const CreatePost: React.FC = () => {
  const { addPost } = usePosts();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  

  const handleSubmit = async (post: { title: string; body: string }) => {
    setLoading(true); 
    await addPost(post);
    setLoading(false);
  
    
    Toast.show({
      type: "success",
      text1: "Post Created!",
      text2: "Your blog post has been added successfully 🎉",
      position: "top",
    });
  
    
    
     router.back();

  };

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#3498db" /> : <PostForm onSubmit={handleSubmit} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
});

export default CreatePost;
