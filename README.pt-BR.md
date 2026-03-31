![Playwright](https://img.shields.io/badge/Playwright-E2E-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Status](https://img.shields.io/badge/status-active-success)

🇧🇷 Português | 🇺🇸 [English Version](./README.md)

# 🧪 Test Automation - BugBank (Playwright)

## 📌 Overview

Este projeto contém testes automatizados end-to-end (E2E) da aplicação **BugBank**, utilizando Playwright com TypeScript.

O objetivo é validar os principais fluxos da aplicação, como:

* Cadastro de usuário
* Login
* Transferências bancárias

Além disso, o projeto foi estruturado seguindo boas práticas de automação, utilizando conceitos de POO (como encapsulamento, herança e composição) com foco em:

* Escalabilidade
* Reutilização de código
* Isolamento de testes
* Facilidade de manutenção

---

## 🧠 Arquitetura do Projeto

### 🔹 Abordagens adotadas

#### 1. Separação entre cenários autenticados e públicos, utilizando projetos

* `logged/`: testes que exigem usuário logado
* `public/`: testes que não exigem autenticação

👉 Isso evita dependências desnecessárias entre cenários.

---

#### 2. Uso de **storageState**

Como a aplicação não expõe APIs para manipulação de dados, o estado é controlado via Local Storage. Dessa forma, foi utilizado o `storageState` do Playwright para persistir sessões e dados relevantes entre execuções.

* Reduz tempo de execução
* Evita flakiness
* Simula sessão real do usuário

Nessa abordagem, é utilizado um arquivo `storageState.json` para armazenar o estado do browser após autenticação.

---

#### 3. Setup desacoplado com `projects`

Foi criado um projeto específico para setup, e os testes utilizam `dependencies` para garantir a execução na ordem correta.

Isso permite:

* Reutilizar estado entre testes
* Controlar o fluxo de preparação do ambiente

---

#### 4. Uso de **Factories**

Os dados de criação de usuário são gerados dinamicamente por meio de factories, permitindo maior controle e flexibilidade na manipulação dos dados.

Benefícios:

* Evita dados hardcoded
* Facilita manutenção
* Aumenta reusabilidade

---

#### 5. Uso de **Fixtures customizadas**

Fixtures foram utilizadas para:

* Encapsular e centralizar ações comuns
* Compartilhar contexto entre testes
* Melhorar legibilidade

---

#### 6. Uso da **Classe Components**

A classe Components foi utilizada para centralizar elementos reutilizáveis da interface que não representam fluxos completos de interação, como:

* Modais
* Warnings
* Alerts

---

#### 7. Organização por domínio (login / transfer)

Os testes foram agrupados por funcionalidade utilizando `describe`:

* Login
* Transferência

Isso facilita:

* Navegação no projeto
* Escalabilidade futura

---

## 🏷️ Uso de Tags

Os testes utilizam tags para categorização:

* `@login`
* `@transfer`
* `@smoke`

Exemplo:

```ts
test('Should transfer money', {
  tag: ['@transfer', '@smoke']
}, async () => {})
```

Execução por tag:

```bash
npx playwright test --grep @smoke
```

---

## ⚙️ Configuração

O projeto utiliza múltiplos `projects` no Playwright para controlar diferentes contextos:

* Setup de ambiente
* Testes autenticados
* Testes públicos

Além disso:

* `baseURL` configurada globalmente
* `trace` ativado em retry
* Execução sequencial (`workers: 1`) para evitar conflitos de estado

---

## 🚀 Como executar

### Instalar dependências

```bash
npm install
```

### Rodar todos os testes

```bash
npx playwright test
```

### Rodar por tag

```bash
npx playwright test --grep @transfer
```

### Rodar apenas testes públicos

```bash
npx playwright test tests/e2e/public
```

---

## 📊 Relatório

Após a execução, o relatório HTML pode ser visualizado com:

```bash
npx playwright show-report
```

---

## 💡 Decisões técnicas importantes

* Uso de `dependencies` ao invés de lógica manual para controle de setup
* Agrupamento de fluxos de cadastro e login no setup, evitando autenticação via UI durante os testes
* Separação dos testes por domínio, evitando arquivos monolíticos
* Uso de factories para geração dinâmica de dados, mitigando dependência de dados hardcoded
* Uso de abstrações de fluxo (flows) para encapsular fluxos de negócio
* Implementação de validação baseada em regras de negócio e lógica matemática
* Uso de variáveis de ambiente (.env) para gerenciamento de dados sensíveis
* Reutilização de sessão via storageState (Local Storage) para otimização de execução
* Arquitetura baseada em custom actions para maior legibilidade e manutenção

---

## 🧪 Princípios aplicados

* Isolamento de testes
* Redução de flakiness
* Reutilização de estado controlado
* Foco em testabilidade
* Separação de responsabilidades

---

## 🔮 Possíveis melhorias

* Integração com relatórios avançados (Allure, etc.)
* Evolução no uso de tipagem com TypeScript
* Integração com CI/CD
* Criação de dados via API (quando disponível)

---

## 👩‍💻 Autor

Projeto desenvolvido por Camila Tavares com foco em evolução para nível profissional em QA Automation e SDET.
