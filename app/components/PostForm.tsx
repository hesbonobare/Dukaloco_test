import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import { PostFormValues } from "../../types/Post";

interface PostFormProps {
  initialValues?: PostFormValues;
  onSubmit: (post: PostFormValues) => Promise<void>; // Ensure it handles async operations
}

const PostForm: React.FC<PostFormProps> = ({ initialValues, onSubmit }) => {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [body, setBody] = useState(initialValues?.body || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit({ title, body });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Post Body"
        value={body}
        onChangeText={setBody}
        multiline
      />
      <TouchableOpacity style={[styles.button, loading && styles.disabledButton]} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Save</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    elevation: 2,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#95a5a6",
  },
});

export default PostForm;
