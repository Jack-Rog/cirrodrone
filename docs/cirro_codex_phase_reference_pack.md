# Cirro Codex Phase Reference Pack

Paste the relevant phase block into Codex when starting a phase.

For each phase:
1. Paste the phase block.
2. Paste the matching reference links below it.
3. Tell Codex to create `/docs/phases/phase-X-design.md` first.
4. Do not allow Codex to start the next phase until `/docs/phases/phase-X-handoff.md` exists and ends with the required completion line.

---

## Phase 0 — Foundations, simulator harness, observability

### Goal
Create the repo foundations, simulator scripts, structured logging, and repeatable tests that all later backend work depends on.

### Deliverables
- module boundaries for session, adapter, mission, runtime, telemetry, storage, and app-runtime
- Windows-friendly PX4 SITL scripts
- Windows-friendly ArduPilot SITL scripts
- structured event logging
- unit test harness and system test harness
- simulator smoke path that does not use app logic

### Exit criteria
- repeatable local dev scripts exist
- at least one PX4 SITL smoke test exists
- at least one ArduPilot SITL path is scaffolded
- logging can trace session state transitions
- `phase-0-design.md` and `phase-0-handoff.md` exist

### Reference docs — web
- MAVSDK C++ library overview  
  https://mavsdk.mavlink.io/main/en/cpp/index.html
- MAVSDK Windows build guide  
  https://mavsdk.mavlink.io/main/en/cpp/guide/build_windows.html
- MAVSDK testing guide  
  https://mavsdk.mavlink.io/main/en/cpp/guide/test.html
- MAVSDK logging guide  
  https://mavsdk.mavlink.io/main/en/cpp/guide/logging.html
- PX4 simulation overview  
  https://docs.px4.io/main/en/simulation/
- PX4 Gazebo simulation  
  https://docs.px4.io/main/en/sim_gazebo_gz/
- PX4 jMAVSim  
  https://docs.px4.io/main/en/sim_jmavsim/
- ArduPilot SITL overview  
  https://ardupilot.org/dev/docs/sitl-simulator-software-in-the-loop.html
- ArduPilot SITL usage  
  https://ardupilot.org/dev/docs/using-sitl-for-ardupilot-testing.html

### Reference docs — GitHub
- MAVSDK repo  
  https://github.com/mavlink/mavsdk
- PX4 Autopilot repo  
  https://github.com/PX4/PX4-Autopilot
- ArduPilot repo  
  https://github.com/ArduPilot/ardupilot

### Codex kickoff block
```text
Start Phase 0 only.

Read:
- /docs/product/cirro_mvp_spec.md
- /docs/product/cirro_codex_master_brief.md
- /docs/product/cirro_codex_phase_reference_pack.md
- /docs/product/cirro_codex_execution_rules_v2.md

Then use the Phase 0 reference docs below.

Before writing implementation code, create /docs/phases/phase-0-design.md covering:
- scope
- module boundaries
- simulator strategy
- logging strategy
- test strategy
- files to change
- risks / assumptions

Then implement only Phase 0.
Do not start Phase 1.
```

---

## Phase 1 — Connection/session manager and adapter foundation

### Goal
Build the session layer and a clean MAVLink/MAVSDK adapter boundary.

### Deliverables
- transport abstraction
- session manager
- discovery and system detection
- heartbeat-driven identity handling
- connection state machine
- reconnect/disconnect handling
- adapter interface with no protocol leakage into higher layers
- PX4-first adapter skeleton
- explicit capability probe interface

### Exit criteria
- PX4 SITL connects cleanly
- loss/recovery is represented in the session state machine
- state transitions are logged and tested
- higher layers do not see raw MAVLink or MAVSDK objects

### Reference docs — web
- MAVLink developer guide  
  https://mavlink.io/en/
- MAVLink protocol overview  
  https://mavlink.io/en/about/overview.html
- Heartbeat / connection protocol  
  https://mavlink.io/en/services/heartbeat.html
- MAVLink common messages  
  https://mavlink.io/en/messages/common.html
- MAVLink routing  
  https://mavlink.io/en/guide/routing.html
- MAVSDK C++ library  
  https://mavsdk.mavlink.io/main/en/cpp/index.html
- MAVSDK general usage  
  https://mavsdk.mavlink.io/main/en/cpp/guide/general_usage.html
- PX4 simulation overview  
  https://docs.px4.io/main/en/simulation/
