# AfyaBora — ERD (conceptual)

## Core entities
- `hospitals` (hospital_uuid PK)
- `users` (user_uuid PK) belongs to hospital
- `roles` and `permissions` for RBAC
- `patients` (patient_uuid PK)
- `patient_identifiers` (links national IDs / other systems)
- `visits` (visit_uuid PK) linked to patient and hospital
- `triage_assessments` linked to visit
- `referrals` linking from_visit / to_hospital and status
- `audit_logs` for every important action

## Relationship notes
- `patients` is a longitudinal identity (not per-hospital)
- `visits` are hospital-scoped
- `referrals` reference `visits` / `patients` and target a receiving hospital

*Use a diagramming tool (draw.io / mermaid) to create visual ERD next.*