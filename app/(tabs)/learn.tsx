import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { Collapsible } from "../../components/Collapsible";

const AprendizadoScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ThemedView style={styles.content}>
          <ThemedText type="title" style={styles.title}>
            Guia de Investimentos em Renda Fixa
          </ThemedText>

          <Collapsible title="O que é Renda Fixa?" style={styles.collapsible}>
            <ThemedText style={styles.description}>
              Renda fixa são investimentos em que você empresta dinheiro para
              uma instituição (banco, governo, etc.) e recebe juros em troca.
              São geralmente considerados mais seguros que a renda variável.
            </ThemedText>
          </Collapsible>

          <Collapsible title="Poupança: O Básico" style={styles.collapsible}>
            <ThemedText style={styles.description}>
              A poupança é o investimento mais popular no Brasil. É simples,
              segura (garantida pelo FGC até R$ 250 mil), mas geralmente oferece
              um rendimento menor que outras opções de renda fixa.
            </ThemedText>
            <ThemedText style={styles.subsectionTitle}>Vantagens:</ThemedText>
            <ThemedText style={styles.description}>
              {"\u2022"} Simplicidade {"\n\u2022"} Segurança (FGC) {"\n\u2022"}{" "}
              Isenção de Imposto de Renda
            </ThemedText>
            <ThemedText style={styles.subsectionTitle}>
              Desvantagens:
            </ThemedText>
            <ThemedText style={styles.description}>
              {"\u2022"} Baixo Rendimento
            </ThemedText>
          </Collapsible>

          <Collapsible
            title="Tesouro Direto: Títulos Públicos"
            style={styles.collapsible}
          >
            <ThemedText style={styles.description}>
              O Tesouro Direto permite que você invista em títulos públicos,
              emprestando dinheiro para o governo federal. Existem diferentes
              tipos de títulos (Selic, IPCA+, Prefixado), cada um com suas
              características.
            </ThemedText>
            <ThemedText style={styles.subsectionTitle}>
              Tipos de Títulos:
            </ThemedText>
            <ThemedText style={styles.description}>
              {"\u2022"} Tesouro Selic: Atrelado à taxa Selic, ideal para quem
              busca liquidez e segurança. {"\n\u2022"} Tesouro IPCA+: Atrelado à
              inflação (IPCA), protege seu dinheiro da perda do poder de compra.{" "}
              {"\n\u2022"} Tesouro Prefixado: Taxa de juros definida no momento
              da compra, ideal para quem busca previsibilidade.
            </ThemedText>
          </Collapsible>

          <Collapsible
            title="CDB (Certificado de Depósito Bancário)"
            style={styles.collapsible}
          >
            <ThemedText style={styles.description}>
              O CDB é um título emitido por bancos para captar recursos. A
              rentabilidade pode ser prefixada, pós-fixada (atrelada ao CDI) ou
              híbrida (atrelada à inflação + um percentual).
            </ThemedText>
            <ThemedText style={styles.subsectionTitle}>
              Tipos de CDB:
            </ThemedText>
            <ThemedText style={styles.description}>
              {"\u2022"} Prefixado: Taxa de juros definida no momento da compra.{" "}
              {"\n\u2022"} Pós-fixado: Atrelado ao CDI (Certificado de Depósito
              Interbancário). {"\n\u2022"} Híbrido: Atrelado à inflação (IPCA ou
              IGPM) + um percentual.
            </ThemedText>
          </Collapsible>

          <Collapsible
            title="LCI (Letra de Crédito Imobiliário) e LCA (Letra de Crédito do Agronegócio)"
            style={styles.collapsible}
          >
            <ThemedText style={styles.description}>
              LCIs e LCAs são títulos emitidos por bancos para financiar o setor
              imobiliário e o agronegócio, respectivamente. São isentos de
              Imposto de Renda para pessoa física.
            </ThemedText>
            <ThemedText style={styles.subsectionTitle}>Vantagens:</ThemedText>
            <ThemedText style={styles.description}>
              {"\u2022"} Isenção de Imposto de Renda {"\n\u2022"} Geralmente
              oferecem rentabilidade maior que a poupança
            </ThemedText>
          </Collapsible>

          <Collapsible
            title="Como Escolher o Melhor Investimento?"
            style={styles.collapsible}
          >
            <ThemedText style={styles.description}>
              A escolha do melhor investimento depende do seu perfil de risco,
              dos seus objetivos financeiros e do prazo que você tem para
              investir. É importante diversificar seus investimentos para
              reduzir os riscos e aumentar as chances de obter bons resultados.
            </ThemedText>
          </Collapsible>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2e78b7", // Consistent color
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#34495e", // Consistent color
  },
  collapsible: {
    marginBottom: 15, // Consistent margin
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
});

export default AprendizadoScreen;
