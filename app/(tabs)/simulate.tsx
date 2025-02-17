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

  // State variables for Aposentadoria
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [currentAge, setCurrentAge] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [retirementInterestRate, setRetirementInterestRate] = useState("");

  // State variables for Tempo para Objetivo
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [annualInterestRate, setAnnualInterestRate] = useState("");
  const [goalAmount, setGoalAmount] = useState("");

  // State variables for Rendimento
  const [investedAmount, setInvestedAmount] = useState("");
  const [yieldPercentage, setYieldPercentage] = useState("");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const resetSimulation = () => {
    setSelectedOption(null);
    setDesiredMonthlyIncome("");
    setRetirementAge("");
    setCurrentAge("");
    setCurrentSavings("");
    setRetirementInterestRate("");
    setMonthlyInvestment("");
    setAnnualInterestRate("");
    setGoalAmount("");
    setInvestedAmount("");
    setYieldPercentage("");
  };

  const renderSimulationFields = () => {
    switch (selectedOption) {
      case 1: // Aposentadoria
        return (
          <>
            <ThemedText style={styles.label}>
              Renda Mensal Desejada (R$):
            </ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Ex: 3000"
              keyboardType="numeric"
              value={desiredMonthlyIncome}
              onChangeText={setDesiredMonthlyIncome}
            />

            <ThemedText style={styles.label}>
              Idade de Aposentadoria:
            </ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Ex: 65"
              keyboardType="numberic"
              value={retirementAge}
              onChangeText={setRetirementAge}
            />
            <ThemedText style={styles.label}>Idade Atual:</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Ex: 30"
              keyboardType="numberic"
              value={currentAge}
              onChangeText={setCurrentAge}
            />
            <ThemedText style={styles.label}>Valor economizado:</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Ex: 30"
              keyboardType="numberic"
              value={currentSavings}
              onChangeText={setCurrentSavings}
            />

            <ThemedText style={styles.label}>
              Taxa de Juros Anual (%):
            </ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Ex: 8"
              keyboardType="numeric"
              value={retirementInterestRate}
              onChangeText={setRetirementInterestRate}
            />

            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>Calcular</ThemedText>
            </TouchableOpacity>
          </>
        );

      case 2: // Tempo para Objetivo
        return (
          <>
            <ThemedText style={styles.label}>
              Investimento Mensal (R$):
            </ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Ex: 500"
              keyboardType="numeric"
              value={monthlyInvestment}
              onChangeText={setMonthlyInvestment}
            />

            <ThemedText style={styles.label}>
              Taxa de Juros Anual (%):
            </ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Ex: 10"
              keyboardType="numeric"
              value={annualInterestRate}
              onChangeText={setAnnualInterestRate}
            />

            <ThemedText style={styles.label}>Objetivo (R$):</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Ex: 50000"
              keyboardType="numeric"
              value={goalAmount}
              onChangeText={setGoalAmount}
            />

            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>Calcular</ThemedText>
            </TouchableOpacity>
          </>
        );

      case 3: // Rendimento
        return (
          <>
            <ThemedText style={styles.label}>Valor Investido (R$):</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Ex: 10000"
              keyboardType="numeric"
              value={investedAmount}
              onChangeText={setInvestedAmount}
            />

            <ThemedText style={styles.label}>
              Taxa de Rendimento Anual (%):
            </ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Ex: 7"
              keyboardType="numeric"
              value={yieldPercentage}
              onChangeText={setYieldPercentage}
            />

            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>Calcular</ThemedText>
            </TouchableOpacity>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ThemedView style={styles.content}>
          <ThemedText type="title" style={styles.title}>
            Simulações Financeiras
          </ThemedText>

          {selectedOption === null && ( // Conditionally render buttons
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
                  Aposentadoria
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
                  Tempo para Objetivo
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
                  Rendimento
                </ThemedText>
              </TouchableOpacity>
            </View>
          )}

          {selectedOption !== null && (
            <TouchableOpacity style={styles.button} onPress={resetSimulation}>
              <ThemedText style={styles.buttonText}>Voltar</ThemedText>
            </TouchableOpacity>
          )}

          {renderSimulationFields()}
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
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
    paddingHorizontal: 20,
  },
  optionsContainer: {
    flexDirection: "column",
    alignItems: "stretch",
    marginBottom: 30,
    gap: 10,
  },
  optionButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2e78b7",
    height: 60,
  },
  optionButtonSelected: {
    backgroundColor: "#2e78b7",
  },
  optionButtonText: {
    color: "#2e78b7",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
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
    fontSize: 16,
    marginTop: 20,
    textAlign: "left",
    wordWrap: "break-word",
  },
  multilineResult: {
    lineHeight: 24,
  },
});

export default SimulacoesScreen;
