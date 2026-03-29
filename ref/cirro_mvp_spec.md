# Cirro MVP Spec

## 1. Product definition

**Cirro** is a **free Windows desktop drone shell** that lets users install and run drone apps through a shared mission/runtime layer.

The MVP is **not** a full GCS clone and **not** a universal drone OS.

The MVP does two things:

1. Gives end users a simple way to **connect a supported drone, launch an app, and execute a workflow**
2. Gives developers a way to **build one app against Cirro APIs** instead of manually rebuilding telemetry, mission execution, and safety handling each time

---

## 2. MVP thesis

**User-facing thesis:**  
Cirro is the **app store for drones**.

**Developer-facing thesis:**  
Cirro is the **cross-drone runtime for repeatable drone workflows**.

**Initial product wedge:**  
A **free shell** plus **one first-party reference app**.

---

## 3. Initial target user

### Primary user
**Prosumer / small operator** using a drone for repeatable visual tasks.

Examples:
- roof checks
- property perimeter checks
- fence line inspection
- building exterior capture
- simple site progress capture

### Secondary user
**Developer** who wants to build workflow-specific drone apps without owning the full drone integration stack.

---

## 4. MVP scope

## In scope
- Windows desktop shell
- Open-drone / MAVLink-first support
- App install and launch flow
- Map + telemetry + mission execution base layer
- Standardized inputs and outputs for apps
- One first-party reference app
- App runtime with templated and custom UI options

## Out of scope
- Full GCS replacement
- Firmware flashing
- calibration/setup suite
- deep compliance workflows
- direct DJI execution in MVP
- broad multi-platform support
- advanced autonomous behavior like live dynamic animal response
- large-scale enterprise fleet tooling

---

## 5. Core MVP promise

A user should be able to:

1. Open Cirro
2. Connect a supported drone
3. Install or open an app
4. Review or generate a mission/workflow
5. Run it
6. See live status/video/telemetry
7. Save the session

A developer should be able to:

1. Build an app against Cirro APIs
2. Use Cirro mission/runtime services
3. Avoid rebuilding connection, telemetry, mission execution, and safety handling
4. Publish the app into Cirro

---

## 6. MVP reference app

## Name
**Cirro Inspect** (working title)

## Job
Helps users run repeatable visual inspection/site-capture workflows.

## Example workflows
- roof inspection
- building exterior capture
- fence line/property run
- shed/tower/solar patch walkthrough

## Why this app
- simple to explain
- aligns with mission planner style UX
- exercises the shared runtime properly
- proves the value of reusable primitives
- useful to end users without requiring deep autonomy

---

## 7. Product architecture

## A. Cirro Shell
The main Windows desktop application.

Owns:
- connection/session lifecycle
- map
- telemetry display
- mission execution state
- app library
- compatibility checks
- recording/session history
- shared permissions and safety prompts

## B. Cirro Mission Runtime
The execution layer every app must use.

Owns:
- mission/job validation
- capability matching
- upload/start/pause/resume/cancel
- state management
- telemetry/video normalization
- command translation to adapter
- safety checks

## C. Cirro App Runtime
The environment apps run inside.

Owns:
- app lifecycle
- permission model
- API access
- UI embedding
- storage hooks
- versioning

## D. Adapter layer
Translates Cirro runtime calls into drone-family-specific execution.

### MVP adapter
- MAVLink/open-drone adapter

### Later adapter
- DJI mobile/mission-style adapter

---

## 8. Developer model

Every app must target:

1. **Cirro capability model**
2. **Cirro mission/job spec**
3. **Cirro runtime APIs**

Developers do **not** own:
- vehicle connection
- direct execution layer
- core mission state engine
- cross-drone translation
- base safety/session handling

Developers **do** own:
- workflow logic
- domain-specific UI
- mission generation logic
- output/reporting layer

---

## 9. UI model for apps

Apps can choose one of three levels.

## Level 1 — Default planner
Developer uses Cirro’s built-in planner/map UI with minimal customization.

Good for:
- waypoint tools
- simple capture tools
- basic inspection apps

## Level 2 — Composable planner
Developer uses Cirro components but customizes the flow.

Good for:
- semi-vertical apps
- opinionated capture flows

## Level 3 — Fully custom app UI
Developer builds their own UX but still outputs a valid Cirro mission/job spec and uses the same runtime.

Good for:
- highly vertical apps
- branded workflows
- future GrazeMate-like experiences

**MVP should support Level 1 and Level 2 well.**  
Level 3 can exist in limited form initially.

---

## 10. Standardized app inputs and outputs

## Standardized inputs
Apps can read:
- GPS/location
- heading
- altitude
- speed
- battery/state
- connection/flight state
- mission state
- home point
- live video stream
- session metadata

## Standardized outputs
Apps can request:
- create/upload mission
- go to point
- set speed
- pause
- resume
- abort
- camera trigger
- gimbal/camera control
- overlay/annotation actions

