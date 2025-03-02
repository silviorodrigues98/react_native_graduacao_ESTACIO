import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Stack } from "expo-router";

export default function ButtonsPage() {
  const [activeButton, setActiveButton] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const renderContent = () => {
    switch (activeButton) {
      case 1:
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.innerContent}>Content for Button 1</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter number for Button 1"
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={[styles.button, styles.returnButton]}
              onPress={() => setActiveButton(null)}
            >
              <Text style={styles.buttonText}>Return</Text>
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.innerContent}>Content for Button 2</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter number for Button 2"
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={[styles.button, styles.returnButton]}
              onPress={() => setActiveButton(null)}
            >
              <Text style={styles.buttonText}>Return</Text>
            </TouchableOpacity>
          </View>
        );
      case 3:
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.innerContent}>Content for Button 3</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter number for Button 3"
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={[styles.button, styles.returnButton]}
              onPress={() => setActiveButton(null)}
            >
              <Text style={styles.buttonText}>Return</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.button1]}
              onPress={() => setActiveButton(1)}
            >
              <Text style={styles.buttonText}>Button 1</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.button2]}
              onPress={() => setActiveButton(2)}
            >
              <Text style={styles.buttonText}>Button 2</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.button3]}
              onPress={() => setActiveButton(3)}
            >
              <Text style={styles.buttonText}>Button 3</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Buttons Demo" }} />

      <Text style={styles.mockText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>

      {renderContent()}
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
  innerContent: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
  contentContainer: {
    alignItems: "center",
  },
  returnButton: {
    backgroundColor: "#333",
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    width: "80%",
  },
});
