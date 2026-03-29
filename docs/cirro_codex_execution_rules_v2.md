# Cirro Codex Execution Rules v2

Paste this into Codex and keep it attached for every backend phase.

## Primary rule
Execute phases strictly in order.

Do not start a later phase until the current phase handoff file exists and ends with the required completion line.

## Permanent project rules
- Front end is frozen unless a tiny backend wiring change is unavoidable.
- Cirro is Windows-first, local-first, and MAVLink/open-drone first.
- MVP is not a full GCS clone.
- MVP does not implement DJI execution.
- Apps target Cirro APIs, mission schema, and capability model.
- Apps must not call MAVLink or MAVSDK directly.
- Prefer MAVSDK for high-level implementation.
- Use raw MAVLink only inside the adapter layer or protocol diagnostics.
- Prefer standard MAVLink messages and microservices over custom dialect work.
- Never claim PX4/ArduPilot compatibility that has not been proven by docs plus tests.

## Mandatory read order at the start of every phase
1. `/docs/product/cirro_mvp_spec.md`
2. `/docs/product/cirro_codex_master_brief.md`
3. `/docs/product/cirro_codex_phase_reference_pack.md`
4. `/docs/product/cirro_codex_execution_rules_v2.md`
5. relevant `/docs/phases/phase-(X-1)-handoff.md` if it exists

## Mandatory design-first workflow
Before editing code for a phase, Codex must create `/docs/phases/phase-X-design.md`.

That file must contain:
- phase scope
- explicit non-scope
- architecture / module boundaries
- state machines / interfaces
- files to change
- tests to add
- required reference docs
- assumptions
- risks

If the design doc reveals a missing prerequisite from an earlier phase, stop and complete that prerequisite first.

## Mandatory implementation workflow
While implementing a phase, Codex must:
- stay inside current phase scope
- add or update tests alongside code
- add structured logging for key transitions, failures, and degraded states
- document new public and cross-module interfaces
- keep temporary placeholders isolated behind typed interfaces
- update docs whenever an interface or schema changes
- avoid direct dependency leakage across layers

## Mandatory verification workflow
Before marking a phase complete, Codex must:
- run relevant unit tests
- run relevant simulator/system tests where required
- record exactly what was run
- record pass/fail status
- record known gaps
- create `/docs/phases/phase-X-handoff.md`

## Mandatory handoff format
Each handoff file must include:
- phase name
- summary of what was built
- interfaces added or changed
- files added or changed
- tests added
- tests run
- known gaps
- risks
- exact completion status

Required final line:
- `PHASE X COMPLETE`
or
- `PHASE X NOT COMPLETE`

## Completion gate
A phase is complete only if all are true:
- implementation matches phase scope
- required docs exist
- required tests exist
- relevant tests were run
- acceptance criteria are met or any remaining gaps are clearly documented
- handoff file exists
- final line states `PHASE X COMPLETE`

If any item is false, the phase is not complete.

## Phase gates

### Phase 0 gate
Do not start Phase 1 until:
- simulator scripts exist
- logging exists
- unit/system test structure exists
- at least one simulator smoke path exists

### Phase 1 gate
Do not start Phase 2 until:
- connection/session state machine exists
- heartbeat-driven detection works
- adapter boundary exists
- reconnect/disconnect handling is tested

### Phase 2 gate
Do not start Phase 3 until:
- mission schema is versioned
- capability model is versioned
- compatibility checker exists
- mission fixtures validate cleanly

### Phase 3 gate
Do not start Phase 4 until:
- runtime state machine exists
- preflight validation exists
- upload/start/pause/resume/abort exist
- safety ownership is in runtime, not app code

### Phase 4 gate
Do not start Phase 5 until:
- normalized telemetry exists
- local session persistence exists
- export format is documented
- camera/gimbal hooks route through runtime interfaces

### Phase 5 gate
Do not start Phase 6 until:
- reference app uses only Cirro APIs
- at least two realistic workflows run end-to-end in simulation
- no privileged bypasses remain

### Phase 6 gate
Do not start Phase 7 until:
- manifest exists
- install/update flow exists
- version compatibility rules exist
- sample packaged app runs through Cirro

### Phase 7 gate
Phase 7 must:
- harden compatibility claims with evidence
- document degraded-mode behavior explicitly
- produce DJI-prep constraints without implementing DJI execution

## Anti-patterns Codex must avoid
- skipping the design doc
- silently fixing earlier-phase gaps inside a later phase without documenting it
- building the developer/package flow before the runtime is proven
- putting raw MAVLink or MAVSDK calls into app code
- mixing protocol translation into UI code
- inventing unsupported compatibility claims
- building broad GCS features outside the MVP thesis
- hiding simulator or parity failures
- moving to the next phase because the current one feels “mostly done”

## Reference-doc handling rules
- put copied external snippets or snapshots in `/docs/reference/external/`
- when an official doc drives a key design decision, cite it inside the phase design doc
- GitHub repos are for source inspection and implementation confirmation
- official docs win over guesses and convenience
- MCP outputs are optional aids only; they do not override official docs

## Failure rules
If Codex cannot complete a phase, it must:
- stop at the current phase
- say exactly what is incomplete
- list the smallest next actions required
- leave the handoff file ending with `PHASE X NOT COMPLETE`

## Required self-check before asking to move on
At the end of each phase, Codex must answer:
1. Which acceptance criteria are fully met?
2. Which are only partially met?
3. What exact evidence supports phase completion?
4. What would break if the repo moved to the next phase now?
5. Should the project move to the next phase?

If the answer to item 5 is “yes”, it must still point to the handoff file as evidence.
