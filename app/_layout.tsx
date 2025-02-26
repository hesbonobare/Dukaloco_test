import { Stack } from "expo-router";
import { PostProvider } from "./context/PostContext";

export default function Layout() {
  return (
    <PostProvider>
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="create" options={{ title: "Create Post" }} />
      <Stack.Screen name="edit/[id]" options={{ title: "Edit Post" }} />
    </Stack>
    </PostProvider>
  );
}
