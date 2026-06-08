---
name: test-automation
description: Turn a spec (PDF, doc, image, or notes) into runnable tests — generate test cases, run them locally, compare expected vs actual, and produce a pass/fail report with auto-debug suggestions.
command: /test-automation
verified: true
---

# Test Automation (spec → tests → run → report)

End-to-end QA automation. Given a specification (e.g. a requirements PDF like
"SRIM 3.2 Test Automation"), this skill OWNS the job: it reads the spec,
generates deterministic test cases, implements/locates the tests, runs them on
the local machine, compares expected vs actual, and reports — then proposes
fixes for failures. It does not just "call a test tool"; it finishes the task.

## When to use

- "Generate tests from this spec and run them"
- "Test the SRIM 3.2 workflow against the PDF"
- "Write and run unit/integration tests for <module>"
- "Re-run the failing tests and tell me why they failed"

## Inputs (resolve these first; ask only if missing)

1. **Spec source** — a file path (PDF/markdown/docx/image) or pasted text. Read it
   with the available file tools. For PDFs/images, extract the text/requirements.
2. **Target under test** — the code/app/endpoint the tests exercise (a repo path,
   a CLI, an HTTP base URL). Locate it in the workspace before writing tests.
3. **Test stack** — detect from the repo (e.g. `package.json` → vitest/jest/playwright;
   `pyproject`/`pytest`; etc.). If none exists, propose one and confirm.

## Process

1. **Parse the spec** → extract a flat list of atomic, testable requirements.
   Each requirement must be verifiable (has a clear pass condition).
2. **Generate test cases** using the deterministic schema below. One requirement
   may map to several cases (happy path, edge, error). Give every case a stable
   `id` so runs are comparable across time.
3. **Implement** the cases in the detected test framework, OR locate existing
   tests that already cover them (don't duplicate). Keep test files small and
   colocated with the project's conventions.
4. **Run locally** with the project's test command. Capture full stdout/stderr
   and the exit code. Never claim a result you didn't observe in the output.
5. **Compare** expected vs actual per case → mark PASS / FAIL / SKIPPED / ERROR.
6. **Auto-debug failures** (see below) up to 2 focused attempts per failing case.
7. **Report** using the report template below.

## Deterministic test-case schema

Emit each case as a row with these exact fields so results are inspectable and
re-runnable:

| Field | Meaning |
|---|---|
| `id` | Stable slug, e.g. `SRIM-3.2-LOGIN-001` (never renumber across runs) |
| `requirement` | The spec line/section it verifies |
| `preconditions` | State/setup required before the steps |
| `steps` | Ordered, concrete actions |
| `expected` | The single, checkable pass condition |
| `type` | `unit` \| `integration` \| `e2e` \| `manual` |

## Running rules (reliability first)

- Run the **real** command (e.g. `pnpm test`, `pytest -q`, `playwright test`).
  Quote the exact command in the report.
- Tests must be **idempotent** — no order dependence, clean up created state.
- If a test needs secrets/services that aren't available, mark it `SKIPPED` with
  the reason rather than guessing a result.
- Prefer fast unit/integration coverage; reserve e2e for flows that need it.

## Auto-debug loop (for each FAIL)

1. Read the actual failure output (assertion diff, stack trace, exit code).
2. Form ONE hypothesis: is it a **test bug** (wrong expectation) or a **product
   bug** (spec violated)? State which.
3. Apply the smallest fix for that hypothesis, re-run **only** that case.
4. Stop after 2 attempts. If still failing, report it as an open failure with the
   evidence and your best diagnosis — do not loop indefinitely or fake a pass.

## Output / report format

```
## Test Report — <target> vs <spec>
Command: <exact command run>
Summary: <P> passed, <F> failed, <S> skipped, <E> errored  (of <N>)

### Results
| id | requirement | result | note |
|----|-------------|--------|------|
| SRIM-3.2-LOGIN-001 | valid login | PASS  | |
| SRIM-3.2-LOGIN-002 | locked acct | FAIL  | expected 423, got 200 |

### Failures (with evidence + diagnosis)
- SRIM-3.2-LOGIN-002 — product bug: spec requires HTTP 423 on locked account;
  API returns 200. Repro: <command>. Suggested fix: <file:line + change>.

### Coverage gaps
- Requirements with no test yet: <list>
```

## Best practices

- Trace every test back to a spec requirement; flag spec lines with **no** test.
- Make results **deterministic and inspectable** — stable ids, exact commands,
  real output. A reader should be able to re-run any single case from the report.
- Report honestly: failing tests are surfaced with evidence, never hidden or
  "fixed" by weakening the assertion.

## Requirements

- File-reading tools (to ingest the spec; PDFs/images → extract text).
- Shell/command execution (to run the project's test runner locally).
- Write access to the target repo (to create/update test files).
