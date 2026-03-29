# Cirro Codex Master Brief

Paste this file into Codex at repo start.

## Objective
Build the Cirro backend/mechanism stack **after the front end is already finalised**.

Cirro is:
- a Windows-first desktop shell
- MAVLink / open-drone first
- local-first for execution and session persistence
- centered on a shared mission/runtime layer
- not a full GCS clone
- not a DJI execution product in the MVP

## Core product thesis
### End-user thesis
Cirro is the app store for drones.

### Developer thesis
Cirro is the cross-drone runtime for repeatable drone workflows.

## Non-negotiable architecture
### 1. Cirro Shell
Owns:
- connection/session lifecycle
- map
- telemetry display
- mission execution state
- app library
- compatibility checks
- recording/session history
- shared permissions and safety prompts

### 2. Cirro Mission Runtime
Owns:
- mission/job validation
- capability matching
- upload/start/pause/resume/cancel
- state management
- telemetry/video normalization
- command translation to adapter
- safety checks

### 3. Cirro App Runtime
Owns:
- app lifecycle
- permission model
- API access
- UI embedding
- storage hooks
- versioning

### 4. Adapter Layer
Translates Cirro runtime calls into drone-family-specific execution.

MVP adapter:
- MAVLink / open-drone adapter

Later adapter:
- DJI mobile / mission-style adapter

## Invariants Codex must respect
- Front end is frozen unless a tiny backend wiring change is strictly necessary.
- Apps target Cirro APIs, not raw MAVLink or MAVSDK.
- Prefer MAVSDK as the high-level implementation surface.
- Use raw MAVLink only inside the adapter layer, protocol diagnostics, or where MAVSDK does not expose the needed behavior.
- Prefer standard MAVLink messages and microservices over custom dialect work.
- Platform primitives must be completed before app logic.
- Do not build broad GCS functionality outside the MVP thesis.

## Required repo shape
```text
/docs
  /product
  /reference
    /external
  /phases
/src
  /core
    /session
    /adapter
    /mission
    /runtime
    /telemetry
    /storage
    /app-runtime
  /apps
    /inspect
/tests
  /unit
  /system
/tools
  /sitl
  /scripts
```

## Production order
### Phase 0 — Foundations, simulator harness, observability
Build:
- repo module boundaries
- PX4 SITL scripts
- ArduPilot SITL scripts
- structured logging
- test harnesses
- a thin simulator smoke path

### Phase 1 — Connection/session manager and adapter foundation
Build:
- transport abstraction
- session manager
- heartbeat-driven presence
- connection state machine
- reconnect/disconnect handling
- adapter boundary
- PX4-first adapter shell

### Phase 2 — Mission/job schema and capability model
Build:
- canonical Cirro mission schema
- versioned capability model
- compatibility checker
- mission fixtures
- translation contracts

### Phase 3 — Runtime execution engine and safety
Build:
- mission runtime state machine
- preflight validation
- upload/start/pause/resume/abort
- safety ownership inside runtime
- offboard and command execution rules

### Phase 4 — Telemetry normalization, camera/gimbal, persistence
Build:
- normalized telemetry streams
- normalized mission state stream
- camera/gimbal hooks through runtime interfaces
- local session recording
- exportable session artifacts

### Phase 5 — First-party reference app integration
Build:
- Cirro Inspect on top of Cirro APIs only
- realistic end-to-end simulation flows
- zero privileged bypasses

### Phase 6 — App runtime, packaging, install/update flow
Build:
- manifest
- app runtime boundaries
- install/update flow
- version compatibility rules
- sample packaged app

### Phase 7 — Cross-autopilot hardening and DJI-prep constraints
Build:
- PX4 vs ArduPilot evidence-based compatibility matrix
- degraded-mode documentation
- explicit DJI-prep interface constraints
- no DJI execution implementation unless separately instructed

## Working method Codex must follow
For every phase:
1. Read:
   - `/docs/product/cirro_mvp_spec.md`
   - `/docs/product/cirro_codex_master_brief.md`
   - `/docs/product/cirro_codex_phase_reference_pack.md`
   - `/docs/product/cirro_codex_execution_rules_v2.md`
2. Create `/docs/phases/phase-X-design.md` before touching code.
3. Implement only the current phase.
4. Add tests and logging in the same phase.
5. Run verification.
6. Create `/docs/phases/phase-X-handoff.md`.
7. Only then ask whether the repo is ready for the next phase.

## Hard boundaries
- No direct MAVLink or MAVSDK calls from app code.
- No mission schema leakage into UI-only components.
- No unsupported cross-autopilot claims without test evidence.
- No packaging/runtime work before the shared runtime is proven.
- No DJI execution work in MVP phases.

## Optional MCP usage rule
If MCP servers are available in the IDE:
- use them for repo exploration, docs retrieval, and workflow acceleration
- do not let MCP tool output override official MAVLink, MAVSDK, PX4, ArduPilot, GitHub, or SemVer docs
- cite the official docs inside design docs when they drive architectural decisions
