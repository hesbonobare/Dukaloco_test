import React, { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator
} from "react-native";
import { Link } from "expo-router";
import { usePosts } from "../context/PostContext";
import DeleteConfirmationModal from './DeleteModal'
import { showMessage } from "react-native-flash-message";


const PostList: React.FC = () => {
  const { posts, deletePost } = usePosts();
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedPostTitle, setSelectedPostTitle] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const confirmDelete = (id: number, title: string) => {
    setSelectedPostId(id);
    setSelectedPostTitle(title);
    setModalVisible(true);
  };

  

  const handleDelete = () => {
    if (selectedPostId !== null) {
      deletePost(selectedPostId);
      setModalVisible(false); 
    }
  };
  

 

  return (
    <View style={styles.container}>
      
      {posts.length===0 ? (
        <View>
      <ActivityIndicator size="large" color="#0000ff" /> 
      </View>)
      : <FlatList
        data={posts}
        keyExtractor={(item, i) => `${item.id}-${i}`}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Link href={`/post/${item.id}`} asChild>
              <Pressable style={styles.postContent}>
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.postBody} numberOfLines={2}>
                  {item.body}
                </Text>
              </Pressable>
            </Link>
            <View style={styles.buttonContainer}>
              <Link href={`/post/edit?id=${item.id}`} asChild>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.buttonText}>✏️ Edit</Text>
                </TouchableOpacity>
              </Link>
              {item.userId === 1 && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => confirmDelete(item.id, item.title)}
                >
                  <Text style={styles.buttonText}>🗑 Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
}
     

      <DeleteConfirmationModal
        visible={modalVisible}
        postTitle={selectedPostTitle}
        onCancel={() => setModalVisible(false)}
        onConfirm={handleDelete}
      />

  
      <Link href="/post/create" asChild>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>➕ Create Post</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  postCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postContent: {
    paddingBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  postBody: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#3498db",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  createButton: {
    padding: 14,
    backgroundColor: "#2ecc71",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PostList;
