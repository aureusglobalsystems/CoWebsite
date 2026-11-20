// Content for /careers — the AGS consultant talent network (Databricks data engineers on Azure, AWS and GCP).
export const CAREERS_PATH = '/careers';
export const CAREERS_ACCENT = '#00a884';
/** Google Apps Script web-app URL that appends talent-network sign-ups to a private Google Sheet. */
export const LINKEDIN_URL = 'https://www.linkedin.com/company/aureusglobalsystemsllp/';
export const TALENT_SHEET_URL = process.env.NEXT_PUBLIC_TALENT_SHEET_URL ||
  'https://script.google.com/macros/s/AKfycbyocYwKYQYar2EMSJ-cEk3M2cxJDsleoo4b4DnUH-laUNGNKEXOf3T_Zr6QfNRUs5F9hg/exec';

export const LEVELS = [
  { value: 'Data Engineer', hint: '3–5 years' },
  { value: 'Senior Data Engineer', hint: '5–8 years' },
  { value: 'Lead Data Engineer', hint: '8–12 years' },
  { value: 'Solutions Architect', hint: '12+ years' },
];

export const CLOUDS = ['Azure', 'AWS', 'GCP'];

export const DATABRICKS_EXPERIENCE = [
  '3+ years in production',
  '1–3 years in production',
  'Under 1 year',
  'No hands-on Databricks yet',
];

export const DATABRICKS_CERTS = ['None', 'Data Engineer Associate', 'Data Engineer Professional', 'Other Databricks certification'];

export const SKILLS = [
  'PySpark', 'Spark SQL', 'Delta Lake', 'Unity Catalog', 'Lakeflow / DLT', 'Databricks Workflows',
  'Azure Data Factory', 'ADLS', 'Synapse / Fabric',
  'AWS Glue', 'S3', 'EMR', 'Redshift',
  'BigQuery', 'Dataflow', 'Cloud Composer',
  'Python', 'SQL', 'dbt', 'Airflow', 'Kafka', 'Snowflake', 'Terraform', 'CI/CD',
];

export const AVAILABILITY = ['Immediately', 'Within 2 weeks', 'Within 30 days', 'Within 60 days', 'Later / just exploring'];
export const COMMITMENT = ['Full-time contract (≈40 h/week)', 'Part-time contract', 'Either'];
export const STATUS = ['Independent / freelance', 'Employed, serving notice', 'Employed full-time', 'Between roles'];

export const CAREERS_STEPS = [
  { n: '01', title: 'Join the network', body: 'Tell us your level, cloud, Databricks experience, rate and availability. Two minutes, no CV formatting needed.' },
  { n: '02', title: 'We match', body: 'When a client project fits, we call you with the role, scope, duration and rate. Your profile never goes to a client without your OK.' },
  { n: '03', title: 'Meet the client', body: 'A technical conversation with the client team. We prepare you for it and handle every commercial detail.' },
  { n: '04', title: 'Work remotely', body: 'You work from anywhere as an independent consultant and invoice AGS monthly. We stay your point of contact throughout.' },
];

export const CAREERS_TRACKS = [
  { title: 'Data Engineer — Azure', body: 'Databricks on Azure with Data Factory, ADLS Gen2, Unity Catalog and Synapse or Fabric.' },
  { title: 'Data Engineer — AWS', body: 'Databricks on AWS with S3, Glue, EMR, Redshift, and orchestration with Workflows or Airflow.' },
  { title: 'Data Engineer — GCP', body: 'Databricks on GCP alongside BigQuery, Dataflow, Cloud Composer and Cloud Storage.' },
];

export const CAREERS_LEVELS = [
  { title: 'Data Engineer', body: 'Builds and maintains pipelines in PySpark and SQL on Databricks.' },
  { title: 'Senior Data Engineer', body: 'Owns pipelines end to end: design, performance, Delta Lake and data quality.' },
  { title: 'Lead Data Engineer', body: 'Leads a small team inside the client, reviews designs and sets standards.' },
  { title: 'Solutions Architect', body: 'Designs the lakehouse platform: migrations, Unity Catalog governance, security and cost.' },
];

export const CAREERS_FAQS = [
  {
    q: 'Is this a job opening?',
    a: 'It is our talent network. We work with clients who need Databricks data engineers for remote projects on Azure, AWS and GCP, and we contact network members when a project matches their level, cloud and availability.',
  },
  {
    q: 'Is Databricks experience required?',
    a: 'Yes. Every project we staff runs on Databricks, so hands-on production experience with PySpark, Delta Lake and Databricks on at least one cloud is essential. Databricks certifications help but are not required.',
  },
  {
    q: 'Are the roles fully remote?',
    a: 'Yes. All engagements are remote. Some clients ask for a few hours of overlap with US, UK or European working hours, which we tell you before anything is agreed.',
  },
  {
    q: 'Is this employment or a contract?',
    a: 'Engagements are independent consulting contracts. You invoice Aureus Global Systems monthly for approved hours or a fixed monthly fee and manage your own taxes. Contracts usually run from three to twelve months and are often extended.',
  },
  {
    q: 'How are rates decided?',
    a: 'You tell us your expected rate when you join. For each project we agree the rate with you before your profile is shared with the client, so there are no surprises.',
  },
  {
    q: 'Can I join while I am employed?',
    a: 'Yes, you can join the network at any time. Before we put you forward for a project, we confirm that you are available and that the work does not conflict with any current employment or contract.',
  },
  {
    q: 'What happens to my details?',
    a: 'We store them securely and use them only to match you with projects. We ask for your permission before sharing your profile with any client, and we delete your details whenever you ask through our contact page.',
  },
];
