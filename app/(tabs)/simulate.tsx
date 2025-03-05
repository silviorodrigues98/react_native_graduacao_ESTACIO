import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { Stack } from "expo-router";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";

const { width } = Dimensions.get("window");

export default function ButtonsPage() {
  const [activeButton, setActiveButton] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [profitPercentage, setProfitPercentage] = useState(null);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchProfitPercentage = async () => {
      try {
        const response = await fetch(
          "https://api.bcb.gov.br/dados/serie/bcdata.sgs.4189/dados?formato=json"
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setProfitPercentage(data[data.length - 1].valor); // Assuming the latest value is needed
        }
      } catch (error) {
        console.error("Error fetching profit percentage:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfitPercentage();
  }, []);

  const renderContent = () => {
    switch (activeButton) {
      case 1:
        return (
          <ThemedView style={styles.contentContainer}>
            <ThemedText style={styles.innerContent}>
              Content for Button 1
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                { color: colorScheme === "dark" ? "#fff" : "#000" },
              ]}
              placeholder="Enter number for Button 1"
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="numeric"
              placeholderTextColor={colorScheme === "dark" ? "#aaa" : "#555"}
            />
            <TouchableOpacity
              style={[styles.button, styles.returnButton]}
              onPress={() => setActiveButton(null)}
            >
              <ThemedText style={styles.buttonText}>Voltar</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        );
      case 2:
        return (
          <ThemedView style={styles.contentContainer}>
            <ThemedText style={styles.innerContent}>
              Content for Button 2
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                { color: colorScheme === "dark" ? "#fff" : "#000" },
              ]}
              placeholder="Enter number for Button 2"
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="numeric"
              placeholderTextColor={colorScheme === "dark" ? "#aaa" : "#555"}
            />
            <TouchableOpacity
              style={[styles.button, styles.returnButton]}
              onPress={() => setActiveButton(null)}
            >
              <ThemedText style={styles.buttonText}>Voltar</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        );
      case 3:
        return (
          <ThemedView style={styles.contentContainer}>
            <ThemedText style={styles.innerContent}>
              Content for Button 3
            </ThemedText>
            <TextInput
              style={[
                styles.input,
                { color: colorScheme === "dark" ? "#fff" : "#000" },
              ]}
              placeholder="Enter number for Button 3"
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="numeric"
              placeholderTextColor={colorScheme === "dark" ? "#aaa" : "#555"}
            />
            <TouchableOpacity
              style={[styles.button, styles.returnButton]}
              onPress={() => setActiveButton(null)}
            >
              <ThemedText style={styles.buttonText}>Voltar</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        );
      default:
        return (
          <ThemedView style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.button1]}
              onPress={() => setActiveButton(1)}
            >
              <ThemedText style={styles.buttonText}>
                Quero juntar um montante para um objetivo
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.button2]}
              onPress={() => setActiveButton(2)}
            >
              <ThemedText style={styles.buttonText}>
                Desejo gerar uma renda mensal, para aposentadoria
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.button3]}
              onPress={() => setActiveButton(3)}
            >
              <ThemedText style={styles.buttonText}>
                Ja tenho investimentos e desejo saber quanto rendem
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        );
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: "Buttons Demo" }} />
      <ThemedText style={styles.title}>Simule seus investimentos!</ThemedText>
      <ThemedText style={styles.mockText}>
        A simulação sera feita usando como base um investimento de CDB que rende
        uma porcentagem do CDI.
      </ThemedText>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colorScheme === "dark" ? "#fff" : "#000"}
        />
      ) : (
        profitPercentage !== null && (
          <ThemedText style={[styles.profitText, { fontWeight: "bold" }]}>
            Taxa CDI atual: {profitPercentage}%
          </ThemedText>
        )
      )}
      <ThemedView style={{ alignItems: "center" }}>
        <ThemedText style={{ textAlign: "center", marginBottom: 10 }}>
          Insira a porcentagem do CDI do seu investimento:
        </ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              marginVertical: 20,
              color: colorScheme === "dark" ? "#fff" : "#000",
              width: width > 600 ? "30%" : "80%", // Adjust width based on screen size
              textAlign: "center", // Center the text inside the input
            },
          ]}
          placeholder="EX: 100%"
          value={inputValue}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, "");
            setInputValue(numericValue);
          }}
          keyboardType="numeric"
          placeholderTextColor={colorScheme === "dark" ? "#aaa" : "#555"}
        />
      </ThemedView>
      {renderContent()}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  mockText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
    textAlign: "center",
  },
  profitText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
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
    backgroundColor: "#ADD8E6", // Lighter blue color
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  innerContent: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  contentContainer: {
    alignItems: "center",
  },
  returnButton: {
    backgroundColor: "#333",
    marginTop: 20,
    width: width > 600 ? "30%" : "60%", // Adjust width based on screen size
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    width: width > 600 ? "50%" : "80%", // Adjust width based on screen size
  },
});
