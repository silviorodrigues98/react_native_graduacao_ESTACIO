import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function ButtonsPage() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Buttons Demo" }} />

      <Text style={styles.mockText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.button1]}
          onPress={() => alert("Button 1 pressed")}
        >
          <Text style={styles.buttonText}>Button 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.button2]}
          onPress={() => alert("Button 2 pressed")}
        >
          <Text style={styles.buttonText}>Button 2</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.button3]}
          onPress={() => alert("Button 3 pressed")}
        >
          <Text style={styles.buttonText}>Button 3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  mockText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    gap: 20,
    alignItems: "center", // Center buttons horizontally
  },
  button: {
    width: "60%", // Take up 60% of the container width
    maxWidth: 280, // Maximum width for larger screens
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  button1: {
    backgroundColor: "#4A90E2",
  },
  button2: {
    backgroundColor: "#50C878",
  },
  button3: {
    backgroundColor: "#FF6B6B",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
