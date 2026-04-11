![Playwright](https://img.shields.io/badge/Playwright-E2E-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Status](https://img.shields.io/badge/status-active-success)

🇺🇸 English | 🇧🇷 [Versão em Português](./README.pt-BR.md)

# 🧪 Test Automation - BugBank (Playwright) 

## 📌 Overview

This project contains end-to-end (E2E) automated tests for the **BugBank** application using Playwright with TypeScript.

The goal is to validate the main application flows, such as:

* User registration
* Login
* Bank transfers

The project is structured following automation best practices, applying OOP concepts (such as encapsulation, inheritance, and composition) with focus on:

* Scalability
* Code reusability
* Test isolation
* Maintainability

---

## 🧠 Project Architecture

### 🔹 Adopted approaches

#### 1. Separation between authenticated and public scenarios using projects

* `logged/`: tests that require authentication
* `public/`: tests that do not require authentication

👉 This avoids unnecessary dependencies between test scenarios.

---

#### 2. Use of **storageState**

Since the application does not expose APIs for data manipulation, the application state is managed through Local Storage. Therefore, Playwright’s `storageState` is used to persist sessions and relevant data between test runs.

* Reduces execution time
* Prevents flakiness
* Simulates real user sessions

A `storageState.json` file is used to store browser state after authentication.

---

#### 3. Decoupled setup using `projects`

A dedicated setup project was created, and test execution order is controlled using `dependencies`.

This allows:

* Reusing state across tests
* Controlling environment preparation flow

---

#### 4. Use of **Factories**

Test data (e.g., user creation) is dynamically generated using factories, enabling flexible and controlled data manipulation.

Benefits:

* Avoids hardcoded data
* Improves maintainability
* Increases reusability

---

#### 5. Use of **custom fixtures**

Fixtures are used to:

* Encapsulate and centralize common actions
* Share context between tests
* Improve readability

---

#### 6. Use of **Components class**

The Components class centralizes reusable UI elements that do not represent full user flows, such as:

* Modals
* Warnings
* Alerts

---

#### 7. Domain-based organization (login / transfer)

Tests are grouped by functionality using `describe`:

* Login
* Transfer

This improves:

* Project navigation
* Future scalability

---

## 🏷️ Tagging strategy

Tests are categorized using tags:

* `@login`
* `@transfer`
* `@smoke`

Example:

```ts
test('Should transfer money', {
  tag: ['@transfer', '@smoke']
}, async () => {})
```

Run by tag:

```bash
npx playwright test --grep @smoke
```

---

## ⚙️ Configuration

The project uses multiple Playwright `projects` to manage different contexts:

* Environment setup
* Authenticated tests
* Public tests

Additional configurations:

* Global `baseURL`
* Trace enabled on retry
* Sequential execution (`workers: 1`) to avoid state conflicts

---

## 🚀 How to run

### Install dependencies

```bash
npm install
```

### Run all tests

```bash
npx playwright test
```

### Run by tag

```bash
npx playwright test --grep @transfer
```

### Run only public tests

```bash
npx playwright test tests/e2e/public
```

---

## 📊 Report

After execution, the last report can be viewed via GitHub Pages:

[![View Report](https://img.shields.io/badge/Report-Open%20HTML-blue?style=for-the-badge)](https://caamilatavares.github.io/BugBank-playwright/)

Você também pode acessar o relatório da execução através de:

```bash
allure serve allure-results
```
---

---

## 💡 Key technical decisions

* Use of `dependencies` instead of manual setup control
* Grouping login and registration flows in setup to avoid UI authentication during tests
* Domain-based test organization
* Use of factories for dynamic data generation
* Use of flow abstractions to encapsulate business logic
* Validation based on business rules and mathematical logic
* Environment variables (.env) for sensitive data management
* Session reuse via storageState for faster execution
* Custom actions architecture for better readability and maintainability

---

## 🧪 Applied principles

* Test isolation
* Flakiness reduction
* Controlled state reuse
* Focus on testability
* Separation of concerns

---

## 🔮 Future improvements

* Integration with advanced reporting tools (Allure, etc.)
* Improved TypeScript typing usage
* CI/CD pipeline integration
* API-based test data setup (when available)

---

## 👩‍💻 Author

Project developed by Camila Tavares with a focus on growing into a professional QA Automation Engineer / SDET.
