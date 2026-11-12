// Case studies — shared by /case-studies, /case-studies/[slug] and the service pages.

export type CaseStudy = {
  slug: string;
  /** slug from lib/services-nav.ts */
  service: string;
  category: string;
  tag: string;
  tagColor: string;
  client: string;
  industry: string;
  duration: string;
  title: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  tech: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    category: 'Databricks', tag: 'Databricks Migration', tagColor: '#ff3366',
    client: 'Global Retail Chain', industry: 'Retail', duration: '90 days',
    slug: 'databricks-lakehouse-migration-retail', service: 'databricks-consulting',
    title: 'From Data Swamp to Lakehouse in 90 Days',
    challenge: "A 500-store retail chain was running a legacy Hadoop cluster built in 2016. Processing 10TB of daily transaction data took 14 hours. Overnight batch jobs failed 3× per week.",
    solution: 'We designed a Databricks Lakehouse with Delta Lake medallion architecture. Built Kafka → Spark Streaming pipelines for real-time transaction processing and Unity Catalog for governance.',
    outcomes: ['47× faster query performance (14h → 18min)', '99.9% pipeline uptime (from 85%)', '$2.1M annual infrastructure savings', 'Real-time inventory dashboards for 500 stores'],
    tech: ['Databricks', 'Delta Lake', 'Kafka', 'Apache Spark', 'Unity Catalog', 'Power BI'],
  },
  {
    category: 'Snowflake', tag: 'Snowflake Consulting', tagColor: '#29B5E8',
    client: 'FinTech Platform', industry: 'Financial Services', duration: '4 months',
    slug: 'snowflake-fintech-500m-transactions', service: 'snowflake-consulting',
    title: 'Snowflake at Scale — 500M Daily Transactions',
    challenge: 'A fast-growing payments platform was scaling from 10M to 500M daily transactions. Their Redshift warehouse ran at 95% capacity, costing $180K/month.',
    solution: 'Redesigned with Data Vault 2.0 in Snowflake, dbt for all transformations, zero-copy cloning for 6 dev/test environments, and multi-cluster warehouse configuration.',
    outcomes: ['68% reduction in costs ($180K → $58K/month)', '12× faster data delivery', 'Zero downtime during 90-day migration', '6 isolated dev environments at no extra cost'],
    tech: ['Snowflake', 'dbt', 'Airflow', 'Python', 'Fivetran', 'Tableau'],
  },
  {
    category: 'Analytics', tag: 'Analytics & BI', tagColor: '#00d4aa',
    client: 'Healthcare Network', industry: 'Healthcare', duration: '6 months',
    slug: 'healthcare-analytics-semantic-layer', service: 'analytics-bi-consulting',
    title: 'One Source of Truth for 120 Hospitals',
    challenge: '120 hospitals each defined "patient wait time" differently. Leadership was making decisions on Excel reports that contradicted each other.',
    solution: 'Built a unified Azure Synapse platform with a certified semantic layer, standardized KPI definitions, Power BI Premium with role-based access, and trained 50+ analysts.',
    outcomes: ['Single dashboard trusted by 5,000+ users', '3-day to 3-hour reporting cycle', 'Standardized KPIs across 120 hospitals', '$840K annual savings from manual reporting'],
    tech: ['Azure Synapse', 'Power BI Premium', 'Azure Data Factory', 'dbt'],
  },
  {
    category: 'Databricks', tag: 'Databricks Migration', tagColor: '#ff3366',
    client: 'Manufacturing Conglomerate', industry: 'Manufacturing', duration: '5 months',
    slug: 'databricks-iot-streaming-manufacturing', service: 'databricks-consulting',
    title: 'IoT Data Platform for 10,000 Machines',
    challenge: 'Sensor data from 10,000 factory machines was being dropped because the pipeline couldn\'t handle 2M events/second. Unplanned downtime cost $4M per year.',
    solution: 'Built a Databricks + Kafka streaming platform ingesting 2M events/second. Delta Live Tables for quality, MLflow for predictive maintenance, real-time anomaly detection.',
    outcomes: ['2M events/second with 0% data loss', '65% reduction in unplanned downtime', '$2.6M annual savings from prevented failures', '18-month ROI achieved in 4 months'],
    tech: ['Databricks', 'Delta Live Tables', 'Kafka', 'MLflow', 'Azure IoT Hub'],
  },
  {
    category: 'Snowflake', tag: 'Snowflake Consulting', tagColor: '#29B5E8',
    client: 'E-Commerce Platform', industry: 'E-Commerce', duration: '3 months',
    slug: 'snowflake-self-service-analytics-ecommerce', service: 'snowflake-consulting',
    title: 'Self-Service Analytics for 200 Business Users',
    challenge: 'A $500M e-commerce company had a 3-person data team and 200 business users who needed data. Every report was a manual 2-week queue.',
    solution: 'Built a Snowflake platform with dbt, a certified semantic layer in Cube, Power BI Premium for self-service, automated data quality checks, and a data catalog.',
    outcomes: ['200 users self-serve their own data daily', '2-week queue → real-time', 'Data team freed for strategic work', '94% data accuracy (from 71%)'],
    tech: ['Snowflake', 'dbt', 'Cube', 'Power BI', 'Great Expectations', 'Airflow'],
  },
  {
    category: 'Analytics', tag: 'Staff Augmentation', tagColor: '#ffd700',
    client: 'Insurance Provider', industry: 'Insurance', duration: '6 months',
    slug: 'staff-augmentation-insurance-platform', service: 'data-engineering-staff-augmentation',
    title: '3 Senior Engineers. 6 Months. Platform Rebuilt.',
    challenge: 'A regional insurance provider lost 3 senior engineers. Delivery was stalled on a critical customer analytics project with a hard regulatory deadline.',
    solution: 'Embedded 3 Aureus senior engineers. Completed the platform on time, migrated 40 legacy ETL jobs to Airflow, and upskilled the existing 5-person team.',
    outcomes: ['Critical regulatory deadline met', '40 legacy ETL jobs modernized', '3 engineers certified in new stack', 'Zero delivery gaps during engagement'],
    tech: ['Azure Data Factory', 'Airflow', 'dbt', 'Azure Synapse', 'Power BI'],
  },
  {
    category: 'AI/ML', tag: 'AI & ML Engineering', tagColor: '#8b5cf6',
    client: 'D2C Retail Brand', industry: 'Retail / E-Commerce', duration: '4 months',
    slug: 'ml-demand-forecasting-d2c-retail', service: 'ai-ml-engineering',
    title: 'ML Forecasting That Recovered $2.4M in Lost Revenue',
    challenge: 'A fast-growing D2C brand with 800 SKUs was making inventory decisions manually. Stockouts cost $3.2M in lost revenue the previous year. Their Excel-based forecast ran monthly and hit 67% accuracy — not good enough at their scale.',
    solution: 'Built an ML demand-forecasting platform on Databricks: an ensemble model combining gradient boosting with external signals — promotions, weather, social trends. MLflow tracked every experiment. Predictions refreshed daily and fed directly into their Snowflake inventory system via automated pipelines.',
    outcomes: ['Forecast accuracy improved from 67% → 91%', 'Stockout rate reduced by 74%', '$2.4M recovered revenue in first 6 months', 'Inventory holding costs down 28%'],
    tech: ['Databricks', 'MLflow', 'Mosaic AI', 'Snowflake', 'Python', 'LightGBM', 'FastAPI'],
  },
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
export const caseStudiesForService = (service: string) => caseStudies.filter((c) => c.service === service);
