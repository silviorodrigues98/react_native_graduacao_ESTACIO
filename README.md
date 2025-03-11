# Guia de Investimentos em Renda Fixa

Este repositório contém um aplicativo React Native que oferece um guia prático para investimentos em renda fixa, além de ferramentas de simulação para ajudar os usuários a planejar seus investimentos. O aplicativo é composto por três telas principais: **Aprendizado**, **Simulações** e **Início**.

## Estrutura do Projeto

O projeto é organizado em três arquivos principais:

1. **`learn.tsx`**: Tela de aprendizado que fornece informações sobre diferentes tipos de investimentos em renda fixa.
2. **`index.tsx`**: Tela inicial que apresenta uma visão geral do aplicativo e suas funcionalidades.
3. **`simulate.tsx`**: Tela de simulação que permite ao usuário calcular diferentes cenários de investimentos com base na taxa CDI.

## Funcionalidades

### 1. Tela de Aprendizado (`learn.tsx`)

A tela de aprendizado oferece um guia detalhado sobre investimentos em renda fixa, incluindo:

- **O que é Renda Fixa?**
- **Poupança**: Vantagens e desvantagens.
- **Tesouro Direto**: Tipos de títulos públicos (Selic, IPCA+, Prefixado).
- **CDB (Certificado de Depósito Bancário)**: Tipos de CDB (Prefixado, Pós-fixado, Híbrido).
- **LCI e LCA**: Letras de Crédito Imobiliário e do Agronegócio.
- **Como Escolher o Melhor Investimento?**: Dicas para escolher o investimento certo com base no perfil de risco e objetivos financeiros.

### 2. Tela Inicial (`index.tsx`)

A tela inicial apresenta uma introdução ao aplicativo e suas principais funcionalidades:

- **Por Que Investir é Importante?**: Explica a importância de investir e lista objetivos comuns, como comprar uma casa, viajar ou planejar a aposentadoria.
- **O Que Oferecemos**: Descreve as funcionalidades do aplicativo, como o guia prático e as ferramentas de simulação.
- **Comece Agora Mesmo!**: Incentiva o usuário a explorar as abas de aprendizado e simulações.

### 3. Tela de Simulação (`simulate.tsx`)

A tela de simulação permite ao usuário calcular diferentes cenários de investimentos com base na taxa CDI atual. As funcionalidades incluem:

- **Simular Montante para um Objetivo**: Calcula quanto tempo e quanto o usuário precisa investir para atingir um valor desejado.
- **Simular Renda Mensal para Aposentadoria**: Calcula o montante necessário para gerar uma renda mensal desejada, preservando o capital investido.
- **Calcular Rendimento de Investimentos Existentes**: Mostra quanto os investimentos atuais rendem diariamente, mensalmente e anualmente.

## Como Usar

1. **Tela Inicial**: Ao abrir o aplicativo, o usuário é recebido com uma introdução e uma visão geral das funcionalidades. A partir daqui, ele pode navegar para as telas de aprendizado ou simulações.
2. **Tela de Aprendizado**: O usuário pode explorar diferentes tópicos sobre investimentos em renda fixa, expandindo e recolhendo as seções para obter mais informações.
3. **Tela de Simulação**: O usuário pode escolher entre três opções de cálculo:
   - **Juntar um Montante para um Objetivo**: Insira o valor inicial, o investimento mensal e o valor desejado para calcular o tempo necessário e os juros obtidos.
   - **Gerar Renda Mensal para Aposentadoria**: Insira o valor mensal desejado para calcular o montante necessário.
   - **Calcular Rendimento de Investimentos Existentes**: Insira o valor investido para ver os rendimentos diários, mensais e anuais.

## Requisitos

- **React Native**: O projeto foi desenvolvido usando React Native, portanto, é necessário ter o ambiente configurado para rodar o aplicativo.
- **Dependências**: Certifique-se de instalar as dependências necessárias, como `@react-native-picker/picker`, para garantir que todas as funcionalidades funcionem corretamente.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd nome-do-repositorio
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Execute o projeto:
   ```bash
   npx react-native run-android
   ```
   ou
   ```bash
   npx react-native run-ios
   ```

## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir para o projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma nova branch com sua feature ou correção:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m "Adicionando nova feature"
   ```
4. Envie as alterações para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um pull request no repositório original.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.