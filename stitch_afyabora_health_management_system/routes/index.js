const express = require('express');
const { assessTriageWithAI } = require('../services/triageAi');
const router = express.Router();

// Home -> redirect to dashboard for now
router.get('/', (req, res) => {
  return res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login', username: '', activePage: 'login' });
});

router.post('/login', (req, res) => {
  // Dummy login: set session user and redirect
  req.session.user = { name: req.body.username || 'Clinician', role: 'User' };
  res.redirect('/dashboard');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

router.get('/dashboard', (req, res) => {
  const totals = { totalPatients: 1284, todaysTriage: 56, referrals: 18, waiting: 31 };
  const recentPatients = [
    { id: 'PT-8823', name: 'Eleanor Rigby', status: 'Critical', statusClass: 'bg-red-100 text-red-700', statusDotClass: 'bg-red-500', arrival: '10:14 AM', visitUuid: 'v-1' },
    { id: 'PT-8824', name: 'Marcus Johnson', status: 'Urgent', statusClass: 'bg-yellow-100 text-yellow-700', statusDotClass: 'bg-yellow-500', arrival: '10:22 AM', visitUuid: 'v-2' },
  ];
  const staffOnDuty = [
    { initials: 'DR', name: 'Dr. Reynolds', role: 'ER Attending', statusDot: 'bg-green-500' },
    { initials: 'RN', name: 'Nurse Thompson', role: 'Triage Lead', statusDot: 'bg-green-500' },
  ];
  res.render('dashboard', { title: 'Dashboard', user: req.session.user, activePage: 'dashboard', totals, recentPatients, staffOnDuty });
});

router.get('/new-intake', (req, res) => {
  return res.redirect('/triage');
});

router.get('/patients/search', (req, res) => {
  const q = req.query.q || '';
  const patients = [
    { id: 'AFB-001', name: 'John Doe', gender: 'M', phone: '+254 712 345678', dob: '15 May 1980', age: 43, hospital: 'Nairobi General' },
    { id: 'AFB-042', name: 'Jane Smith', gender: 'F', phone: '+254 722 987654', dob: '22 Aug 1992', age: 31, hospital: 'Mombasa Referral' },
  ];
  res.render('patient_search', { title: 'Patient Search', q, recent: ['AFB-8921 (Odinga)', 'AFB-7734 (Mwangi)'], patients, start: 1, end: patients.length, total: patients.length, activePage: 'patients' });
});

router.get('/patients/:id', (req, res) => {
  const patient = {
    id: req.params.id,
    name: 'John Doe',
    gender: 'M',
    age: 43,
    dob: '15 May 1980',
    phone: '+254 712 345678',
    hospital: 'Nairobi General Hospital',
    condition: 'Stable, under review',
    lastVisit: 'Today, 09:35 AM',
    triageLevel: 'Urgent',
  };
  res.render('patient_detail', { title: 'Patient Details', patient, user: req.session.user, activePage: 'patients' });
});

router.get('/triage', (req, res) => {
  const patient = { name: 'John Doe', mrn: 'AFB-001' };
  const triage = {
    chiefComplaint: req.session.triage?.chiefComplaint || '',
    temp: req.session.triage?.temp || '',
    bp: req.session.triage?.bp || '',
    pulse: req.session.triage?.pulse || '',
    resp: req.session.triage?.resp || '',
    spo2: req.session.triage?.spo2 || '',
    symptoms: req.session.triage?.symptoms || '',
    diagnosis: req.session.triage?.diagnosis || '',
    triageCategory: req.session.triage?.triageCategory || '',
    aiAssessment: req.session.triage?.aiAssessment || null,
  };
  res.render('triage', { title: 'Triage', patient, triage, activePage: 'triage' });
});

router.post('/triage', async (req, res) => {
  const triageData = {
    chiefComplaint: req.body.chiefComplaint || '',
    temp: req.body.temp || '',
    bp: req.body.bp || '',
    pulse: req.body.pulse || '',
    resp: req.body.resp || '',
    spo2: req.body.spo2 || '',
    symptoms: req.body.symptoms || '',
    diagnosis: req.body.diagnosis || '',
    triageCategory: req.body.triageCategory || ''
  };

  const aiAssessment = await assessTriageWithAI(triageData);
  triageData.aiAssessment = aiAssessment;

  req.session.triage = triageData;

  res.redirect('/triage');
});

router.get('/referrals', (req, res) => {
  const referrals = [
    { id: 'REF-101', patient: 'Eleanor Rigby', specialty: 'Cardiology', status: 'Pending', urgency: 'Critical' },
    { id: 'REF-102', patient: 'Marcus Johnson', specialty: 'Orthopedics', status: 'Accepted', urgency: 'Urgent' },
    { id: 'REF-103', patient: 'Grace Akinyi', specialty: 'Pediatrics', status: 'In Transit', urgency: 'Routine' }
  ];
  res.render('referrals', { title: 'Referrals', user: req.session.user, referrals, activePage: 'referrals' });
});

router.get('/settings', (req, res) => {
  res.render('settings', { title: 'Settings', user: req.session.user, activePage: 'settings' });
});

router.get('/support', (req, res) => {
  res.render('support', { title: 'Support', user: req.session.user, activePage: 'support' });
});

router.get('/profile', (req, res) => {
  const user = req.session.user || {
    name: 'Clinician',
    role: 'User',
    email: 'clinician@afyabora.health',
    phone: '+254 712 000 000',
    department: 'Emergency Care',
    shift: 'Morning / 08:00-16:00'
  };
  res.render('profile', { title: 'Profile', user, activePage: 'profile' });
});

router.post('/profile', (req, res) => {
  const updatedUser = {
    name: req.body.name || 'Clinician',
    role: req.body.role || 'User',
    email: req.body.email || 'clinician@afyabora.health',
    phone: req.body.phone || '+254 712 000 000',
    department: req.body.department || 'Emergency Care',
    shift: req.body.shift || 'Morning / 08:00-16:00'
  };

  req.session.user = updatedUser;
  res.redirect('/profile');
});

module.exports = router;
