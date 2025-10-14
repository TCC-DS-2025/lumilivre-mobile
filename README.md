# LumiLivre - Aplicativo Mobile (Vitríne Bibliotecária)

Repositório do aplicativo mobile do projeto LumiLivre, desenvolvido como a interface do aluno para o sistema de gerenciamento bibliotecário.

## Visão Geral da Tecnologia

- **Framework**: React Native (com Expo)
- **Linguagem**: TypeScript
- **Navegação**: React Navigation
- **Estilização**: StyleSheet nativo do React Native
- **Cliente HTTP**: Axios
- **Gerenciamento de Estado**: React Context API

---

## 🚀 Como Rodar o Projeto Localmente

Siga estes passos para configurar e executar o frontend na sua máquina.

### 1. Pré-requisitos

Garanta que você tenha o ambiente de desenvolvimento React Native configurado. A forma mais fácil é seguir o guia oficial do Expo.

| Ferramenta | Versão Mínima | Instalação (Windows - via [Chocolatey](https://chocolatey.org/)) | Instalação (Linux - via apt/dnf) |
| :--- | :--- | :--- | :--- |
| **Node.js**| `^18.x` ou superior | `choco install nodejs-lts` | Gerenciado via `nvm` é o recomendado. |
| **Git** | `^2.x` | `choco install git` | `sudo apt-get install git` ou `sudo dnf install git` |
| **Android Studio** | (Opcional, para emulador) | [Download Oficial](https://developer.android.com/studio) | [Download Oficial](https://developer.android.com/studio) |
| **Expo Go** | (App no celular) | [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) | [App Store](https://apps.apple.com/us/app/expo-go/id982107779) |

**Verificação:**
Após a instalação, abra um novo terminal e verifique as versões com:
```bash
node -v
npm -v
git --version
```

### 2. Configuração do Ambiente

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/TCC-DS-2025/lumilivre-mobile
    cd lumilivre-mobile
    ```

2.  **Instale as dependências:**
    Este comando irá baixar todas as bibliotecas listadas no `package.json` para a pasta `node_modules`.
    ```bash
    npm install
    ```

3.  **Configure a Conexão com a API:**
    A aplicação precisa saber onde o backend está rodando para buscar os dados.
    *   Crie um arquivo na raiz do projeto chamado `.env`.
    *   Adicione a seguinte linha a este arquivo, apontando para a URL do seu backend. Para rodar localmente, use o IP da sua máquina na rede.

        ```
        API_BASE_URL=http://<SEU_IP_LOCAL>:8080
        ```
        *Exemplo: `API_BASE_URL=http://localhost:8080`*

    *O arquivo `.env` é ignorado pelo Git para não expor URLs ou chaves sensíveis.*

### 3. Executando a Aplicação (Recomendado: Expo Go)

A forma mais rápida de testar é usando o aplicativo Expo Go no seu celular físico.

1.  **Inicie o servidor de desenvolvimento:**
    Garanta que seu computador e seu celular estejam na **mesma rede Wi-Fi**.
    ```bash
    npx expo start
    ```

2.  **Conecte o aplicativo:**
    *   O terminal exibirá um QR Code.
    *   Abra o aplicativo Expo Go no seu celular.
    *   Selecione a opção "Scan QR code" e aponte a câmera para o QR Code no terminal.

O aplicativo será carregado no seu celular e será atualizado automaticamente sempre que você salvar uma alteração no código.

---

## 🏗️ Estrutura do Projeto

O código-fonte está organizado na pasta `src/` da seguinte maneira:

- **/assets**: Contém todos os arquivos estáticos, como imagens e ícones.
- **/components**: Componentes React reutilizáveis em toda a aplicação (ex: `ThemeToggle`).
- **/contexts**: Gerenciadores de estado global, como o `AuthContext` para autenticação.
- **/navigation**: Arquivos que definem a estrutura de navegação do app (pilhas de telas e a barra de abas).
- **/screens**: Componentes que representam as telas completas da aplicação, divididos em `Auth` (Login, etc.) e `App` (Home, Perfil, etc.).
- **/services**: Camada de comunicação com a API. Contém a lógica do Axios para fazer as requisições ao backend.