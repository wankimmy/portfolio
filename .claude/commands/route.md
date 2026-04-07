<<<<<<< HEAD
# BosskuAI Route Command

Use this command to run explicit task-to-skill routing before planning or implementation.

## Intent

- classify task intent quickly and consistently
- route cluster-first (9-way), then choose minimal skill set
- prevent over-loading too many skills
- produce a stable routing decision that can be reused

## Inputs

- user request
- current repo context (if any)
- optional constraints (time, risk, required output)

## Instructions

1. Parse the request and extract:
   - primary goal
   - deliverable type
   - risk level (low/medium/high)
   - ambiguity level (clear/partial/unclear)
2. Run the **Task classifier** from `AGENTS.md`.
3. Choose exactly one primary **cluster**:
   - orchestration, product, engineering, design, security, quality, architecture, growth, continuation
4. Choose:
   - 1 primary skill
   - optional 1 secondary skill only if clearly justified
5. Resolve deprecated aliases using `skill-index.json` (`replaced_by`).
6. Recommend planning model vs execution model for meaningful tasks.
7. Output the routing decision and wait for confirmation if execution scope is non-trivial.

## Output format

```text
Task classification:
  Goal: [one line]
  Deliverable: [what the user wants]
  Risk: [low/medium/high]
  Ambiguity: [clear/partial/unclear]

Cluster decision:
  Primary cluster: [cluster]
  Why: [short reason]

Skill selection:
  Primary: [skill]
  Secondary (optional): [skill or none]
  Alias resolution: [if alias used, show replacement]

Model recommendation:
  Planning: [model]
  Execution: [model]
  Tradeoff: [one line]

Next step:
  [ask for confirmation or proceed plan-first]
```
=======
# /route — Mandatory Task-Start Ritual

Run before any non-trivial task. Do not plan or execute before this completes.

## Steps

1. **Read memory** (follow `memory-first-handoff-protocol.md` read order):
   - `active-continuation.md` → if non-empty: state it, ask continue or new
   - `agent-profile.md` → `project-understanding.md` → `learning-log.md` (last 3)

2. **Parse request**: goal (1 line) · deliverable · risk (low/medium/high) · ambiguity (clear/partial/unclear)

3. **Ambiguity gate**: unclear + risk ≥ medium → stop, ask numbered yes/no questions, wait for confirmation

4. **Run Task classifier** (`AGENTS.md`): activation → scope → intent → cluster → skill → evidence → output

5. **Load skill(s)**: read `ai-assistant/skills/bosskuai-<name>/SKILL.md`, state files opened

6. **Resolve deprecated aliases** via `skill-index.json` (`replaced_by`)

7. **Emit [TASK START]** — this closes /route:
```text
[TASK START]
Memory read: <files>
Skill(s): <name + path>
Phase: Plan/Opus 4.6
Type: <cluster — intent>
```

8. Proceed to plan. Do not execute until plan confirmed.

## Trivial tasks
Emit header with "trivial" in all fields. Skip steps 3–6.
>>>>>>> 300de1b (update)