MVP should stay at the level of **mission and controlled workflow primitives**, not arbitrary raw drone control.

---

## 11. Mission/job spec

Cirro needs a **single internal mission/job schema**.

Each app produces a mission/job package containing:

### Metadata
- app name
- workflow type
- version
- required capabilities

### Geometry
- points
- route
- area
- corridor
- POIs

### Movement
- speed
- altitude
- heading behavior
- pause points

### Capture actions
- photo/video triggers
- gimbal actions
- annotations

### Execution rules
- start conditions
- stop conditions
- failure handling
- resume behavior

### Safety constraints
- capability requirements
- minimum state requirements
- degraded mode rules

This schema is the core platform abstraction.

---

## 12. Capability model

Each drone adapter exposes capabilities like:

- telemetry.read
- gps.read
- video.read
- mission.upload
- mission.start
- mission.pause
- mission.resume
- mission.cancel
- goto.basic
- camera.trigger
- camera.control
- gimbal.control
- recording.local

Each app declares what it needs.

Cirro checks compatibility before execution.

If a capability is missing:
- block if essential
- degrade gracefully if optional

This supports your preferred **degraded compatibility mode**.

---

## 13. Shell UX

## Core screens

### 1. Home
- installed apps
- recent sessions
- connection status
- compatible drone status

### 2. Connect
- detect supported drone
- show status
- confirm readiness

### 3. Mission / Map
- map view
- route preview/edit
- mission summary
- safety warnings

### 4. Live Run
- video
- telemetry
- mission progress
- pause/resume/abort

### 5. Sessions
- saved runs
- logs
- video
- exports

### 6. App Library
- available apps
- install/update/remove
- compatibility flags

---

## 14. MVP UX flow

## End-user flow
1. Open Cirro
2. Connect drone
3. Choose app
4. App generates or configures workflow
5. User reviews mission
6. Cirro validates compatibility
7. User runs mission
8. Cirro shows live progress
9. Session is saved locally

## Developer flow
1. Build app against Cirro SDK
2. Use runtime APIs/components
3. Package app
4. Link repo/package to Cirro developer flow
5. Publish for internal/private testing
6. Later publish to public library

---

## 15. Technical MVP requirements

## Desktop app
- Windows first
- local-first
- low-friction install
- stable USB/controller/drone session handling

## App packaging
Initial version can support:
- app bundle linked to a GitHub repo/release flow
- simple manifest
- versioned package install/update

## Storage
- local mission/session storage
- local logs
- local video/session outputs where supported

## Networking
- optional sign-in/store access
- local execution should still be primary

---

## 16. Monetization in MVP

## User side
- shell is free
- first-party app can be free initially or low-cost paid later
- long term: buy apps inside Cirro

## Platform side
- revenue share on paid apps
- first-party paid apps later
- no developer fee required in earliest MVP

The business model should feel like:
- **free entry**
- **paid usefulness**

---

## 17. Success criteria

## Product success
- users can complete real workflows through Cirro
- reference app is genuinely useful
- shell feels simpler than piecing tools together
- app install/run flow feels natural

## Platform success
- at least one non-core developer can build against the runtime
- same app logic works across multiple supported open-drone setups
- compatibility/degraded-mode model works in practice

## Commercial success
- users are willing to install the shell for free
- some users are willing to pay for app value, not just for generic flight control

---

## 18. Key risks

## 1. Too abstract, not useful
Mitigation: ship strong first-party reference app.

## 2. Becoming a bloated GCS clone
Mitigation: keep shell limited to workflow-critical functions only.

## 3. Poor developer experience
Mitigation: keep APIs high-level and opinionated.

## 4. Weak compatibility promise
Mitigation: define supported capabilities clearly and use degraded-mode honestly.

## 5. No pull for marketplace
Mitigation: prove user demand with first-party app before pushing platform narrative too hard.

---

## 19. MVP roadmap

## Phase 1 — Core shell
- Windows shell
- MAVLink/open-drone adapter
- connection/session handling
- map
- telemetry
- mission runtime

## Phase 2 — Reference app
- Cirro Inspect
- mission generation
- route preview
- live run
- session save/export

## Phase 3 — Developer surface
- app manifest
- packaging flow
- runtime APIs
- default/composable UI support

## Phase 4 — Private ecosystem test
- 1–2 external developer apps
- capability validation
- degraded-mode handling
- app install/update flow

## Phase 5 — DJI design prep
- formal adapter interface
- mission-schema constraints for future DJI support
- mobile/mission-style adapter planning

---

## 20. One-sentence MVP summary

**Cirro MVP is a free Windows-based drone shell with a shared mission/runtime layer and one first-party inspection app, designed to prove that users will install drone apps and developers can build them without rebuilding the drone integration stack each time.**
