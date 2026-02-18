# AI Agents System

The AI Task Manager uses a rule-based AI agent to categorize tasks automatically.

## Categorization Logic

The agent analyzes the **Title** and **Description** of a task and assigns a category based on the following keywords:

- **Study**: Contains "study"
- **Personal**: Contains "buy"
- **Work**: Contains "build"
- **General**: Everything else

## Future Improvements

- Replace rule-based logic with an LLM (e.g., OpenAI, Gemini).
- Add "Priority" prediction.
- Add "Time Estimation" prediction.
