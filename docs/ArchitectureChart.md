# Architecture Chart Spec

## Purpose
Represent the Cirro system architecture as a left-to-right flow diagram.

## Layout direction
Left to right.

## Primary node order
1. Drone
2. Remote Controller
3. Computer / Ground Station
4. Cirro Platform Software
5. Cloud Environment

## Node definitions

### 1. Drone
Description:
- Physical drone hardware
- Produces telemetry, video, GPS/status data
- Receives drone-specific commands

Key contents:
- flight systems
- camera/video
- telemetry
- GPS/status

### 2. Remote Controller
Description:
- Maintains pilot/control link with drone
- Connects physically to computer
- Passes data upstream and commands downstream

Key contents:
- pilot control link
- receives drone link
- passes data to computer
- passes commands back to drone

### 3. Computer / Ground Station
Description:
- Host machine used by operator
- Connected to remote controller by USB
- Runs Cirro locally

Key contents:
- host computer / GCS
- local runtime host
- USB connection endpoint

### 4. Cirro Platform Software
Description:
- Software layer running on the Computer / Ground Station
- Bridges local drone stack with cloud environment
- Standardises incoming drone-originated data
- Converts generic cloud instructions into drone-specific commands

Key responsibilities:
- ingest incoming drone data
- standardise telemetry/video/state into generic formats
- expose generic data/services to cloud-side apps and workflows
- map generic cloud instructions into drone-specific commands
- manage bidirectional bridge

### 5. Cloud Environment
Description:
- Generic cloud-side application and services environment
- Sends generic workflows/instructions to Cirro
- Receives standardised incoming data from Cirro

Key contents:
- apps
- APIs
- databases
- services
- payments
- socials
- workflows
- video editing
- cloud computation

## Connections

### Connection A
From: Drone
To: Remote Controller
Type: bidirectional
Transport: radio link
Label: radio link

### Connection B
From: Remote Controller
To: Computer / Ground Station
Type: bidirectional
Transport: USB
Label: USB

### Connection C
From: Computer / Ground Station
To: Cirro Platform Software
Type: containment
Label: runs Cirro locally

### Connection D
From: Cirro Platform Software
To: Cloud Environment
Type: bidirectional
Label forward:
- standardised telemetry
- standardised video/state
- generic data for cloud use
Label backward:
- generic app logic
- workflow instructions
- API/service requests

### Connection E
From: Cirro Platform Software
To: Drone
Path:
- Cirro Platform Software
- Computer / Ground Station
- Remote Controller
- Drone
Type: logical downstream command flow
Label:
- drone-specific commands

## Data flow rules

### Upstream flow
Direction:
Drone -> Remote Controller -> Computer / Ground Station -> Cirro Platform Software -> Cloud Environment

Meaning:
- raw drone telemetry/video/status originates at the drone
- data is passed through remote and computer
- Cirro standardises this incoming data
- cloud uses standardised/generic data

### Downstream flow
Direction:
Cloud Environment -> Cirro Platform Software -> Computer / Ground Station -> Remote Controller -> Drone

Meaning:
- cloud apps/workflows produce generic instructions
- Cirro translates those instructions into drone-specific commands
- commands are transmitted back through local control chain to drone

## Diagram intent
The diagram should communicate:
1. Cirro sits locally on the computer / ground station
2. Cirro is the bridge between cloud software and the physical drone stack
3. Incoming drone data is standardised before cloud use
4. Outgoing cloud instructions are generic until Cirro translates them into drone-specific commands

## Visual emphasis
- Left-to-right architecture
- Cirro should be visually distinct from the computer, but clearly shown as software running on it
- Cloud Environment should be a large grouped node containing all cloud subcomponents
- Bidirectional links should be shown for radio, USB, and cloud/Cirro interaction
- Highlight two conceptual lanes:
  - upstream standardised data lane
  - downstream drone-specific command lane

## Preferred output formats
Generate one or more of:
- Mermaid flowchart
- ASCII architecture diagram
- React/Tailwind architecture graphic
- SVG-friendly node/edge spec

## Recommended Mermaid structure
Use subgraphs for:
- Local Control Chain
- Cloud Environment

Place nodes in left-to-right order:
Drone --> Remote --> Computer --> Cirro --> Cloud

Also add reverse-labelled logical flows to indicate:
- standardised incoming data
- generic-to-drone-specific command translation