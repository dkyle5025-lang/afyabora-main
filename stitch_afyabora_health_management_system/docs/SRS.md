# AfyaBora — Software Requirements Specification (SRS)

## 1. Overview
AfyaBora is a centralized multi-hospital patient triage and referral system that enables authorized clinical staff to register patients, perform triage, create referrals, and transfer authorized records between hospitals while maintaining auditability and RBAC.

## 2. Scope
- Patient registration and search
- Triage assessments and vital signs
- Referral creation and acceptance between hospitals
- Role-based access control and hospital-level authorization
- Audit logging and secure authentication
- REST API for integrations (future) and FHIR alignment

## 3. Stakeholders
- Hospital staff: receptionists, triage officers, nurses, doctors, records officers
- Hospital administrators
- AfyaBora network administrators

## 4. Functional Requirements (selected)
- FR-1: Register a patient with a global UUID
- FR-2: Search patients by UUID, name, phone, national ID
- FR-3: Record triage assessments and vitals
- FR-4: Create and send referrals to another hospital
- FR-5: Accept/reject referrals with audit trail
- FR-6: RBAC enforced on every server-side request

## 5. Non-functional Requirements
- NFR-1: HTTPS everywhere
- NFR-2: Data retention and secure backups
- NFR-3: Response time & scalability for multi-hospital use
- NFR-4: Compliance with local health-data regulations

## 6. Security Requirements
- Password hashing, secure cookies, session expiration
- Prepared statements and input validation
- Audit logging for all CRUD and access events

## 7. Next steps
- Finalize detailed user stories and acceptance criteria
- Create sequence/use-case diagrams
- Produce ERD and SQL DDL


*Created as scaffold for Phase 1–4.*