- ArduPilot MAVLink basics  
  https://ardupilot.org/dev/docs/mavlink-basics.html

### Reference docs — GitHub
- MAVLink developer guide repo  
  https://github.com/mavlink/mavlink-devguide
- MAVLink message library repo  
  https://github.com/mavlink/mavlink
- MAVSDK repo  
  https://github.com/mavlink/mavsdk
- PX4 Autopilot repo  
  https://github.com/PX4/PX4-Autopilot
- ArduPilot repo  
  https://github.com/ArduPilot/ardupilot

### Codex kickoff block
```text
Start Phase 1 only.

Use the existing Phase 0 outputs as prerequisites.

Before touching code, create /docs/phases/phase-1-design.md covering:
- session state machine
- discovery and heartbeat handling
- adapter boundaries
- normalized connection health model
- files to change
- tests to add
- risks / assumptions

Then implement only Phase 1.
Do not start Phase 2.
No app code may call MAVLink or MAVSDK directly.
```

---

## Phase 2 — Mission/job schema and capability model

### Goal
Lock the Cirro mission schema and compatibility model before the runtime becomes too concrete.

### Deliverables
- canonical `CirroMission` schema
- schema validator
- versioned capability model
- compatibility checker with `block` vs `degrade`
- translation contract from Cirro mission primitives to adapter-level primitives
- mission fixtures for route, point, pause, camera action, and gimbal action

### Exit criteria
- schema is documented and versioned
- capability model is documented and versioned
- representative fixtures validate successfully
- compatibility results are deterministic
- mapping table from Cirro primitives to MAVLink / MAVSDK concepts exists

### Reference docs — web
- MAVLink mission protocol  
  https://mavlink.io/en/services/mission.html
- MAVLink command protocol  
  https://mavlink.io/en/services/command.html
- MAVLink common messages / command set  
  https://mavlink.io/en/messages/common.html
- MAVSDK missions guide  
  https://mavsdk.mavlink.io/main/en/cpp/guide/missions.html
- MAVSDK MissionRaw API  
  https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_mission_raw.html
- PX4 mission mode  
  https://docs.px4.io/main/en/flight_modes_mc/mission
- ArduPilot mission commands  
  https://ardupilot.org/dev/docs/common-mavlink-mission-command-messages-mav_cmd.html

### Reference docs — GitHub
- MAVLink definitions repo  
  https://github.com/mavlink/mavlink
- MAVSDK repo  
  https://github.com/mavlink/mavsdk
- PX4 Autopilot repo  
  https://github.com/PX4/PX4-Autopilot
- ArduPilot repo  
  https://github.com/ArduPilot/ardupilot

### Codex kickoff block
```text
Start Phase 2 only.

Before implementation, create /docs/phases/phase-2-design.md covering:
- mission schema
- versioning strategy
- capability catalog
- compatibility decision model
- translation boundaries
- files to change
- tests to add
- risks / assumptions

Cirro schema is the public internal contract.
MAVLink mission items are translation targets, not the public API.
Do not start Phase 3.
```

---

## Phase 3 — Runtime execution engine and safety

### Goal
Build the shared mission runtime state machine and make runtime, not app code, own execution and safety.

### Deliverables
- runtime state machine
- preflight validation
- upload/start/pause/resume/abort
- execution progress tracking
- offboard / action command routing through the adapter
- safety gates and failsafe ownership inside runtime
- evidence-driven degraded-mode behavior

### Exit criteria
- runtime can execute representative mission flows in simulation
- preflight validation blocks unsafe starts
- abort/pause/resume are logged and tested
- safety logic lives in runtime instead of app code

### Reference docs — web
- MAVLink mission protocol  
  https://mavlink.io/en/services/mission.html
- MAVLink command protocol  
  https://mavlink.io/en/services/command.html
- MAVSDK Action guide  
  https://mavsdk.mavlink.io/main/en/cpp/guide/taking_off_landing.html
- MAVSDK Offboard guide  
  https://mavsdk.mavlink.io/main/en/cpp/guide/offboard.html
- MAVSDK Action API  
  https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_action.html
- PX4 Offboard mode  
  https://docs.px4.io/main/en/flight_modes/offboard
- PX4 safety / failsafe configuration  
  https://docs.px4.io/main/en/config/safety
- PX4 geofence  
  https://docs.px4.io/main/en/flying/geofence
- ArduPilot geofencing overview  
  https://ardupilot.org/copter/docs/common-geofencing-landing-page.html
