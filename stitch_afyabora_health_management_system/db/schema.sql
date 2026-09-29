

CREATE TABLE hospitals (
  hospital_uuid CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE roles (
  role_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
) ENGINE=InnoDB;

CREATE TABLE users (
  user_uuid CHAR(36) PRIMARY KEY,
  hospital_uuid CHAR(36) NOT NULL,
  username VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  display_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (hospital_uuid) REFERENCES hospitals(hospital_uuid),
  FOREIGN KEY (role_id) REFERENCES roles(role_id)
) ENGINE=InnoDB;

CREATE TABLE patients (
  patient_uuid CHAR(36) PRIMARY KEY,
  given_name VARCHAR(150),
  family_name VARCHAR(150),
  date_of_birth DATE,
  gender VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE patient_identifiers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_uuid CHAR(36) NOT NULL,
  identifier_type VARCHAR(50),
  identifier_value VARCHAR(255),
  issuing_authority VARCHAR(255),
  UNIQUE(patient_uuid, identifier_type, identifier_value),
  FOREIGN KEY (patient_uuid) REFERENCES patients(patient_uuid)
) ENGINE=InnoDB;

CREATE TABLE visits (
  visit_uuid CHAR(36) PRIMARY KEY,
  patient_uuid CHAR(36) NOT NULL,
  hospital_uuid CHAR(36) NOT NULL,
  arrival_time DATETIME,
  created_by CHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_uuid) REFERENCES patients(patient_uuid),
  FOREIGN KEY (hospital_uuid) REFERENCES hospitals(hospital_uuid)
) ENGINE=InnoDB;

CREATE TABLE triage_assessments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  visit_uuid CHAR(36) NOT NULL,
  recorded_by CHAR(36),
  triage_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  temperature DECIMAL(4,1),
  pulse INT,
  respiratory_rate INT,
  systolic INT,
  diastolic INT,
  spo2 INT,
  consciousness_level VARCHAR(100),
  triage_category VARCHAR(50),
  notes TEXT,
  FOREIGN KEY (visit_uuid) REFERENCES visits(visit_uuid)
) ENGINE=InnoDB;

CREATE TABLE referrals (
  referral_uuid CHAR(36) PRIMARY KEY,
  patient_uuid CHAR(36) NOT NULL,
  from_hospital CHAR(36) NOT NULL,
  to_hospital CHAR(36) NOT NULL,
  from_visit CHAR(36),
  reason TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_by CHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_uuid) REFERENCES patients(patient_uuid),
  FOREIGN KEY (from_hospital) REFERENCES hospitals(hospital_uuid),
  FOREIGN KEY (to_hospital) REFERENCES hospitals(hospital_uuid)
) ENGINE=InnoDB;

CREATE TABLE audit_logs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_uuid CHAR(36),
  hospital_uuid CHAR(36),
  action VARCHAR(100) NOT NULL,
  object_type VARCHAR(100),
  object_id VARCHAR(255),
  details JSON,
  ip_address VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

