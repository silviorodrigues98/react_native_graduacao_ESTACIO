import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";

const SimulacoesScreen = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [initialValue, setInitialValue] = useState("");
  const [cdiRate, setCdiRate] = useState("");
  const [cdiPercentage, setCdiPercentage] = useState("");
  const [period, setPeriod] = useState("");
  const [result, setResult] = useState("");

  const calculateTaxRate = (months: number) => {
    if (months <= 6) return 0.225; // até 180 dias
    if (months <= 12) return 0.2; // 181 a 360 dias
    if (months <= 24) return 0.175; // 361 a 720 dias
    return 0.15; // acima de 720 dias
  };

  const handleOptionSelect = (option: number) => {
    setSelectedOption(option);
    // Limpar resultados anteriores quando uma nova opção é selecionada
    setResult("");
  };

  const calculateCDB = () => {
    if (!initialValue || !cdiRate || !cdiPercentage || !period) {
      setResult("Preencha todos os campos.");
      return;
    }

    const principal = parseFloat(initialValue);
    const cdi = parseFloat(cdiRate) / 100;
    const percentage = parseFloat(cdiPercentage) / 100;
    const months = parseInt(period);

    // Taxa efetiva
    const effectiveRate = (cdi * percentage) / 12;

    // Montante bruto
    const grossAmount = principal * Math.pow(1 + effectiveRate, months);

    // Rendimento
    const income = grossAmount - principal;

    // Imposto
    const taxRate = calculateTaxRate(months);
    const tax = income * taxRate;

    // Valor líquido
    const netAmount = grossAmount - tax;

    setResult(
      `Resultado:\n\n` +
        `Valor Bruto: R$ ${grossAmount.toFixed(2)}\n` +
        `Imposto (${(taxRate * 100).toFixed(1)}%): R$ ${tax.toFixed(2)}\n` +
        `Valor Líquido: R$ ${netAmount.toFixed(2)}\n` +
        `Rendimento Líquido: R$ ${(netAmount - principal).toFixed(2)}`
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ThemedView style={styles.content}>
          <ThemedText type="title" style={styles.title}>
            Simulador de CDB
          </ThemedText>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === 1 && styles.optionButtonSelected,
              ]}
              onPress={() => handleOptionSelect(1)}
            >
              <ThemedText
                style={[
                  styles.optionButtonText,
                  selectedOption === 1 && styles.optionButtonTextSelected,
                ]}
              >
                Opção 1
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === 2 && styles.optionButtonSelected,
              ]}
              onPress={() => handleOptionSelect(2)}
            >
              <ThemedText
                style={[
                  styles.optionButtonText,
                  selectedOption === 2 && styles.optionButtonTextSelected,
                ]}
              >
                Opção 2
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === 3 && styles.optionButtonSelected,
              ]}
              onPress={() => handleOptionSelect(3)}
            >
              <ThemedText
                style={[
                  styles.optionButtonText,
                  selectedOption === 3 && styles.optionButtonTextSelected,
                ]}
              >
                Opção 3
              </ThemedText>
            </TouchableOpacity>
          </View>

          {selectedOption && (
            <>
              <ThemedText style={styles.label}>Valor Inicial (R$):</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Ex: 1000"
                keyboardType="numeric"
                value={initialValue}
                onChangeText={setInitialValue}
              />

              <ThemedText style={styles.label}>Taxa CDI Anual (%):</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Ex: 13.75"
                keyboardType="numeric"
                value={cdiRate}
                onChangeText={setCdiRate}
              />

              <ThemedText style={styles.label}>
                Percentual do CDI (%):
              </ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Ex: 110"
                keyboardType="numeric"
                value={cdiPercentage}
                onChangeText={setCdiPercentage}
              />

              <ThemedText style={styles.label}>Período (Meses):</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Ex: 12"
                keyboardType="numeric"
                value={period}
                onChangeText={setPeriod}
              />

              <TouchableOpacity style={styles.button} onPress={calculateCDB}>
                <ThemedText style={styles.buttonText}>Calcular</ThemedText>
              </TouchableOpacity>

              {result ? (
                <ThemedText style={[styles.result, styles.multilineResult]}>
                  {result}
                </ThemedText>
              ) : null}
            </>
          )}
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
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    gap: 10,
  },
  optionButton: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2e78b7",
  },
  optionButtonSelected: {
    backgroundColor: "#2e78b7",
  },
  optionButtonText: {
    color: "#2e78b7",
    fontSize: 16,
    fontWeight: "bold",
  },
  optionButtonTextSelected: {
    color: "white",
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
    fontSize: 18,
    marginTop: 20,
    textAlign: "left",
  },
  multilineResult: {
    lineHeight: 28,
  },
});

export default SimulacoesScreen;
