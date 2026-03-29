# AGENTS.md — Cirro Codex Rules

This file is for Codex. Put it at the repo root.

## Role
Build the Cirro backend/mechanism stack after the front end is already finalised.

Cirro is:
- Windows-first
- local-first
- MAVLink/open-drone first
- built around a shared mission/runtime layer
- not a full GCS clone
- not a DJI execution product in the MVP

## Always read first
Before starting any task, read these files in this order:
1. `/docs/product/cirro_mvp_spec.md`
2. `/docs/product/cirro_codex_master_brief.md`
3. `/docs/product/cirro_codex_phase_reference_pack.md`
4. `/docs/product/cirro_codex_execution_rules_v2.md`
5. latest file in `/docs/phases/` if it exists

## Core architecture rules
- Front end is frozen unless a tiny backend wiring change is strictly necessary.
- Apps target Cirro APIs, not raw MAVLink or MAVSDK.
- Prefer MAVSDK as the high-level implementation surface.
- Use raw MAVLink only inside the adapter layer, protocol diagnostics, or where MAVSDK does not expose the needed behavior.
- Prefer standard MAVLink messages and microservices over custom dialect work.
- Platform primitives must be completed before app logic.
- Do not build broad GCS functionality outside the MVP thesis.
- Do not implement DJI execution unless explicitly instructed.

## Required backend phase order
1. Phase 0 — Foundations, simulator harness, observability
2. Phase 1 — Connection/session manager and adapter foundation
3. Phase 2 — Mission/job schema and capability model
4. Phase 3 — Runtime execution engine and safety
5. Phase 4 — Telemetry normalization, camera/gimbal, persistence
6. Phase 5 — First-party reference app integration
7. Phase 6 — App runtime packaging and developer surface
8. Phase 7 — Cross-autopilot hardening and DJI-prep constraints

Never start a later phase until the current phase handoff file exists and ends with:
- `PHASE X COMPLETE`

If that line does not exist, remain in the current phase.

## Mandatory workflow for every phase
Before changing code:
- create `/docs/phases/phase-X-design.md`
- define scope, non-scope, architecture/module boundaries, files to change, tests to add, risks, assumptions, required external references

During implementation:
- stay inside current phase scope
- add tests with the code
- add structured logging for state transitions, failures, degraded states
- document public and cross-module interfaces
- keep placeholders isolated behind typed interfaces
- avoid leaking MAVLink/MAVSDK or adapter details into higher layers

Before marking a phase complete:
- run relevant tests
- record exactly what was run
- record pass/fail status
- record known gaps
- create `/docs/phases/phase-X-handoff.md`

## Completion rule
A phase is complete only if all are true:
- implementation matches phase scope
- required docs exist
- required tests exist
- relevant tests were run
- acceptance criteria are met or remaining gaps are clearly documented
- handoff file exists
- final line is `PHASE X COMPLETE`

Otherwise, mark the handoff file with:
- `PHASE X NOT COMPLETE`

## Phase-specific stop gates
- Do not start Phase 1 until simulator scripts, logging, test harnesses, and at least one simulator smoke path exist.
- Do not start Phase 2 until the connection/session state machine, heartbeat-driven detection, adapter boundary, and reconnect/disconnect tests exist.
- Do not start Phase 3 until the mission schema and capability model are versioned, the compatibility checker exists, and fixtures validate cleanly.
- Do not start Phase 4 until the runtime state machine, preflight validation, upload/start/pause/resume/abort flow, and runtime-owned safety checks exist.
- Do not start Phase 5 until normalized telemetry, local session persistence, export format docs, and camera/gimbal routing through runtime interfaces exist.
- Do not start Phase 6 until the reference app uses only Cirro APIs and at least two realistic workflows run end-to-end in simulation.
- Do not start Phase 7 until the manifest, install/update flow, version compatibility rules, and a sample packaged app exist.

## Anti-patterns
- skipping the design doc
- silently fixing earlier-phase gaps inside a later phase without documenting it
- putting raw MAVLink or MAVSDK calls into app code
- mixing protocol translation into UI code
- building packaging/runtime before the shared runtime is proven
- inventing unsupported PX4/ArduPilot compatibility claims
- treating Cirro as a general-purpose GCS
- moving to the next phase because the current one feels mostly done

## External references rule
Use the official docs listed in `/docs/product/cirro_codex_phase_reference_pack.md` for each phase.
- Official docs win over convenience or memory.
- GitHub repos are for source inspection and implementation confirmation.
- If MCP tools are available, use them as helpers only; they do not override the official docs.
- When an external doc drives a design decision, cite it in the phase design doc.
- Save copied snippets or snapshots to `/docs/reference/external/` when needed.

## Audit mode
When asked whether the repo should move on, do this:
1. identify the current phase from docs and code
2. check deliverables, exit criteria, and gate conditions
3. verify scope discipline
4. verify tests and recorded runs
5. identify hidden earlier-phase gaps
6. say COMPLETE or NOT COMPLETE
7. list the smallest concrete next actions
8. name the exact next phase only if the current phase is complete

## Failure behavior
If the phase is not complete:
- stop in the current phase
- say exactly what is incomplete
- list the smallest next actions required
- leave the handoff file ending with `PHASE X NOT COMPLETE`
