# Expo Demo — AndroFlow Playground & E2E Test Suite 🚀

Aplicativo móvel de demonstração construído em [Expo](https://expo.dev) / React Native, instrumentado especificamente para validar e demonstrar a automação de testes end-to-end (E2E) com o [**AndroFlow**](https://github.com/carlosxfelipe/androflow).

---

## 🎯 Sobre o Projeto

Este projeto serve como **bancada de testes e vitrine** para o [AndroFlow](https://github.com/carlosxfelipe/androflow) — um executor de testes E2E leve, rápido e declarativo em YAML para Android via ADB, sem a necessidade de Appium ou servidores pesados.

O aplicativo inclui:

- **Navegação completa por abas** (Home e Explore) via Expo Router e `NativeTabs`.
- **AndroFlow Playground**: Seção interativa com campo de texto (`TextInput`), espelhamento em tempo real e contador interativo com botões de incremento, decremento e reset.
- **Componentes animados e expansíveis** (Accordions / Collapsibles) com `react-native-reanimated`.
- **Rolagem e listas longas** para testar gestos de deslize (`swipe`) e busca com rolagem automática (`scrollUntilVisible`).
- **Arquitetura preparada para automação**: Identificadores centralizados em `src/constants/test-ids.ts` e prevenção de _View Flattening_ no Android (`collapsable={false}`).

---

## 📋 Pré-requisitos

Para rodar o app e a suíte do AndroFlow de forma estável, certifique-se de atender aos seguintes requisitos:

1. **Node.js**: `v20.x` (LTS) ou superior (recomendado `v22+` / `v24+` — este projeto utiliza **Expo SDK 58**, **React 19.3** e **React Native 0.88**).
2. **Gerenciador de Pacotes**: `npm`, `bun` ou `yarn`.
3. **Python & uv**: **Python 3.12+** com o gerenciador moderno [`uv`](https://github.com/astral-sh/uv).
4. **Android SDK & ADB**:
   - `platform-tools` atualizado e configurado no `PATH` (`adb devices`).
   - Emulador ou dispositivo com **Android 12+ (API 31+)** — recomendado **Android 14/15 (API 34+)**.
   - Depuração USB ativada no dispositivo físico ou emulador configurado com Google Play / AOSP.
5. **JDK (Opcional para standalone/dev-client)**: OpenJDK 17 ou 21 (caso vá gerar APK local via `npx expo run:android`).

---

## 📦 Instalação do AndroFlow

Instale o **AndroFlow** globalmente como ferramenta via `uv`:

```bash
uv tool install git+https://github.com/carlosxfelipe/androflow.git
```

> **Dica:** Para atualizar a ferramenta para a versão mais recente a qualquer momento, execute:
>
> ```bash
> uv tool install --force git+https://github.com/carlosxfelipe/androflow.git
> ```

Verifique se a instalação foi bem-sucedida:

```bash
androflow --help
```

---

## 📱 Inicializando o App Demo

1. Instale as dependências do projeto Expo:

   ```bash
   npm install
   ```

2. Inicie o servidor Expo no emulador ou dispositivo Android:

   ```bash
   npm run android
   ```

   _(Ou execute `npx expo start` e pressione `a` no terminal para abrir no Android)_

3. Aguarde o app carregar na tela inicial no **Expo Go** (ou em sua Development Build).

---

## 🧪 Suíte de Fluxos AndroFlow (`flows/`)

Os arquivos de fluxo declarativos em YAML estão localizados no diretório [`flows/`](./flows):

| Arquivo                                                        | Descrição                                        | Comandos & Recursos Testados                                                                                         |
| :------------------------------------------------------------- | :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| [`flows/expo_tour.yaml`](./flows/expo_tour.yaml)               | Tour pelas telas e navegação do app              | `tapOn`, `assertVisible`, `assertNotVisible`, accordions Reanimated, `scrollUntilVisible`, `swipe`, `takeScreenshot` |
| [`flows/expo_interactive.yaml`](./flows/expo_interactive.yaml) | Interações no Playground (formulário & contador) | `inputText` com transliteração e foco, `eraseText`, `hideKeyboard`, contadores, `repeat`, `testID`                   |
| [`flows/expo_e2e_full.yaml`](./flows/expo_e2e_full.yaml)       | Suíte E2E completa de ponta a ponta              | Combina estabilização, formulários, abas, accordions, rolagem longa e auditoria completa                             |

---

## ⚡ Como Executar os Testes

Com o emulador rodando e o app aberto na tela:

### 1. Listar dispositivos conectados

```bash
androflow devices
```

### 2. Rodar o Tour de Demonstração

```bash
androflow test flows/expo_tour.yaml
```

### 3. Rodar o Teste de Interação (Formulários & Botões)

```bash
androflow test flows/expo_interactive.yaml
```

### 4. Rodar a Suíte Completa com Gravação e Relatório HTML

```bash
androflow test flows/expo_e2e_full.yaml --report --record
```

### 5. Executar todos os fluxos de uma vez

```bash
androflow test flows/ --report
```

---

## ⚙️ Opções Avançadas e Parâmetros

### Testando em APK Standalone / Production Build

Por padrão, os fluxos utilizam o `appId: ${APP_ID:-host.exp.exponent}` (compatível com Expo Go). Se você gerar um APK nativo ou Development Build com o pacote do projeto (`com.anonymous.expodemo`), defina a variável via `--env`:

```bash
androflow test flows/expo_tour.yaml -e APP_ID=com.anonymous.expodemo
```

### Principais flags do `androflow test`

- `--record` (`-r`): Grava o vídeo da execução da tela em `.mp4`.
- `--report`: Gera relatórios consolidados em HTML visual e JUnit XML.
- `--report-html <path>`: Define o caminho personalizado para o relatório HTML.
- `--report-junit <path>`: Gera arquivo XML no formato JUnit para integração em pipelines de CI/CD.
- `--fail-fast`: Interrompe a execução imediatamente se algum fluxo falhar.
- `--serial <id>` (`-s`): Especifica o serial do emulador ou dispositivo alvo quando houver mais de um conectado.
- `--disable-animations`: Desativa temporariamente as animações do sistema Android para acelerar a execução.

---

## 📊 Relatórios e Artefatos Gerados

Quando executado com `--report` ou `--record`, o AndroFlow salva os resultados no diretório `artifacts/`:

- 📹 **Vídeos de Execução (`.mp4`)**: Gravação contínua da sessão de teste.
- 📸 **Capturas de Tela (`.png`)**: Imagens salvas via comando `takeScreenshot`.
- 📑 **Relatório Interativo (`report.html`)**: Painel com visualização passo a passo, tempos de execução, status e logs.
- 📋 **Relatório JUnit (`report.xml`)**: Compatível com GitHub Actions, GitLab CI, Jenkins, etc.

---

## 🛠️ Boas Práticas de Testabilidade Implementadas

1. **Identificadores Centralizados**: Todos os `testID` são definidos em [`src/constants/test-ids.ts`](./src/constants/test-ids.ts), facilitando manutenção e evitando strings mágicas.
2. **Padrão de Nomenclatura**:
   - `tab_*`: Abas e navegação inferior
   - `screen_*`: Contêineres de tela
   - `btn_*`: Botões e elementos clicáveis
   - `txt_*`: Rótulos de texto e cabeçalhos
   - `input_*`: Campos de texto (`TextInput`)
   - `collapsible_*`: Elementos expansíveis (Accordions)
3. **Prevenção de View Flattening**: Uso de `collapsable={false}` (ou do componente `<ThemedView>`) para garantir que os nós permaneçam visíveis na árvore de acessibilidade do Android.

---

## 🔗 Links e Recursos

- 🤖 **Repositório do AndroFlow**: [github.com/carlosxfelipe/androflow](https://github.com/carlosxfelipe/androflow)
- 📖 **Documentação do Expo**: [docs.expo.dev](https://docs.expo.dev)
- 📐 **Expo Router**: [docs.expo.dev/router/introduction](https://docs.expo.dev/router/introduction)
