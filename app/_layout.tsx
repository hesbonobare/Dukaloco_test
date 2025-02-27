import { Stack } from "expo-router";
import { PostProvider } from "./context/PostContext";
import Toast from "react-native-toast-message"; 
import FlashMessage from "react-native-flash-message";



export default function Layout() {
  return (
    <PostProvider>
      <Toast />
    <Stack>
      <Stack.Screen name="index" options={{ title: "BlogPosts" }} />
      <Stack.Screen name="create" options={{ title: "Create Post" }} />
      <Stack.Screen name="edit/[id]" options={{ title: "Edit Post" }} />
    </Stack>
    <FlashMessage position="bottom" />

    
    </PostProvider>
  );
}
