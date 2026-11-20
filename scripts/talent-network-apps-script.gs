/**
 * AGS talent network → private Google Sheet.
 * Receives sign-ups from https://aureusglobalsystems.com/careers and appends one row per candidate.
 * A repeat sign-up with the same email updates that candidate's row instead of adding a duplicate.
 *
 * Setup (once):
 *  1. Create a Google Sheet named "AGS Talent Network" (in the AGS Google account, not a personal one).
 *  2. Extensions → Apps Script. Replace everything with this file. Save.
 *  3. Deploy → New deployment → type "Web app".
 *     Execute as: Me.  Who has access: Anyone.  → Deploy → authorise → copy the Web app URL.
 *  4. Send the URL (ends in /exec) to be added to the website.
 * The sheet itself stays private: "Anyone" only means anyone can POST a sign-up, not read the sheet.
 */
const SHEET_NAME = 'Candidates';
const COLUMNS = [
  'Received', 'Name', 'Email', 'Phone', 'LinkedIn', 'Resume', 'Level', 'Cloud', 'Databricks experience', 'Databricks cert', 'Years', 'Skills',
  'Available from', 'Looking for', 'Current status', 'Expected rate', 'Location', 'Notes', 'Consent',
  'Source', 'Landing page', 'Bench status', 'Internal notes',
];
const FIELD = {
  Name: 'name', Email: 'email', Phone: 'phone', LinkedIn: 'linkedin', Resume: 'resume', Level: 'level',
  Cloud: 'cloud', 'Databricks experience': 'databricks', 'Databricks cert': 'cert', Years: 'years', Skills: 'skills', 'Available from': 'availability', 'Looking for': 'commitment',
  'Current status': 'status', 'Expected rate': 'rate', Location: 'location', Notes: 'notes', Consent: 'consent',
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    if (d._gotcha) return ok_();                         // spam honeypot
    if (!d.email || !d.name || d.consent !== 'Yes') return ok_();

    const sheet = sheet_();
    const clean = (v) => String(v == null ? '' : v).slice(0, 2000).replace(/^[=+\-@]/, "'$&"); // no formula injection
    const source = [d.utm_source || d.first_referrer || d.referrer || 'direct', d.utm_campaign].filter(String).join(' / ');
    const row = COLUMNS.map((c) => {
      if (c === 'Received') return new Date();
      if (c === 'Source') return clean(source);
      if (c === 'Landing page') return clean(d.landing_page || d.first_landing || '');
      if (c === 'Bench status') return 'New';
      if (c === 'Internal notes') return '';
      return clean(d[FIELD[c]]);
    });

    const emails = sheet.getRange(2, 3, Math.max(sheet.getLastRow() - 1, 1), 1).getValues().map((r) => String(r[0]).toLowerCase());
    const i = emails.indexOf(String(d.email).toLowerCase());
    if (i >= 0) {
      const r = i + 2;
      const keep = sheet.getRange(r, COLUMNS.indexOf('Bench status') + 1, 1, 2).getValues()[0]; // keep your notes
      row[COLUMNS.indexOf('Bench status')] = keep[0] || 'New';
      row[COLUMNS.indexOf('Internal notes')] = keep[1];
      sheet.getRange(r, 1, 1, row.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }
    return ok_();
  } finally {
    lock.releaseLock();
  }
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(COLUMNS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold').setBackground('#111111').setFontColor('#ffffff');
    const statuses = SpreadsheetApp.newDataValidation()
      .requireValueInList(['New', 'Screened', 'Shortlisted', 'Submitted to client', 'Placed', 'Not a fit'], true).build();
    sh.getRange(2, COLUMNS.indexOf('Bench status') + 1, 1000, 1).setDataValidation(statuses);
    sh.setFrozenColumns(2);
  }
  return sh;
}

function ok_() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
