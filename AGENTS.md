# AI Agent Guidelines - Pokemon Bootcamp Project

Welcome, Agent. You are working on the "Pokemon" onboarding project, which is a React Native mobile application built using TypeScript and React Native Reanimated.

Your goal is to follow the project's strict architecture, maintain clean code, and ensure all changes are fully verified before declaring a task complete.

> ⚠️ **CRITICAL NOTICE:** Expo HAS CHANGED. You MUST read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

---

## 🛠️ Tech Stack & Environment

- **Framework:** React Native / Expo (Strictly version **v56.0.0**)
- **Language:** TypeScript (Strict mode)
- **Animation Engine:** React Native Reanimated (v3+)
- **Styling:** StyleSheet.create() / Standard React Native layout components

---

## 🚀 Run Commands (Verification Feedback Loop)

You MUST execute these commands to verify your work after making any code changes. Do not ask the user to run them for you.

- **Type Check:** `npx tsc --noEmit` (or `yarn tsc`)
- **Linter & Code Style:** `yarn lint` / `npm run lint`
- **Automated Fixes:** `yarn lint --fix`
- **Unit Tests (if applicable):** `yarn test`

---

## 📐 Code Style & Architectural Rules

### 1. General Rules

- **No Comments:** Do not add comments to the code under any circumstances. Keep the code clean and self-explanatory.
- Use **Functional Components** exclusively. No class components.
- Avoid using `any`. Define strict types and interfaces for all component props and state.
- Strictly separate UI components from business logic / hooks where appropriate.

### 2. Animations (React Native Reanimated)

- Use Reanimated shared values (`useSharedValue`) and animated styles (`useAnimatedStyle`) for all performance-critical UI transformations.
- **Component Efficiency:** Do not use `<Animated.View>` if the container does not hold any animated styles. Use a standard `<View>` instead.
- **Transform Order:** Pay absolute attention to the order of operations in the `transform` array. Remember that transformations are applied sequentially from top to bottom (e.g., `rotate` before `translateY` moves the coordinate system, `rotate` after `translateY` rotates the object locally).

### 3. Styling & Colors

- Use standard `StyleSheet.create()` for component styles.
- **Color Restrictions:** Only use HEX colors for styling (e.g., `#FFFFFF`, `#FF0000`). Do NOT use named colors (like `'yellow'`, `'blue'`) or `rgba()` / `hsla()` values.
- Keep components responsive by using flexbox layout instead of hardcoded absolute positioning, unless strictly required by the design (e.g., elements layered on top of each other like a Sun and its Orbit).

---

## 🌿 Git & Pull Request Workflow

### Commit Messages

Follow the **Conventional Commits** specification. Examples:

- `feat(ui): add planet rotation animation`
- `fix(orbit): fix planet flying off the orbit layout`
- `docs(readme): update onboarding documentation notes`

### Pull Request Description

When you finish a task, generate a draft description for the Pull Request in your chat thread. It must include:

1. **Summary:** A brief explanation of what was implemented.
2. **Technical Details:** Mention specific hooks, components, or transform logic used.
3. **Verification:** Confirm that the linter and type-checker pass successfully.
