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
  const [inputValue1, setInputValue1] = useState<string>("");
  const [inputValue2, setInputValue2] = useState<string>("");
  const [inputValue3, setInputValue3] = useState<string>("");
  const [inputValueCDI, setInputValueCDI] = useState<string>("");
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

  const handleCalculate = () => {
    if (
      !inputValue1 ||
      !inputValue2 ||
      !inputValue3 ||
      !inputValueCDI ||
      isNaN(Number(inputValue1)) ||
      isNaN(Number(inputValue2)) ||
      isNaN(Number(inputValue3)) ||
      isNaN(Number(inputValueCDI))
    ) {
      alert("Por favor, preencha todos os campos com valores numéricos.");
      return;
    }

    // Convertendo inputs para números
    const valorInicial = Number(inputValue1); // Quanto já tem
    const aportesMensais = Number(inputValue2); // Quanto investirá por mês
    const objetivoFinal = Number(inputValue3); // Quanto deseja ter
    const percentualCDI = Number(inputValueCDI) / 100; // Percentual do CDI do investimento

    // Utilizando o CDI atual da API
    const taxaCDIAnual = profitPercentage / 100; // Taxa CDI anual (em decimal)

    // Taxa de rendimento mensal do investimento
    const taxaMensal = (Math.pow(1 + taxaCDIAnual, 1 / 12) - 1) * percentualCDI;

    // Verifica se o objetivo já foi atingido com o valor inicial
    if (valorInicial >= objetivoFinal) {
      alert("Você já atingiu seu objetivo financeiro!");
      return;
    }

    // Verifica se o aporte mensal é zero
    if (aportesMensais === 0) {
      // Cálculo apenas com juros compostos (sem aportes)
      const tempoNecessario =
        Math.log(objetivoFinal / valorInicial) / Math.log(1 + taxaMensal);
      const meses = Math.ceil(tempoNecessario);
      const anos = Math.floor(meses / 12);
      const mesesRestantes = meses % 12;

      alert(
        `Com seu valor inicial de R$${valorInicial.toFixed(
          2
        )} e rendimento mensal de ${(taxaMensal * 100).toFixed(2)}%, ` +
          `você atingirá seu objetivo de R$${objetivoFinal.toFixed(
            2
          )} em ${anos} anos e ${mesesRestantes} meses.`
      );
      return;
    }

    // Cálculo com valor inicial e aportes mensais
    let saldo = valorInicial;
    let meses = 0;

    while (saldo < objetivoFinal && meses < 1200) {
      // Limite de 100 anos para evitar loop infinito
      saldo = saldo * (1 + taxaMensal) + aportesMensais;
      meses++;
    }

    if (meses >= 1200) {
      alert(
        "Com os valores informados, seu objetivo levará mais de 100 anos para ser atingido."
      );
    } else {
      const anos = Math.floor(meses / 12);
      const mesesRestantes = meses % 12;

      // Cálculo do valor total investido
      const totalInvestido = valorInicial + aportesMensais * meses;
      // Cálculo dos juros obtidos
      const jurosObtidos = saldo - totalInvestido;

      alert(
        `Tempo necessário: ${anos} anos e ${mesesRestantes} meses\n\n` +
          `Valor inicial: R$${valorInicial.toFixed(2)}\n` +
          `Total de aportes: R$${(aportesMensais * meses).toFixed(2)}\n` +
          `Juros obtidos: R$${jurosObtidos.toFixed(2)}\n` +
          `Montante final: R$${saldo.toFixed(2)}`
      );
    }
  };
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
              value={inputValue1}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setInputValue1(numericValue);
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
              value={inputValue2}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setInputValue2(numericValue);
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
              value={inputValue3}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setInputValue3(numericValue);
              }}
              onFocus={() => setFocusedInput("input3")}
              onBlur={() => setFocusedInput(null)}
            />
            <TouchableOpacity
              style={[styles.button, styles.calculateButton]}
              onPress={handleCalculate}
            >
              <ThemedText style={styles.buttonText}>Calcular</ThemedText>
            </TouchableOpacity>
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
            value={inputValueCDI}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, "");
              setInputValueCDI(numericValue);
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
  calculateButton: {
    backgroundColor: "#FFA500",
    marginTop: 20,
    width: width > 600 ? "30%" : "60%",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
    width: width > 600 ? "50%" : "80%",
  },
  centeredView: {
    alignItems: "center",
    marginBottom: 20,
  },
  inputLabel: {
    textAlign: "center",
    marginBottom: 5,
  },
  focusedLabel: {
    color: "#4A90E2",
  },
});
