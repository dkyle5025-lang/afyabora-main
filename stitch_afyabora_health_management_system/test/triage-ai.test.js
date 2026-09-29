const test = require('node:test');
const assert = require('node:assert/strict');

const { assessTriageData } = require('../services/triageAi');

test('critical patient data is classified as red', () => {
  const result = assessTriageData({
    chiefComplaint: 'Chest pain and shortness of breath',
    symptoms: 'Patient is confused, cyanotic, and has severe difficulty breathing',
    temp: '39.5',
    bp: '82/50',
    pulse: '130',
    resp: '30',
    spo2: '82'
  });

  assert.equal(result.level, 'red');
  assert.match(result.summary, /critical|immediate|urgent/i);
});

test('stable patient data is classified as green', () => {
  const result = assessTriageData({
    chiefComplaint: 'Mild fever and sore throat',
    symptoms: 'Patient reports mild cough and no breathing issues',
    temp: '37.5',
    bp: '118/76',
    pulse: '78',
    resp: '18',
    spo2: '98'
  });

  assert.equal(result.level, 'green');
  assert.match(result.summary, /stable|routine/i);
});

test('diagnosis text is included in the triage assessment', () => {
  const result = assessTriageData({
    chiefComplaint: 'Abdominal pain',
    diagnosis: 'Acute myocardial infarction with shock',
    symptoms: 'Patient is pale, hypotensive, and severely distressed',
    temp: '36.8',
    bp: '80/50',
    pulse: '128',
    resp: '26',
    spo2: '90'
  });

  assert.equal(result.level, 'red');
  assert.match(result.summary, /critical|immediate|emergency/i);
});
