function parseNumber(value) {
  if (value === null || value === undefined || value === '') return null;
  const cleaned = String(value).replace(/[^0-9.\-]/g, '');
  if (!cleaned) return null;
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}

function assessTriageData(data = {}) {
  const complaint = String(data.chiefComplaint || '').toLowerCase();
  const symptoms = String(data.symptoms || '').toLowerCase();
  const diagnosis = String(data.diagnosis || '').toLowerCase();
  const combinedText = `${complaint} ${symptoms} ${diagnosis}`;

  const temp = parseNumber(data.temp);
  const bp = String(data.bp || '').trim();
  const pulse = parseNumber(data.pulse);
  const resp = parseNumber(data.resp);
  const spo2 = parseNumber(data.spo2);

  let score = 0;
  const findings = [];

  const criticalKeywords = [
    'chest pain', 'shortness of breath', 'difficulty breathing', 'cyanosis', 'unresponsive',
    'severe bleeding', 'shock', 'stroke', 'seizure', 'cardiac arrest', 'collapse', 'altered consciousness',
    'confused', 'fainting', 'loss of consciousness', 'severe trauma', 'hemorrhage', 'myocardial infarction',
    'acute respiratory distress', 'pulmonary embolism', 'septic shock', 'anaphylaxis', 'brain bleed', 'massive bleed'
  ];

  const highKeywords = [
    'severe pain', 'persistent vomiting', 'dehydration', 'dizziness', 'weakness', 'palpitations',
    'wheezing', 'burning', 'pneumonia', 'acute abdomen', 'abdominal pain', 'delirium', 'sepsis',
    'fracture', 'appendicitis', 'renal colic', 'infectious diarrhea'
  ];

  const moderateKeywords = [
    'mild pain', 'cough', 'sore throat', 'headache', 'fatigue', 'nausea', 'runny nose', 'mild fever',
    'viral illness', 'urinary tract infection', 'bronchitis', 'arthritis'
  ];

  const redMatches = criticalKeywords.filter((k) => combinedText.includes(k));
  if (redMatches.length) {
    score += 4 + redMatches.length;
    findings.push(...redMatches.map((k) => `critical cue: ${k}`));
  }

  const yellowMatches = highKeywords.filter((k) => combinedText.includes(k));
  if (yellowMatches.length) {
    score += 2 + yellowMatches.length;
    findings.push(...yellowMatches.map((k) => `high-priority cue: ${k}`));
  }

  const greenMatches = moderateKeywords.filter((k) => combinedText.includes(k));
  if (greenMatches.length) {
    score += 1;
    findings.push(...greenMatches.map((k) => `moderate symptom: ${k}`));
  }

  if (temp !== null) {
    if (temp >= 39.0 || temp <= 35.0) score += 2;
    if (temp >= 40.0 || temp <= 34.0) score += 2;
  }

  if (bp) {
    const systolic = Number(String(bp).split('/')[0]);
    if (systolic && systolic < 90) score += 3;
    if (systolic && systolic > 180) score += 1;
  }

  if (pulse !== null) {
    if (pulse < 50 || pulse > 120) score += 2;
    if (pulse < 40 || pulse > 140) score += 2;
  }

  if (resp !== null) {
    if (resp > 24) score += 2;
    if (resp > 30) score += 2;
  }

  if (spo2 !== null) {
    if (spo2 < 90) score += 3;
    if (spo2 >= 90 && spo2 < 94) score += 1;
  }

  let level = 'green';
  let summary = 'Stable patient. Routine clinical observation and monitoring recommended.';

  if (score >= 9 || redMatches.length > 0 || (spo2 !== null && spo2 < 90) || (bp && Number(String(bp).split('/')[0]) < 90)) {
    level = 'red';
    summary = 'Critical condition detected. Immediate clinical intervention and emergency escalation recommended.';
  } else if (score >= 5 || yellowMatches.length > 0 || (spo2 !== null && spo2 < 94) || (resp !== null && resp > 24)) {
    level = 'yellow';
    summary = 'Urgent assessment needed. High-risk symptoms or unstable vitals require closer monitoring and rapid review.';
  } else if (score >= 2 || greenMatches.length > 0) {
    level = 'green';
    summary = 'Stable patient. Routine care and continued observation are appropriate.';
  }

  return {
    level,
    score,
    summary,
    findings: findings.slice(0, 6)
  };
}

async function assessTriageWithAI(data = {}) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return assessTriageData(data);
  }

  try {
    const prompt = `You are a clinical triage assistant. Determine the acuity level using the provided patient data and return JSON with fields: level ('red','yellow','green'), summary, findings (string array), score (number). Patient information: ${JSON.stringify(data)}.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.2,
        messages: [
          { role: 'system', content: 'You are a clinical triage assistant. Return only valid JSON. Use red/yellow/green as the level.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI request failed: ${response.status}`);
    }

    const json = await response.json();
    const content = json.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('Empty AI response');
    }

    const parsed = JSON.parse(content);
    if (parsed.level && (parsed.level === 'red' || parsed.level === 'yellow' || parsed.level === 'green')) {
      return {
        level: parsed.level,
        summary: parsed.summary || 'AI triage assessment completed.',
        findings: Array.isArray(parsed.findings) ? parsed.findings.slice(0, 6) : [],
        score: Number(parsed.score) || 0,
        source: 'openai'
      };
    }
  } catch (error) {
    console.warn('AI triage API failed, using fallback logic:', error.message);
  }

  const fallback = assessTriageData(data);
  return { ...fallback, source: 'fallback' };
}

module.exports = {
  assessTriageData,
  assessTriageWithAI,
};