- ArduPilot parameter list (failsafe and guided mode references)  
  https://ardupilot.org/copter/docs/parameters.html

### Reference docs — GitHub
- MAVSDK repo  
  https://github.com/mavlink/mavsdk
- PX4 Autopilot repo  
  https://github.com/PX4/PX4-Autopilot
- ArduPilot repo  
  https://github.com/ArduPilot/ardupilot

### Codex kickoff block
```text
Start Phase 3 only.

Before implementation, create /docs/phases/phase-3-design.md covering:
- runtime state machine
- preflight validation rules
- command routing boundaries
- pause/resume/abort semantics
- degraded-mode policy
- files to change
- tests to add
- risks / assumptions

Safety ownership must remain in runtime.
Do not start Phase 4.
```

---

## Phase 4 — Telemetry normalization, camera/gimbal, persistence

### Goal
Normalize live inputs and persist sessions so apps depend on stable Cirro streams rather than raw protocol details.

### Deliverables
- normalized telemetry stream model
- normalized mission state stream
- camera/gimbal interfaces routed through runtime
- local session/event/mission persistence
- exportable session artifacts
- minimal log analysis hooks

### Exit criteria
- stable internal telemetry contract exists
- camera/gimbal hooks do not bypass runtime
- sessions can be replayed or inspected locally
- export format is documented

### Reference docs — web
- MAVLink protocol overview  
  https://mavlink.io/en/about/overview.html
- MAVLink common messages  
  https://mavlink.io/en/messages/common.html
- MAVLink camera protocol v2  
  https://mavlink.io/en/services/camera.html
- MAVLink gimbal protocol v2  
  https://mavlink.io/en/services/gimbal_v2.html
- MAVSDK Telemetry guide  
  https://mavsdk.mavlink.io/main/en/cpp/guide/telemetry.html
- MAVSDK Telemetry API  
  https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_telemetry.html
- MAVSDK Camera API  
  https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_camera.html
- MAVSDK Gimbal API  
  https://mavsdk.mavlink.io/main/en/cpp/api_reference/classmavsdk_1_1_gimbal.html
- PX4 logging  
  https://docs.px4.io/main/en/dev_log/logging
- PX4 ULog format  
  https://docs.px4.io/main/en/dev_log/ulog_file_format
- ArduPilot logs overview  
  https://ardupilot.org/copter/docs/common-logs.html
- ArduPilot telemetry logs  
  https://ardupilot.org/planner/docs/mission-planner-telemetry-logs.html

### Reference docs — GitHub
- MAVSDK repo  
  https://github.com/mavlink/mavsdk
- PX4 Autopilot repo  
  https://github.com/PX4/PX4-Autopilot
- ArduPilot repo  
  https://github.com/ArduPilot/ardupilot

### Codex kickoff block
```text
Start Phase 4 only.

Before implementation, create /docs/phases/phase-4-design.md covering:
- normalized telemetry model
- normalized mission-state model
- camera/gimbal interface boundaries
- local persistence and export format
- files to change
- tests to add
- risks / assumptions

Apps must consume Cirro streams, not raw protocol messages.
Do not start Phase 5.
```

---

## Phase 5 — First-party reference app integration

### Goal
Prove that the platform primitives are sufficient by building Cirro Inspect strictly on top of Cirro APIs.

### Deliverables
- Cirro Inspect integration using only Cirro-owned interfaces
- at least two realistic simulation workflows
- end-to-end happy path and failure path coverage
- evidence that no privileged bypasses remain

### Exit criteria
- reference app uses only Cirro APIs
- at least two realistic workflows run end-to-end in simulation
- app logic is clearly separated from runtime and adapter logic

### Reference docs — web
- MAVSDK missions guide  
  https://mavsdk.mavlink.io/main/en/cpp/guide/missions.html
- MAVSDK Action guide  
  https://mavsdk.mavlink.io/main/en/cpp/guide/taking_off_landing.html
- MAVSDK Offboard guide  
  https://mavsdk.mavlink.io/main/en/cpp/guide/offboard.html
- MAVSDK Telemetry guide  
  https://mavsdk.mavlink.io/main/en/cpp/guide/telemetry.html
- PX4 simulation overview  
  https://docs.px4.io/main/en/simulation/
- ArduPilot SITL usage  
  https://ardupilot.org/dev/docs/using-sitl-for-ardupilot-testing.html

