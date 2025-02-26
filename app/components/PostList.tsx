import React, { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { usePosts } from "../context/PostContext";
import DeleteConfirmationModal from './DeleteModal'
import Toast from "react-native-toast-message"; // Import Toast

const PostList: React.FC = () => {
  const { posts, deletePost } = usePosts();
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedPostTitle, setSelectedPostTitle] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Open confirmation modal with post details
  const confirmDelete = (id: number, title: string) => {
    setSelectedPostId(id);
    setSelectedPostTitle(title);
    setModalVisible(true);
  };

  // Handle actual post deletion
  const handleDelete = () => {
    if (selectedPostId !== null) {
      deletePost(selectedPostId);
      setModalVisible(false); // Close modal after deleting

      // ✅ Show success notification
      Toast.show({
        type: "success",
        text1: "Post Deleted!",
        text2: `"${selectedPostTitle}" has been removed successfully.`,
        position: "top",
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
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

      {/* Use the reusable modal */}
      <DeleteConfirmationModal
        visible={modalVisible}
        postTitle={selectedPostTitle}
        onCancel={() => setModalVisible(false)}
        onConfirm={handleDelete}
      />

      {/* Create Post Button */}
      <Link href="/post/create" asChild>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>➕ Create Post</Text>
        </TouchableOpacity>
      </Link>

      {/* Log Posts Button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => console.log("Current Posts:", posts)}
      >
        <Text style={styles.createButtonText}>📝 Log Posts</Text>
      </TouchableOpacity>
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
