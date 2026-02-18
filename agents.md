# AI Development Guidelines & System Constraints

This document serves as the "System Context" for any AI agent working on this codebase.

## 1. Architecture Constraints
- **Backend-First**: All business logic resides in the Flask API (`backend/`). The frontend is a dumb consumer.
- **Statelessness**: The API must remain stateless to support serverless deployment (Vercel).
- **Database**: Use `SQLite` for local portability, but strictly via `SQLAlchemy` ORM to allow future migration to PostgreSQL.

## 2. Coding Standards
### Python (Backend)
- **Validation**: NEVER trust user input. Use `Marshmallow` schemas for all request bodies.
- **Error Handling**: wrap all routes in try/except blocks and return JSON errors (not HTML 500 pages).
- **Type Hinting**: Use Python type hints for all utility functions.

### JavaScript (Frontend)
- **Functional Components**: Use React Hooks (`useState`, `useEffect`) only. No Ref-based DOM manipulation unless necessary.
- **Styling**: Use utility classes (TailwindCSS) exclusively. No separate CSS files except for global resets.
- **API Calls**: All fetch calls must go through a centralized `api.js` handler to manage base URLs and error logging.

## 3. AI Usage in Product
- **Role**: The "AI" in the product is a categorization agent.
- **Implementation**: Currently uses a deterministic keyword-based heuristic (`backend/utils.py`) for speed and offline capability.
- **Prompting Strategy (Future LLM)**: If upgrading to an LLM, use few-shot prompting to force JSON output for categories.

## 4. Safety & Security
- **Inputs**: All text inputs are sanitized via the frontend and validated via backend Schemas.
- **Secrets**: API Keys (if added) must be loaded via `os.getenv`, never hardcoded.
- **Vercel Compatibility**: Do not write to the local filesystem (except `/tmp`) to avoid read-only errors.
