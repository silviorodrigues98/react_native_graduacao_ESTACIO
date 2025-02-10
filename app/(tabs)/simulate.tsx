import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";

const SimulacoesScreen = () => {
  const [investmentType, setInvestmentType] = useState("");
  const [initialValue, setInitialValue] = useState("");
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [period, setPeriod] = useState("");
  const [result, setResult] = useState("");

  const calculateInvestment = () => {
    // Basic Validation (Expand as Needed)
    if (!investmentType || !initialValue || !interestRate || !period) {
      setResult("Preencha todos os campos.");
      return;
    }

    const initial = parseFloat(initialValue);
    const monthly = parseFloat(monthlyDeposit || 0); // Default to 0 if empty
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly rate
    const time = parseInt(period);

    let finalValue = initial;

    for (let i = 0; i < time; i++) {
      finalValue = (finalValue + monthly) * (1 + rate);
    }

    setResult(`Resultado: R$ ${finalValue.toFixed(2)}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ThemedView style={styles.content}>
          <ThemedText type="title" style={styles.title}>
            Simulador de Investimentos
          </ThemedText>

          <ThemedText style={styles.label}>Tipo de Investimento:</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Poupança, CDB, LCI, etc."
            value={investmentType}
            onChangeText={setInvestmentType}
          />

          <ThemedText style={styles.label}>Valor Inicial (R$):</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ex: 1000"
            keyboardType="numeric"
            value={initialValue}
            onChangeText={setInitialValue}
          />

          <ThemedText style={styles.label}>Depósito Mensal (R$):</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ex: 100"
            keyboardType="numeric"
            value={monthlyDeposit}
            onChangeText={setMonthlyDeposit}
          />

          <ThemedText style={styles.label}>Taxa de Juros Anual (%):</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ex: 5"
            keyboardType="numeric"
            value={interestRate}
            onChangeText={setInterestRate}
          />

          <ThemedText style={styles.label}>Período (Meses):</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Ex: 12"
            keyboardType="numeric"
            value={period}
            onChangeText={setPeriod}
          />

          <TouchableOpacity style={styles.button} onPress={calculateInvestment}>
            <ThemedText style={styles.buttonText}>Calcular</ThemedText>
          </TouchableOpacity>

          {result ? (
            <ThemedText style={styles.result}>{result}</ThemedText>
          ) : null}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  content: {
    width: "100%",
    maxWidth: 600,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2e78b7",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    width: "100%",
  },
  button: {
    backgroundColor: "#2e78b7",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  result: {
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
  },
});

export default SimulacoesScreen;
