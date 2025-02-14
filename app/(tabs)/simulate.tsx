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
  const [result, setResult] = useState("");

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

  const calculateTaxRate = (months: number) => {
    if (months <= 6) return 0.225; // até 180 dias
    if (months <= 12) return 0.2; // 181 a 360 dias
    if (months <= 24) return 0.175; // 361 a 720 dias
    return 0.15; // acima de 720 dias
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setResult("");
  };

  const resetSimulation = () => {
    setSelectedOption(null);
    setResult("");
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

  const calculateRetirement = () => {
    // Basic Validation
    if (
      !desiredMonthlyIncome ||
      !retirementAge ||
      !currentAge ||
      !retirementInterestRate
    ) {
      setResult("Preencha todos os campos.");
      return;
    }

    const income = parseFloat(desiredMonthlyIncome);
    const rAge = parseInt(retirementAge);
    const cAge = parseInt(currentAge);
    const savings = parseFloat(currentSavings || 0); // Default to 0
    const rate = parseFloat(retirementInterestRate) / 100 / 12;

    const yearsToRetirement = rAge - cAge;
    const monthsToRetirement = yearsToRetirement * 12;

    let requiredSavings = 0;

    if (rate > 0) {
      // Assuming you can withdraw interest only without touching the principal
      requiredSavings = income / rate;
    } else {
      // If no interest, you would need infinite savings to withdraw monthly
      requiredSavings = Infinity;
    }
    setResult(
      `Para ter R$${income.toFixed(
        2
      )} por mês na aposentadoria, você precisa ter R$${requiredSavings.toFixed(
        2
      )}`
    );
  };

  const calculateTimeForGoal = () => {
    if (!monthlyInvestment || !annualInterestRate || !goalAmount) {
      setResult("Preencha todos os campos.");
      return;
    }

    const monthly = parseFloat(monthlyInvestment);
    const rate = parseFloat(annualInterestRate) / 100 / 12;
    const goal = parseFloat(goalAmount);

    if (rate === 0) {
      const timeToGoal = goal / monthly;
      setResult(
        `Levará ${timeToGoal.toFixed(2)} meses para atingir o objetivo.`
      );
    } else {
      let months = 0;
      let balance = 0;
      while (balance < goal && months < 1200) {
        // Prevent infinite loops
        balance = (balance + monthly) * (1 + rate);
        months++;
      }

      if (months === 1200) {
        setResult("Não será possível atingir o objetivo com esses valores.");
      } else {
        setResult(`Levará ${months} meses para atingir o objetivo.`);
      }
    }
  };

  const calculateYield = () => {
    if (!investedAmount || !yieldPercentage) {
      setResult("Preencha todos os campos.");
      return;
    }

    const invested = parseFloat(investedAmount);
    const rate = parseFloat(yieldPercentage) / 100;

    const dailyYield = (invested * rate) / 365;
    const monthlyYield = (invested * rate) / 12;
    const annualYield = invested * rate;

    setResult(
      `Rendimento:\n\n` +
        `Diário: R$ ${dailyYield.toFixed(2)}\n` +
        `Mensal: R$ ${monthlyYield.toFixed(2)}\n` +
        `Anual: R$ ${annualYield.toFixed(2)}`
    );
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

            <TouchableOpacity
              style={styles.button}
              onPress={calculateRetirement}
            >
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

            <TouchableOpacity
              style={styles.button}
              onPress={calculateTimeForGoal}
            >
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

            <TouchableOpacity style={styles.button} onPress={calculateYield}>
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

          {result ? (
            <ThemedText style={[styles.result, styles.multilineResult]}>
              {result}
            </ThemedText>
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