### Reference docs — GitHub
- MAVSDK repo  
  https://github.com/mavlink/mavsdk
- PX4 Autopilot repo  
  https://github.com/PX4/PX4-Autopilot
- ArduPilot repo  
  https://github.com/ArduPilot/ardupilot

### Codex kickoff block
```text
Start Phase 5 only.

Before implementation, create /docs/phases/phase-5-design.md covering:
- reference app boundaries
- API usage audit plan
- realistic workflow set
- simulation validation plan
- files to change
- tests to add
- risks / assumptions

The reference app must not call MAVLink or MAVSDK directly.
Do not start Phase 6.
```

---

## Phase 6 — App runtime, packaging, install/update flow

### Goal
Expose the platform to third-party apps through a minimal runtime, manifest, and packaging/install/update flow.

### Deliverables
- app manifest format
- app runtime boundaries
- install/update/uninstall flow
- version compatibility rules
- sample packaged app
- release/versioning discipline

### Exit criteria
- manifest is documented
- install/update flow exists
- version compatibility policy exists
- sample app runs through Cirro packaging flow

### Reference docs — web
- GitHub releases overview  
  https://docs.github.com/en/repositories/releasing-projects-on-github
- Managing releases in a repository  
  https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository
- Automatically generated release notes  
  https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes
- Semantic Versioning 2.0.0  
  https://semver.org/

### Reference docs — GitHub
- MAVSDK releases  
  https://github.com/mavlink/mavsdk/releases
- PX4 releases  
  https://github.com/PX4/PX4-Autopilot/releases
- ArduPilot releases  
  https://github.com/ArduPilot/ardupilot/releases

### Optional MCP references
Only relevant if Codex is using MCP servers in the IDE:
- MCP intro  
  https://modelcontextprotocol.io/docs/getting-started/intro
- MCP architecture  
  https://modelcontextprotocol.io/docs/learn/architecture

### Codex kickoff block
```text
Start Phase 6 only.

Before implementation, create /docs/phases/phase-6-design.md covering:
- manifest format
- package/install/update lifecycle
- compatibility and versioning rules
- trust and integrity assumptions
- files to change
- tests to add
- risks / assumptions

Use SemVer for Cirro-facing app compatibility rules.
Do not start Phase 7.
```

---

## Phase 7 — Cross-autopilot hardening and DJI-prep constraints

### Goal
Harden Cirro against real cross-autopilot differences and document the interface constraints needed for a later DJI adapter.

### Deliverables
- evidence-based PX4 vs ArduPilot compatibility matrix
- degraded-mode documentation
- hardening tests for known divergence points
- DJI-prep interface constraints and assumptions
- explicit statement of what is still unsupported

### Exit criteria
- compatibility claims are backed by tests and docs
- degraded-mode behavior is documented
- DJI-prep constraints exist without implementing DJI execution

### Reference docs — web
- MAVLink developer guide  
  https://mavlink.io/en/
- MAVLink common messages  
  https://mavlink.io/en/messages/common.html
- MAVLink mission protocol  
  https://mavlink.io/en/services/mission.html
- PX4 build/setup guide  
  https://docs.px4.io/main/en/dev_setup/building_px4
- PX4 simulation overview  
  https://docs.px4.io/main/en/simulation/
- ArduPilot code / build entry point  
  https://ardupilot.org/dev/docs/where-to-get-the-code.html
- ArduPilot SITL usage  
  https://ardupilot.org/dev/docs/using-sitl-for-ardupilot-testing.html

### Reference docs — GitHub
- MAVSDK repo  
  https://github.com/mavlink/mavsdk
- MAVLink repo  
  https://github.com/mavlink/mavlink
- PX4 Autopilot repo  
  https://github.com/PX4/PX4-Autopilot
- ArduPilot repo  
  https://github.com/ArduPilot/ardupilot

### Optional MCP references
Only relevant if Codex is using MCP servers in the IDE:
- MCP intro  
  https://modelcontextprotocol.io/docs/getting-started/intro
- MCP architecture  
  https://modelcontextprotocol.io/docs/learn/architecture

### Codex kickoff block
```text
Start Phase 7 only.

Before implementation, create /docs/phases/phase-7-design.md covering:
- compatibility matrix scope
- hardening test plan
- degraded-mode documentation plan
- DJI-prep interface constraints
- files to change
- tests to add
- risks / assumptions

Do not implement DJI execution.
Document unsupported behavior explicitly.
```
