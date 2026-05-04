# Workspace Onboarding

Use this once after installing BosskuAI into a real project.

## Goal

<<<<<<< HEAD
Set up a local-first workspace layer with:

- shared instructions across Claude Code, Cursor, and Codex
- initialized project memory
- synced local retrieval
- a simple validation pass

## Install
=======
Get BosskuAI working in your project with:

- shared rules loaded
- project memory initialized
- vector memory indexed
- a clean first prompt to verify everything works

## Fast setup

### 1. Install BosskuAI into your project
>>>>>>> 3986c6126012ee6163546e682e439eb354c84b0e

```bash
./scripts/install.sh /path/to/your/project
```

Windows:

```powershell
.\scripts\install.ps1 C:\path\to\your\project
```

<<<<<<< HEAD
Open the target project root after install.

## First Prompt

Paste this into the assistant:
=======
### 2. Open the target project root

Open the actual project you installed BosskuAI into using Claude Code, Cursor, or Codex.

That project should now contain:

```text
my-project/
├── AGENTS.md
├── CLAUDE.md
├── .claude/
├── .cursor/
├── .codex/
└── ai-assistant/
```

### 3. Run the onboarding prompt

Paste this into the assistant:

```text
bossku

Use the workspace rules and the minimum relevant local skills.

Start with bosskuai-workspace-assistant. If repo context is unclear, use bosskuai-project-understanding.

Read the nearest README, manifests, docs, and enough source code to understand the project before making recommendations.

Separate:
- confirmed facts
- inferred facts
- unknowns

Then give me:
1. what this project is
2. the stack and architecture
3. the key source-of-truth files
4. which local skills will be most useful here
5. a draft for ai-assistant/memory/agent-profile.md
6. a draft for ai-assistant/memory/project-understanding.md
```

### 4. Review memory drafts

Check and fix:

- `ai-assistant/memory/agent-profile.md`
- `ai-assistant/memory/project-understanding.md`

Correct anything marked `Inferred:` or `Unknown` if you know the real answer.

### 5. Build vector memory

After those memory files are ready:

```bash
python3 ./ai-assistant/scripts/vector_memory.py sync
```

## How to know it is working

Good signs:

- the assistant reads repo evidence before making claims
- it separates confirmed facts from inference
- it loads relevant local skills instead of answering generically
- it writes durable memory only when it should
- it can later retrieve relevant memory through the vector store

## Next prompts

Use these after onboarding:

### Project understanding
>>>>>>> 3986c6126012ee6163546e682e439eb354c84b0e

```text
bossku

<<<<<<< HEAD
Use the workspace rules and the minimum relevant local skills.
Start with bosskuai-workspace-assistant. If repo context is unclear, use bosskuai-project-understanding.

Read the nearest README, manifests, docs, and enough source code to understand the project before making recommendations.

Separate:
- confirmed facts
- inferred facts
- unknowns

Then give me:
1. what this project is
2. the stack and architecture
3. the key source-of-truth files
4. which local skills will be most useful here
5. a draft for ai-assistant/memory/agent-profile.md
6. a draft for ai-assistant/memory/project-understanding.md
```

## Fill In Memory

Review and edit:

- [`ai-assistant/memory/agent-profile.md`](ai-assistant/memory/agent-profile.md)
- [`ai-assistant/memory/project-understanding.md`](ai-assistant/memory/project-understanding.md)

`ai-assistant/memory/active-continuation.md` is optional. Keep it empty, trim it, or delete it unless you are preparing a real handoff between sessions or tools.

Correct anything that is still inferred or unknown.

## Sync Retrieval

```bash
python3 ./ai-assistant/scripts/vector_memory.py sync
```

The default retrieval backend is `local-hash`. It is fast and local-first, but it is approximate. Treat it as a file finder, not as proof.

## Validate The Layer

```bash
bash ./scripts/check-workspace.sh
bash ./scripts/validate-skill-index.sh
python3 ./scripts/eval_workspace.py
```

## What Good Looks Like

- the assistant reads evidence before making repo-specific claims
- the assistant uses a small relevant skill set instead of loading everything
- durable memory updates are selective, not spammy
- retrieval returns sensible memory files for sample queries
- the eval report gives you a baseline for future changes
=======
Use bosskuai-project-understanding and bosskuai-codebase-analysis.

Explain the real project purpose, main entry points, architecture style, code organization, and biggest technical risks.
Separate confirmed facts, inference, and unknowns.
```

### Implementation

```text
bossku

Plan the safest implementation for this task, store a compact reusable plan if it matters later, then execute.
Use the minimum relevant local skills and read code before changing anything.
```

### Review

```text
bossku

Review this change for correctness, regressions, security, business logic, and missing tests.
Findings first.
```

## Useful commands

```bash
python3 ./ai-assistant/scripts/vector_memory.py sync
python3 ./ai-assistant/scripts/vector_memory.py query "auth retry policy"
bash ./scripts/check-workspace.sh
```

## If you update BosskuAI itself

To refresh repo understanding without wiping memory:

```bash
bash ./ai-assistant/scripts/project-understanding.sh
```
>>>>>>> 3986c6126012ee6163546e682e439eb354c84b0e
