// Content for /careers — the AGS consultant talent network (data & AI engineers; Databricks on Azure, AWS and GCP first).
export const CAREERS_PATH = '/careers';
export const CAREERS_ACCENT = '#00a884';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/aureusglobalsystemsllp/';
/** Google Apps Script web-app URL that appends talent-network sign-ups to a private Google Sheet. */
export const TALENT_SHEET_URL = process.env.NEXT_PUBLIC_TALENT_SHEET_URL ||
  'https://script.google.com/macros/s/AKfycbyocYwKYQYar2EMSJ-cEk3M2cxJDsleoo4b4DnUH-laUNGNKEXOf3T_Zr6QfNRUs5F9hg/exec';

export const LEVELS = [
  { value: 'Engineer', hint: 'about 3–5 years' },
  { value: 'Senior Engineer', hint: 'about 5–8 years' },
  { value: 'Lead', hint: 'about 8–12 years' },
  { value: 'Solutions Architect', hint: '12+ years' },
];

/** Primary specialism. Databricks and the three clouds come first — that is where most client demand is. */
export const SPECIALISMS = [
  'Databricks',
  'Azure data (ADF, Synapse, Fabric)',
  'AWS data (Glue, Redshift, EMR)',
  'GCP data (BigQuery, Dataflow)',
  'Snowflake & dbt',
  'Analytics & BI (Power BI, Tableau)',
  'AI / ML engineering',
  'Data platform & DevOps',
];

export const CLOUDS = ['Azure', 'AWS', 'GCP'];

export const DATABRICKS_EXPERIENCE = [
  '3+ years in production',
  '1–3 years in production',
  'Under 1 year',
  'No hands-on Databricks',
];

export const SKILLS = [
  'PySpark', 'Spark SQL', 'Delta Lake', 'Unity Catalog', 'Lakeflow / DLT', 'Databricks Workflows',
  'Azure Data Factory', 'ADLS', 'Synapse', 'Microsoft Fabric',
  'AWS Glue', 'S3', 'EMR', 'Redshift',
  'BigQuery', 'Dataflow', 'Cloud Composer',
  'Snowflake', 'dbt', 'Airflow', 'Kafka',
  'Power BI', 'Tableau', 'Looker',
  'MLflow', 'LLMs / RAG',
  'Python', 'SQL', 'Terraform', 'CI/CD',
];

export const AVAILABILITY = ['Immediately', 'Within 2 weeks', 'Within 30 days', 'Within 60 days', 'Later / just exploring'];
export const COMMITMENT = ['Full-time contract (≈40 h/week)', 'Part-time contract', 'Either'];
export const STATUS = ['Independent / freelance', 'Employed, serving notice', 'Employed full-time', 'Between roles'];

export const CAREERS_STEPS = [
  { n: '01', title: 'Join the network', body: 'Tell us your level, specialism, rate and availability. It takes about two minutes and no CV formatting is needed.' },
  { n: '02', title: 'We match', body: 'When a client project fits, we contact you with the role, scope, duration and rate. We share your profile with a client only after you agree.' },
  { n: '03', title: 'Meet the client', body: 'If the client is interested, you have a technical conversation with their team. We help you prepare and handle the commercial side.' },
  { n: '04', title: 'Work remotely', body: 'If selected, you sign an independent consulting agreement with AGS and invoice us monthly. We stay your point of contact.' },
];

/** Featured: where most demand is. */
export const CAREERS_TRACKS = [
  { title: 'Databricks on Azure', body: 'Databricks with Data Factory, ADLS Gen2, Unity Catalog and Synapse or Fabric.' },
  { title: 'Databricks on AWS', body: 'Databricks with S3, Glue, EMR and Redshift, orchestrated with Workflows or Airflow.' },
  { title: 'Databricks on GCP', body: 'Databricks alongside BigQuery, Dataflow, Cloud Composer and Cloud Storage.' },
];

/** Also staffed. */
export const CAREERS_MORE = [
  { title: 'Cloud data engineering', body: 'Native Azure, AWS or GCP pipelines and warehouses without Databricks.' },
  { title: 'Snowflake & dbt', body: 'Snowflake architecture, dbt models, performance and cost.' },
  { title: 'Analytics & BI', body: 'Semantic models and dashboards in Power BI, Tableau or Looker.' },
  { title: 'AI / ML engineering', body: 'MLflow, model deployment, and LLM and RAG applications on company data.' },
];

export const CAREERS_LEVELS = [
  { title: 'Engineer', body: 'Builds and maintains pipelines and models in Python, PySpark and SQL.' },
  { title: 'Senior Engineer', body: 'Owns pipelines end to end: design, performance, data quality and documentation.' },
  { title: 'Lead', body: 'Leads a small team inside the client, reviews designs and sets standards.' },
  { title: 'Solutions Architect', body: 'Designs the platform: migrations, governance, security and cost.' },
];

export const CAREERS_FAQS = [
  {
    q: 'Is this a job opening?',
    a: 'No. This is our talent network. Joining it is not a job application and not an offer of work. When a client project matches your level, skills and availability, we contact you about that specific role.',
  },
  {
    q: 'Do I need Databricks experience?',
    a: 'Not for every role. Most of our current demand is for Databricks on Azure, AWS and GCP, so that experience helps. We also staff Snowflake, native cloud data engineering, BI and AI/ML roles.',
  },
  {
    q: 'Are the roles remote?',
    a: 'We focus on remote engagements. Some clients ask for a few hours of overlap with US, UK or European working hours. We tell you about any such requirement before you agree to anything.',
  },
  {
    q: 'Is this employment or a contract?',
    a: 'Engagements are independent consulting contracts, not employment. If you are selected, you sign a written agreement with Aureus Global Systems LLP, invoice monthly and are responsible for your own taxes. The duration depends on the client project.',
  },
  {
    q: 'How are rates decided?',
    a: 'You tell us your expected rate when you join. For each project, we agree the rate with you in writing before we share your profile with the client.',
  },
  {
    q: 'Do you charge candidates anything?',
    a: 'No. AGS never charges any fee to join the network, to be shortlisted or to be placed. If anyone asks you for money in our name, do not pay; please report it to us through our contact page.',
  },
  {
    q: 'Can I join while I am employed?',
    a: 'Yes, you can join at any time. Before we put you forward for a project, you confirm that you are available and that the work does not conflict with your current employment or contracts.',
  },
  {
    q: 'What happens to my details?',
    a: 'We use them only to match you with projects, keep them in access-restricted systems, and share them with a client only after you agree for that role. You can ask to see, correct or delete them at any time through our contact page. We delete inactive profiles after 24 months.',
  },
];
