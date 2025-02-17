import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";

// Get screen height to conditionally enable scrolling
const { height: screenHeight } = Dimensions.get("window");

const SimulacoesScreen = () => {
  const [selectedOption, setSelectedOption] = useState<SimulationOption>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Group related state variables into objects
  const [retirementState, setRetirementState] = useState<RetirementState>({
    desiredMonthlyIncome: "",
    retirementAge: "",
    currentAge: "",
    currentSavings: "",
    retirementInterestRate: "",
  });

  const [goalState, setGoalState] = useState<GoalState>({
    monthlyInvestment: "",
    annualInterestRate: "",
    goalAmount: "",
  });

  const [yieldState, setYieldState] = useState<YieldState>({
    investedAmount: "",
    yieldPercentage: "",
  });

  const handleOptionSelect = (option: SimulationOption) => {
    setSelectedOption(option);
  };

  const resetSimulation = () => {
    setSelectedOption(null);
    setRetirementState({
      desiredMonthlyIncome: "",
      retirementAge: "",
      currentAge: "",
      currentSavings: "",
      retirementInterestRate: "",
    });
    setGoalState({
      monthlyInvestment: "",
      annualInterestRate: "",
      goalAmount: "",
    });
    setYieldState({
      investedAmount: "",
      yieldPercentage: "",
    });
  };

  // Measure the height of the content
  const handleContentSizeChange = (width: number, height: number) => {
    setContentHeight(height);
  };

  // Reusable Input Component
  const InputField = ({
    label,
    placeholder,
    value,
    onChangeText,
    keyboardType = "numeric",
  }: {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: "numeric" | "default";
  }) => (
    <>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
      />
    </>
  );

  // Reusable Button Component
  const Button = ({
    title,
    onPress,
    style,
  }: {
    title: string;
    onPress: () => void;
    style?: object;
  }) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <ThemedText style={styles.buttonText}>{title}</ThemedText>
    </TouchableOpacity>
  );

  const renderSimulationFields = () => {
    switch (selectedOption) {
      case 1: // Aposentadoria
        return (
          <>
            <InputField
              label="Renda Mensal Desejada (R$):"
              placeholder="Ex: 3000"
              value={retirementState.desiredMonthlyIncome}
              onChangeText={(text) =>
                setRetirementState({
                  ...retirementState,
                  desiredMonthlyIncome: text,
                })
              }
            />
            <InputField
              label="Idade de Aposentadoria:"
              placeholder="Ex: 65"
              value={retirementState.retirementAge}
              onChangeText={(text) =>
                setRetirementState({ ...retirementState, retirementAge: text })
              }
            />
            <InputField
              label="Idade Atual:"
              placeholder="Ex: 30"
              value={retirementState.currentAge}
              onChangeText={(text) =>
                setRetirementState({ ...retirementState, currentAge: text })
              }
            />
            <InputField
              label="Valor Economizado:"
              placeholder="Ex: 50000"
              value={retirementState.currentSavings}
              onChangeText={(text) =>
                setRetirementState({ ...retirementState, currentSavings: text })
              }
            />
            <InputField
              label="Taxa de Juros Anual (%):"
              placeholder="Ex: 8"
              value={retirementState.retirementInterestRate}
              onChangeText={(text) =>
                setRetirementState({
                  ...retirementState,
                  retirementInterestRate: text,
                })
              }
            />
            <Button title="Calcular" onPress={() => {}} />
          </>
        );

      case 2: // Tempo para Objetivo
        return (
          <>
            <InputField
              label="Investimento Mensal (R$):"
              placeholder="Ex: 500"
              value={goalState.monthlyInvestment}
              onChangeText={(text) =>
                setGoalState({ ...goalState, monthlyInvestment: text })
              }
            />
            <InputField
              label="Taxa de Juros Anual (%):"
              placeholder="Ex: 10"
              value={goalState.annualInterestRate}
              onChangeText={(text) =>
                setGoalState({ ...goalState, annualInterestRate: text })
              }
            />
            <InputField
              label="Objetivo (R$):"
              placeholder="Ex: 50000"
              value={goalState.goalAmount}
              onChangeText={(text) =>
                setGoalState({ ...goalState, goalAmount: text })
              }
            />
            <Button title="Calcular" onPress={() => {}} />
          </>
        );

      case 3: // Rendimento
        return (
          <>
            <InputField
              label="Valor Investido (R$):"
              placeholder="Ex: 10000"
              value={yieldState.investedAmount}
              onChangeText={(text) =>
                setYieldState({ ...yieldState, investedAmount: text })
              }
            />
            <InputField
              label="Taxa de Rendimento Anual (%):"
              placeholder="Ex: 7"
              value={yieldState.yieldPercentage}
              onChangeText={(text) =>
                setYieldState({ ...yieldState, yieldPercentage: text })
              }
            />
            <Button title="Calcular" onPress={() => {}} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        scrollEnabled={contentHeight > screenHeight} // Enable scrolling only if content exceeds screen height
        onContentSizeChange={handleContentSizeChange} // Measure content height
      >
        <ThemedView style={styles.content}>
          <ThemedText type="title" style={styles.title}>
            Simulações Financeiras
          </ThemedText>

          {selectedOption === null && (
            <View style={styles.optionsContainer}>
              {[1, 2, 3].map((option) => (
                <Button
                  key={option}
                  title={
                    option === 1
                      ? "Aposentadoria"
                      : option === 2
                      ? "Tempo para Objetivo"
                      : "Rendimento"
                  }
                  onPress={() => handleOptionSelect(option as SimulationOption)}
                  style={[
                    styles.optionButton,
                    selectedOption === option && styles.optionButtonSelected,
                  ]}
                />
              ))}
            </View>
          )}

          {selectedOption !== null && (
            <Button title="Voltar" onPress={resetSimulation} />
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
});

export default SimulacoesScreen;
