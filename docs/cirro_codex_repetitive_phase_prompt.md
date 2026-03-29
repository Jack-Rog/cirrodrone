# Repetitive Codex Prompt — Phase Review and Move-On Check

Paste this into Codex whenever you want it to assess the current stage and tell you whether to move on.

```text
Review the Cirro repo against these files first:
- /docs/product/cirro_mvp_spec.md
- /docs/product/cirro_codex_master_brief.md
- /docs/product/cirro_codex_phase_reference_pack.md
- /docs/product/cirro_codex_execution_rules_v2.md
- the latest file in /docs/phases/

Then do all of the following in order:

1. Identify the current phase based on the latest phase design/handoff docs and actual code.
2. Check the current phase against its required deliverables, exit criteria, and gate conditions.
3. Audit whether the implementation stayed within phase scope.
4. Audit whether tests exist and whether the recorded test runs are sufficient.
5. Audit whether any hidden earlier-phase gaps still remain.
6. State clearly whether the current phase is complete.
7. If incomplete, list only the smallest concrete actions required to complete it.
8. If complete, state exactly which next phase should start.
9. If complete, generate a Phase Kickoff Brief for the next phase using the format below.
10. Do not implement the next phase yet unless I explicitly instruct you to.

Use this output structure exactly:

# Current Phase
[phase number and name]

# Completion Decision
[COMPLETE or NOT COMPLETE]

# Evidence
- [bullet]
- [bullet]

# Gaps
- [bullet]
- [bullet]

# Move-On Decision
[Stay on current phase / Move to next phase]

# Smallest Next Actions
1. ...
2. ...
3. ...

# Next Phase Kickoff Brief
Include:
- phase objective
- exact deliverables
- non-scope
- files/docs to read first
- external reference docs to use
- tests to add
- completion gate
```
