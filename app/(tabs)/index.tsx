import React from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  Platform,
  Dimensions,
} from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";

const { width: screenWidth } = Dimensions.get("window");

const INVESTMENT_GOALS = [
  { id: "1", text: "Comprar a casa própria" },
  { id: "2", text: "Fazer aquela viagem dos sonhos" },
  { id: "3", text: "Garantir uma aposentadoria tranquila" },
  { id: "4", text: "Construir um futuro melhor para seus filhos" },
];

const APP_FEATURES = [
  {
    id: "1",
    title: "Guia Prático",
    description:
      "Conteúdo objetivo e direto para adultos que querem começar a investir.",
  },
  {
    id: "2",
    title: "Planejamento para o Futuro",
    description: "Ferramentas para simular e planejar sua aposentadoria.",
  },
];

const Section = ({ title, children }) => (
  <>
    <ThemedText style={styles.sectionTitle} accessibilityRole="header">
      {title}
    </ThemedText>
    {children}
  </>
);

const BulletList = ({ items }) => (
  <>
    {items.map((item) => (
      <ThemedText key={item.id} style={styles.bulletItem}>
        {"\u2022"} {item.text || item.description}
      </ThemedText>
    ))}
  </>
);

const HeaderImage = () => (
  <ThemedView style={styles.imageWrapper}>
    <ThemedView style={styles.imageBackground}>
      <ThemedView style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/investimento.png")}
          style={styles.image}
          accessibilityLabel="Ilustração de crescimento de investimentos mostrando um gráfico ascendente com moedas"
        />
      </ThemedView>
    </ThemedView>
  </ThemedView>
);

const IndexScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          accessible={true}
          accessibilityLabel="Tela inicial de investimentos"
        >
          <ThemedView style={styles.content}>
            <ThemedText
              type="title"
              style={styles.title}
              accessibilityRole="header"
              accessibilityLevel={1}
            >
              Invista no seu Futuro!
            </ThemedText>

            <HeaderImage />

            <ThemedText style={styles.description}>
              Bem-vindo(a) ao seu guia prático para o mundo dos investimentos!
              Aqui, você vai descobrir como construir um futuro financeiro mais
              seguro e alcançar seus sonhos, independente da sua idade ou
              conhecimento.
            </ThemedText>

            <Section title="Por Que Investir é Importante?">
              <ThemedText style={styles.description}>
                Investir é como plantar uma semente hoje para colher frutos no
                futuro. Mesmo começando com pouco, você pode fazer seu dinheiro
                crescer e realizar seus objetivos, como:
              </ThemedText>
              <BulletList items={INVESTMENT_GOALS} />
            </Section>

            <Section title="O Que Oferecemos">
              <BulletList items={APP_FEATURES} />
            </Section>

            <Section title="Comece Agora Mesmo!">
              <ThemedText style={styles.description}>
                Explore as abas "Aprendizado" e "Simulações" e dê o primeiro
                passo rumo a um futuro financeiro mais próspero!
              </ThemedText>
            </Section>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
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
    width: "100%",
  },
  content: {
    width: "100%",
    maxWidth: Platform.select({ web: 600, default: "100%" }),
  },
  imageWrapper: {
    width: "100%",
    alignItems: "center",
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  imageBackground: {
    width: Platform.select({
      web: Math.min(540, screenWidth * 0.9),
      default: screenWidth * 0.9,
    }),
    aspectRatio: 16 / 9,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    transform: [{ rotate: "-2deg" }],
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 20,
    transform: [{ rotate: "2deg" }],
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  title: {
    fontSize: Platform.select({ ios: 28, android: 26, default: 28 }),
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: "left",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: Platform.select({
      ios: "#007AFF",
      android: "#2196F3",
      default: "#007AFF",
    }),
    textAlign: "center",
  },
  bulletItem: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    paddingLeft: 10,
  },
});

export default IndexScreen;
