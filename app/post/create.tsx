import React, { useState } from "react";
import { useRouter } from "expo-router";
import PostForm from "../components/PostForm";
import { usePosts } from "../context/PostContext";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const CreatePost: React.FC = () => {
  const { addPost } = usePosts();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (post: { title: string; body: string }) => {
    setLoading(true); // Show loader while saving
    await addPost(post); // Ensure this function is async
    setLoading(false);
    router.back(); // Navigate back only after saving is done
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
