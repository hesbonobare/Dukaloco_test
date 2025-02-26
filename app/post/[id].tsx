import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { usePosts } from '../context/PostContext';

const PostDetails: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { posts } = usePosts();

  const post = posts.find(p => p.id === Number(id));

  if (!post) {
    return <Text>Post not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
  },
});

export default PostDetails;