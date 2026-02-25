# Developer Log — AI-Augmented Engineering

This document describes how AI tools were used throughout the development of the Kibo Cart project, including strategy, human audit moments, and verification.


## 1. AI Strategy

I used AI tools (Microsoft Copilot, Cursor, Claude, GitHub Copilot) to accelerate development while maintaining full human oversight. My strategy included:

- Providing **clear context** before each request (file structure, component responsibilities, API schemas).
- Supplying **constraints** (TypeScript strict mode, styled-components, React Router v6).
- Asking AI to generate **scaffolding**, then refining the output manually.
- Using AI for **debugging assistance**, especially around routing, context, and TypeScript inference.
- Using AI to generate **test cases**, then adjusting them for correctness.

This approach allowed me to move quickly while keeping architectural control.

---

## 2. Human Audit Moments

### **Audit #1 — CartContext Refactor**
AI initially produced a context with unclear responsibilities and mixed concerns.  
I corrected it by:

- Splitting logic into clean add/remove/increment/decrement functions  
- Ensuring pure functions  
- Improving readability and maintainability  

This resulted in a more predictable and testable store.

---

### **Audit #2 — React Router + ProductPage Integration**
AI generated a test that failed due to router mocking issues.  
I identified the real root cause:

- Multiple import paths for the API module  
- Mock not being applied  
- Router never rendering ProductPage  

I corrected the import paths, added a Vite alias, and fixed the mock resolution.

---

### **Audit #3 — TypeScript Build Errors After Upgrade**
AI suggested changes that caused 200+ TypeScript errors.  
I manually:

- Removed unused tsBuildInfoFile settings  
- Updated TypeScript to 5.5  
- Added vitest/globals  
- Added path aliases to tsconfig  
- Fixed strict typing in test utilities  

This stabilized the build and allowed deployment.

---

## 3. Verification & Testing

AI helped generate initial test cases for:

- Cart logic  
- ProductPage loading  
- Category filtering  

I manually verified:

- Edge cases (incrementing quantity, removing items, empty cart)  
- API error handling  
- Routing behavior  
- UI rendering under different states  

I also used AI to generate test scaffolding, then refined the mocks and assertions to ensure correctness.

---

## 4. Reflections

AI significantly accelerated development, especially for:

- Boilerplate generation  
- Debugging  
- TypeScript inference  
- Documentation  

Human oversight was essential for:

- Architecture  
- Type safety  
- Routing correctness  
- Build stability  
- Production deployment  

The final result is a clean, functional, well‑structured React + TypeScript application delivered efficiently with AI assistance.
