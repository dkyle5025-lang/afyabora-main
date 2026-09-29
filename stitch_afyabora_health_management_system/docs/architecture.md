# AfyaBora — System Architecture

## High-level
- Reverse proxy: Nginx
- Application: Node.js + Express
- View layer: EJS (server-side) + REST API (JSON)
- Database: MySQL (centralized)
- Authentication: Sessions + secure cookies, optional token endpoints for API
- Audit: Dedicated `audit_logs` table

## Deployment
- Dockerized Node and MySQL services
- Nginx as TLS terminator and request router
- Backups to encrypted object storage

## API
- Versioned under `/api/v1/`
- Resource examples: `/patients`, `/triage`, `/referrals`, `/hospitals`, `/audit`

## Notes
Design for RBAC and hospital-scoped queries. Align data exchange with HL7 FHIR resources when preparing external integrations.

*Next: map endpoints to controllers and services.*