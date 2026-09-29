# AfyaBora — Use Cases

## UC-1: Register Patient
- Actors: Receptionist
- Preconditions: Authenticated, hospital selected
- Main Flow:
  1. Receptionist opens "Register Patient" form
  2. Enters demographics and contact
  3. System generates global `patient_uuid`
  4. System saves patient and returns confirmation
- Postconditions: Patient created, audit log recorded

## UC-2: Search Patient
- Actors: Receptionist, Nurse, Doctor
- Preconditions: Authenticated
- Main Flow:
  1. User searches by UUID/name/phone/ID
  2. System returns matching patients filtered by authorization
- Postconditions: Search logged

## UC-3: Record Triage
- Actors: Triage Officer, Nurse
- Preconditions: Authenticated, patient exists
- Main Flow:
  1. Open triage form for visit
  2. Enter vitals and category
  3. Save triage assessment
  4. System assigns priority (protocol-driven) and logs action
- Postconditions: Triage stored, visit updated, audit entry

## UC-4: Create Referral
- Actors: Doctor, Nurse
- Preconditions: Authenticated, patient exists
- Main Flow:
  1. Create referral specifying receiving hospital and summary
  2. Attach triage/notes as allowed
  3. Send referral; system records referral status and audit
- Postconditions: Referral recorded and notification sent

## UC-5: Accept Referral
- Actors: Receiving hospital clinician
- Preconditions: Authenticated, referral present
- Main Flow:
  1. Review referral details
  2. Accept or reject
  3. If accept, create local visit record and link to patient UUID
- Postconditions: Referral status updated, audit logged

*Add sequence diagrams and BPMN flows as next step.*