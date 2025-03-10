import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  useColorScheme,
  ActivityIndicator,
  ScrollView,
  View,
} from "react-native";
import { Stack } from "expo-router";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";

const { width } = Dimensions.get("window");

const InputField = ({ placeholder, value, onChangeText, onFocus, onBlur }) => {
  const colorScheme = useColorScheme();
  return (
    <TextInput
      style={[
        styles.input,
        {
          color: colorScheme === "dark" ? "#fff" : "#000",
          width: width > 600 ? "30%" : "80%",
        },
      ]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType="numeric"
      placeholderTextColor={colorScheme === "dark" ? "#aaa" : "#555"}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default function ButtonsPage() {
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [profitPercentage, setProfitPercentage] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchProfitPercentage = async () => {
      try {
        const response = await fetch(
          "https://api.bcb.gov.br/dados/serie/bcdata.sgs.4189/dados?formato=json"
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setProfitPercentage(data[data.length - 1].valor);
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
            <ThemedText
              style={[
                styles.inputLabel,
                focusedInput === "input1" && styles.focusedLabel,
              ]}
            >
              Quanto voce ja tem?
            </ThemedText>
            <InputField
              placeholder="EX: R$1000"
              value={inputValue}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setInputValue(numericValue);
              }}
              onFocus={() => setFocusedInput("input1")}
              onBlur={() => setFocusedInput(null)}
            />
            <ThemedText
              style={[
                styles.inputLabel,
                focusedInput === "input2" && styles.focusedLabel,
              ]}
            >
              Quanto voce pretende investir por mes?
            </ThemedText>
            <InputField
              placeholder="EX: R$200"
              value={inputValue}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setInputValue(numericValue);
              }}
              onFocus={() => setFocusedInput("input2")}
              onBlur={() => setFocusedInput(null)}
            />
            <ThemedText
              style={[
                styles.inputLabel,
                focusedInput === "input3" && styles.focusedLabel,
              ]}
            >
              Quanto voce deseja ter?
            </ThemedText>
            <InputField
              placeholder="EX: R$5000"
              value={inputValue}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setInputValue(numericValue);
              }}
              onFocus={() => setFocusedInput("input3")}
              onBlur={() => setFocusedInput(null)}
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
      case 3:
        return (
          <ThemedView style={styles.contentContainer}>
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
    <ScrollView style={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ title: "Buttons Demo" }} />
        <ThemedText type="title" style={[styles.title, { marginTop: 80 }]}>
          Simule seus investimentos!
        </ThemedText>
        <ThemedText style={styles.mockText}>
          A simulação sera feita usando como base um investimento de CDB que
          rende uma porcentagem do CDI.
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
        <ThemedView style={styles.centeredView}>
          <ThemedText
            style={[
              styles.inputLabel,
              focusedInput === "inputCDI" && styles.focusedLabel,
            ]}
          >
            Insira a porcentagem do CDI do seu investimento:
          </ThemedText>
          <InputField
            placeholder="EX: 100%"
            value={inputValue}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, "");
              setInputValue(numericValue);
            }}
            onFocus={() => setFocusedInput("inputCDI")}
            onBlur={() => setFocusedInput(null)}
          />
        </ThemedView>
        {renderContent()}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
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
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    width: "60%",
    maxWidth: 280,
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
    backgroundColor: "#ADD8E6",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  contentContainer: {
    alignItems: "center",
  },
  returnButton: {
    backgroundColor: "#333",
    marginTop: 20,
    width: width > 600 ? "30%" : "60%",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10, // Adjusted margin
    width: width > 600 ? "50%" : "80%",
  },
  centeredView: {
    alignItems: "center",
    marginBottom: 20,
  },
  inputLabel: {
    textAlign: "center",
    marginBottom: 5, // Adjusted margin
  },
  focusedLabel: {
    color: "#4A90E2", // Change this color as needed
  },
});