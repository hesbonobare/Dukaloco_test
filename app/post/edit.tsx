import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import PostForm from "../components/PostForm";
import { usePosts } from "../context/PostContext";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import Toast from "react-native-toast-message"; 


const EditPost: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { posts, editPost } = usePosts();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const post = posts.find((p) => p.id === Number(id));

 
  
  const handleSubmit = async (updatedPost: { title: string; body: string }) => {
    setLoading(true); 
    await editPost(Number(id), updatedPost); 
    setLoading(false);
    
    Toast.show({
      type: "success",
      text1: "Post Updated!",
      text2: "Your blog post has been successfully updated 🎉",
      position: "top",
    });
      router.back(); 
    
  };
  

  if (!post) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>❌ Post not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#3498db" /> : 
        <PostForm initialValues={{ title: post.title, body: post.body }} onSubmit={handleSubmit} />}
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
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e74c3c",
  },
});

export default EditPost;
