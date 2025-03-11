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
import { Picker } from "@react-native-picker/picker";

const { width } = Dimensions.get("window");

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  onFocus,
  onBlur,
}) => {
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
  const [initialAmount, setInitialAmount] = useState<string>("");
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>("");
  const [targetAmount, setTargetAmount] = useState<string>("");
  const [cdiPercentage, setCdiPercentage] = useState<string>("");
  const [expectedReturn, setExpectedReturn] = useState<string>("");
  const [profitPercentage, setProfitPercentage] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<string>("option1");
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
    // Common validation for all calculators
    if (!cdiPercentage || isNaN(Number(cdiPercentage))) {
      alert("Por favor, preencha a porcentagem do CDI com um valor numérico.");
      return;
    }

    // Utilizando o CDI atual da API
    const taxaCDIAnual = (profitPercentage ?? 0) / 100; // Taxa CDI anual (em decimal)
    const percentualCDI = Number(cdiPercentage) / 100; // Percentual do CDI do investimento

    // Taxa de rendimento mensal do investimento
    const taxaMensal = (Math.pow(1 + taxaCDIAnual, 1 / 12) - 1) * percentualCDI;

    if (activeButton === 1) {
      // Calculo para juntar um montante para um objetivo
      if (
        !initialAmount ||
        !monthlyInvestment ||
        !targetAmount ||
        isNaN(Number(initialAmount)) ||
        isNaN(Number(monthlyInvestment)) ||
        isNaN(Number(targetAmount))
      ) {
        alert("Por favor, preencha todos os campos com valores numéricos.");
        return;
      }

      // Convertendo inputs para números
      const valorInicial = Number(initialAmount); // Quanto já tem
      const aportesMensais = Number(monthlyInvestment); // Quanto investirá por mês
      const objetivoFinal = Number(targetAmount); // Quanto deseja ter

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
    } else if (activeButton === 2) {
      // Calculo para gerar renda mensal para aposentadoria
      if (!expectedReturn || isNaN(Number(expectedReturn))) {
        alert(
          "Por favor, preencha o rendimento esperado por mês com um valor numérico."
        );
        return;
      }

      // Convertendo input para número
      const rendaMensal = Number(expectedReturn); // Quanto deseja receber por mês

      // Cálculo do montante necessário para gerar a renda mensal desejada
      // Fórmula: Principal = Renda Mensal / Taxa Mensal
      const montanteNecessario = rendaMensal / taxaMensal;

      // Formatar valores para exibição
      const rendaMensalFormatada = rendaMensal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const montanteNecessarioFormatado = montanteNecessario.toLocaleString(
        "pt-BR",
        { style: "currency", currency: "BRL" }
      );
      const taxaMensalPercentual = (taxaMensal * 100).toFixed(2);
      const taxaAnualPercentual = (
        (Math.pow(1 + taxaMensal, 12) - 1) *
        100
      ).toFixed(2);

      alert(
        `Para receber uma renda mensal de ${rendaMensalFormatada}, ` +
          `você precisará ter investido ${montanteNecessarioFormatado}.\n\n` +
          `Cálculo baseado em:\n` +
          `- Taxa CDI atual: ${profitPercentage}%\n` +
          `- Percentual do CDI: ${cdiPercentage}%\n` +
          `- Rendimento mensal: ${taxaMensalPercentual}%\n` +
          `- Rendimento anual: ${taxaAnualPercentual}%\n\n` +
          `Esta simulação considera que apenas os rendimentos serão sacados mensalmente, ` +
          `preservando o valor principal investido.`
      );
    } else if (activeButton === 3) {
      // Cálculo de rendimento de investimentos existentes
      if (!initialAmount || isNaN(Number(initialAmount))) {
        alert("Por favor, informe o valor investido.");
        return;
      }

      // Convertendo input para número
      const valorInvestido = Number(initialAmount);

      // Utilizando o CDI atual da API
      const taxaCDIAnual = (profitPercentage ?? 0) / 100; // Taxa CDI anual (em decimal)
      const percentualCDI = Number(cdiPercentage) / 100; // Percentual do CDI do investimento

      // Cálculo das taxas de rendimento
      const taxaAnual = taxaCDIAnual * percentualCDI;
      const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;
      const taxaDiaria = Math.pow(1 + taxaAnual, 1 / 252) - 1; // 252 dias úteis no ano

      // Cálculo dos rendimentos
      const rendimentoDiario = valorInvestido * taxaDiaria;
      const rendimentoMensal = valorInvestido * taxaMensal;
      const rendimentoAnual = valorInvestido * taxaAnual;

      // Formatação dos valores
      const valorInvestidoFormatado = valorInvestido.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const rendimentoDiarioFormatado = rendimentoDiario.toLocaleString(
        "pt-BR",
        { style: "currency", currency: "BRL" }
      );
      const rendimentoMensalFormatado = rendimentoMensal.toLocaleString(
        "pt-BR",
        { style: "currency", currency: "BRL" }
      );
      const rendimentoAnualFormatado = rendimentoAnual.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      // Taxas em percentual
      const taxaDiariaPercentual = (taxaDiaria * 100).toFixed(5);
      const taxaMensalPercentual = (taxaMensal * 100).toFixed(2);
      const taxaAnualPercentual = (taxaAnual * 100).toFixed(2);

      alert(
        `Rendimentos do seu investimento de ${valorInvestidoFormatado}:\n\n` +
          `Rendimento diário: ${rendimentoDiarioFormatado} (${taxaDiariaPercentual}%)\n` +
          `Rendimento mensal: ${rendimentoMensalFormatado} (${taxaMensalPercentual}%)\n` +
          `Rendimento anual: ${rendimentoAnualFormatado} (${taxaAnualPercentual}%)\n\n` +
          `Cálculo baseado em:\n` +
          `- Taxa CDI atual: ${profitPercentage}% ao ano\n` +
          `- Percentual do CDI: ${cdiPercentage}%\n` +
          `- Rendimento efetivo: ${taxaAnualPercentual}% ao ano`
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
                focusedInput === "initialAmount" && styles.focusedLabel,
              ]}
            >
              Quanto voce ja tem?
            </ThemedText>
            <InputField
              placeholder="EX: R$1000"
              value={initialAmount}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setInitialAmount(numericValue);
              }}
              onFocus={() => setFocusedInput("initialAmount")}
              onBlur={() => setFocusedInput(null)}
            />
            <ThemedText
              style={[
                styles.inputLabel,
                focusedInput === "monthlyInvestment" && styles.focusedLabel,
              ]}
            >
              Quanto voce pretende investir por mes?
            </ThemedText>
            <InputField
              placeholder="EX: R$200"
              value={monthlyInvestment}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setMonthlyInvestment(numericValue);
              }}
              onFocus={() => setFocusedInput("monthlyInvestment")}
              onBlur={() => setFocusedInput(null)}
            />
            <ThemedText
              style={[
                styles.inputLabel,
                focusedInput === "targetAmount" && styles.focusedLabel,
              ]}
            >
              Quanto voce deseja ter?
            </ThemedText>
            <InputField
              placeholder="EX: R$5000"
              value={targetAmount}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setTargetAmount(numericValue);
              }}
              onFocus={() => setFocusedInput("targetAmount")}
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
        return (
          <ThemedView style={styles.contentContainer}>
            <ThemedText
              style={[
                styles.inputLabel,
                focusedInput === "expectedReturn" && styles.focusedLabel,
              ]}
            >
              Qual o valor mensal que você deseja receber?
            </ThemedText>
            <InputField
              placeholder="EX: R$3000"
              value={expectedReturn}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setExpectedReturn(numericValue);
              }}
              onFocus={() => setFocusedInput("expectedReturn")}
              onBlur={() => setFocusedInput(null)}
            />
            <ThemedText style={styles.infoText}>
              Calcularemos quanto você precisa ter investido para receber esse
              valor mensalmente, considerando apenas os rendimentos e
              preservando o capital.
            </ThemedText>
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
      case 3:
        return (
          <ThemedView style={styles.contentContainer}>
            <ThemedText
              style={[
                styles.inputLabel,
                focusedInput === "initialAmount" && styles.focusedLabel,
              ]}
            >
              Quanto você já tem investido?
            </ThemedText>
            <InputField
              placeholder="EX: R$10000"
              value={initialAmount}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setInitialAmount(numericValue);
              }}
              onFocus={() => setFocusedInput("initialAmount")}
              onBlur={() => setFocusedInput(null)}
            />
            <ThemedText style={styles.infoText}>
              Calcularemos quanto seus investimentos rendem diariamente,
              mensalmente e anualmente com base na taxa CDI atual.
            </ThemedText>
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
              focusedInput === "cdiPercentage" && styles.focusedLabel,
            ]}
          >
            Insira a porcentagem do CDI do seu investimento:
          </ThemedText>
          <InputField
            placeholder="EX: 100%"
            value={cdiPercentage}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, "");
              setCdiPercentage(numericValue);
            }}
            onFocus={() => setFocusedInput("cdiPercentage")}
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
  dropdownContainer: {
    width: width > 600 ? "30%" : "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    opacity: 0.8,
  },
});
