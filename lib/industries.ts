// Page copy for each industry landing page (/industries/[slug]).
// Also used for metadata and JSON-LD (FAQPage).
// Rules: no invented statistics, clients, results, certifications or partner status.
// Compliance lists name the regulations a platform must respect; AGS designs to support them,
// it does not claim certification.

import type { IndustryContent } from '@/lib/industry-types';

export const industries: IndustryContent[] = [
  // ───────────────────────────────────────────────────────────────
  // 1. Banking & Financial Services
  // ───────────────────────────────────────────────────────────────
  {
    slug: 'banking-financial-services',
    name: 'Banking & Financial Services',
    accent: '#3366ff',
    icon: '◈',
    seo: {
      title: 'Data Engineering for Banks: AI in Banking & Financial Services',
      description:
        'Data engineering for banks: governed lakehouse platforms, real-time fraud and risk pipelines, regulatory reporting and AI in banking, built for audit.',
      keywords: [
        'data engineering for banks',
        'AI in banking and financial services',
        'fintech data platform',
        'banking data platform',
        'financial services data engineering',
        'fraud detection machine learning',
        'credit risk analytics',
        'regulatory reporting data pipeline',
        'Databricks for financial services',
        'Snowflake for banking',
      ],
    },
    answer:
      'Data engineering for banks means building governed, auditable platforms that turn core banking, card, payments and market data into reliable reporting, risk models and AI. Aureus Global Systems (AGS) designs and delivers these platforms on Databricks and Snowflake, from real-time fraud pipelines to regulatory reporting and LLM assistants, as a delivered project or by embedding senior engineers in your team.',
    hero: {
      line1: 'Data & AI for',
      line2: 'Banking & Finance.',
      intro:
        'Banks, NBFCs, insurers and fintechs run on data that is regulated, sensitive and spread across decades of systems. We build the data platforms and AI underneath risk, fraud, customer analytics and regulatory reporting, with lineage, access control and auditability designed in from the first table.',
    },
    challenges: [
      {
        title: 'Core systems that do not talk to each other',
        body: 'Core banking, cards, loans, treasury and CRM each hold a different version of the customer. Reconciling them is a monthly spreadsheet exercise, and every new report starts with another extract.',
      },
      {
        title: 'Regulatory reporting built on manual steps',
        body: 'Returns and disclosures depend on hand-maintained SQL, shared drives and a few people who know the logic. When the regulator asks how a number was derived, nobody can show the lineage quickly.',
      },
      {
        title: 'Fraud and risk models running on yesterday’s data',
        body: 'Batch pipelines feed models that need to score transactions in seconds. By the time the data lands, the money has moved, and the model is retrained on features that no longer match production.',
      },
      {
        title: 'AI pilots that stall at the risk committee',
        body: 'GenAI and ML proofs of concept look good in a notebook, then stop at model risk review because there is no versioning, no explainability, no access controls and no audit trail around them.',
      },
    ],
    useCases: [
      {
        title: 'Real-time fraud detection pipelines',
        body: 'Streaming ingestion of card, UPI and payment events into feature pipelines that score transactions with ML models in near real time, with features shared consistently between training and serving.',
        service: 'ai-ml-engineering',
      },
      {
        title: 'Governed banking lakehouse',
        body: 'A medallion lakehouse that consolidates core banking, loans, cards and CRM data, with Unity Catalog access controls, column masking for PII and end-to-end lineage for every reported figure.',
        service: 'databricks-consulting',
      },
      {
        title: 'Regulatory and risk reporting automation',
        body: 'Replace manual extracts with tested, version-controlled pipelines for regulatory returns, credit risk and liquidity reporting, so every number traces back to its source records.',
        service: 'snowflake-consulting',
      },
      {
        title: 'Customer 360 and credit analytics',
        body: 'A single customer view across products and channels feeding cross-sell, churn and credit decisioning models, plus dashboards relationship managers and risk teams actually use.',
        service: 'analytics-bi-consulting',
      },
      {
        title: 'Private LLM assistants for policy and operations',
        body: 'Retrieval-augmented assistants over credit policies, product documents and operations manuals, served on self-hosted open models so sensitive data stays inside your network.',
        service: 'ai-inference-engineering',
      },
      {
        title: 'Senior engineers for your data team',
        body: 'Embed experienced data, platform and ML engineers into your existing team to clear a migration backlog, stand up a new platform or take ownership of critical pipelines.',
        service: 'data-engineering-staff-augmentation',
      },
    ],
    compliance: [
      'RBI data localisation and IT governance directions',
      'SEBI cybersecurity and cyber resilience framework',
      'DPDP Act 2023',
      'PCI DSS',
      'GDPR',
      'SOX',
      'Basel III / BCBS 239',
      'ISO 27001',
    ],
    caseStudyIndustries: ['Financial Services', 'Insurance'],
    faqs: [
      {
        q: 'What does a data & AI partner do for a banking or financial services company?',
        a: 'A data & AI partner designs, builds and runs the platforms behind reporting, risk, fraud and customer analytics. For banks and fintechs that usually means consolidating core systems into a governed lakehouse or warehouse, building reliable batch and streaming pipelines, putting ML and LLM applications into production with proper controls, and delivering dashboards business teams trust.',
      },
      {
        q: 'How do you handle compliance and data privacy in financial services?',
        a: 'We design platforms to support the regulations that apply to you, such as RBI data localisation, SEBI cyber resilience requirements, PCI DSS, the DPDP Act 2023, GDPR and SOX. In practice that means data residency in the right cloud region, fine-grained access control, PII masking and tokenisation, encryption, audit logging and full lineage from source to report. Your compliance team remains the owner of certification.',
      },
      {
        q: 'Can you build real-time fraud detection?',
        a: 'Yes. We build streaming pipelines from payment and transaction sources into feature stores and ML models that score events in near real time, with the same feature logic used for training and serving, model monitoring for drift, and alerting into your existing case management tools.',
      },
      {
        q: 'Can we use LLMs on sensitive banking data?',
        a: 'Yes, with the right architecture. We build retrieval-augmented applications with access controls applied at retrieval time, and where data cannot leave your environment we deploy open-weight models on your own infrastructure, so prompts and documents never go to a third-party API.',
      },
      {
        q: 'Can we start with a project or hire AGS engineers into our team?',
        a: 'Both. You can hand us a defined outcome, such as a lakehouse migration or a regulatory reporting pipeline, as a managed project, or embed senior AGS data and ML engineers into your own team to work in your tools and sprints. Many clients start with one model and move to the other later.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // 2. Retail & E-Commerce
  // ───────────────────────────────────────────────────────────────
  {
    slug: 'retail-ecommerce',
    name: 'Retail & E-Commerce',
    accent: '#ff6b35',
    icon: '◆',
    seo: {
      title: 'Retail Data Analytics & AI: Demand Forecasting, Customer 360',
      description:
        'Retail data analytics and AI for retail and e-commerce: demand forecasting, customer 360, personalization and inventory analytics on a modern data platform.',
      keywords: [
        'retail data analytics',
        'demand forecasting',
        'customer 360',
        'personalization engine',
        'e-commerce data platform',
        'AI in retail',
        'retail data engineering',
        'inventory optimization analytics',
        'recommendation system',
        'Databricks for retail',
      ],
    },
    answer:
      'Retail data analytics turns sales, inventory, web, app and loyalty data into forecasts, customer insight and personalization. Aureus Global Systems (AGS) builds the data platforms and AI behind it on Databricks and Snowflake: demand forecasting, customer 360, recommendation engines and BI for merchandising and marketing teams, delivered as a project or by senior engineers joining your team.',
    hero: {
      line1: 'Data & AI for',
      line2: 'Retail & E-Commerce.',
      intro:
        'Retailers and e-commerce brands generate more data than almost any other sector, across stores, marketplaces, apps, warehouses and ad platforms. We build the platforms that unify it and the models that act on it: forecasts, customer 360, personalization and the analytics merchandising teams rely on every morning.',
    },
    challenges: [
      {
        title: 'Customer data split across every channel',
        body: 'Store POS, web, app, marketplaces and loyalty each identify customers differently. Without identity resolution, marketing targets fragments and nobody knows the real value of a customer.',
      },
      {
        title: 'Forecasts that live in spreadsheets',
        body: 'Demand planning relies on last year’s numbers plus judgement. Promotions, seasonality, new stores and stockouts are not modelled, so you carry excess stock in one place and run out in another.',
      },
      {
        title: 'Personalization that is not personal',
        body: 'Recommendations are rule-based or bought as a black box, trained on partial data and impossible to tune. Clickstream sits in one tool and orders in another, so the model never sees the full picture.',
      },
      {
        title: 'Reports that disagree on revenue',
        body: 'Finance, marketing and e-commerce each have their own definition of net sales, returns and margin. Every weekly trading meeting starts with an argument about whose dashboard is right.',
      },
    ],
    useCases: [
      {
        title: 'Demand forecasting at SKU and store level',
        body: 'ML forecasting models that account for seasonality, promotions, pricing, holidays and stockouts, running on a governed feature pipeline and feeding replenishment and allocation decisions.',
        service: 'ai-ml-engineering',
      },
      {
        title: 'Customer 360 and identity resolution',
        body: 'Unify POS, e-commerce, app, CRM and loyalty data into one customer profile with deterministic and probabilistic matching, ready for segmentation, CLV and churn models.',
        service: 'databricks-consulting',
      },
      {
        title: 'Personalization and recommendations',
        body: 'Recommendation and ranking models built on clickstream, catalogue and order history, with embeddings for similar-product search and real-time serving behind your site and app.',
        service: 'ai-inference-engineering',
      },
      {
        title: 'Trading and merchandising dashboards',
        body: 'A semantic layer with one agreed definition of sales, margin, returns and availability, surfaced in Power BI or Tableau dashboards that trading and category teams use daily.',
        service: 'analytics-bi-consulting',
      },
      {
        title: 'Unified retail data warehouse',
        body: 'Ingest marketplace, ad platform, ERP, WMS and POS data into Snowflake with tested dbt models, so analysts and data scientists work from the same trusted tables.',
        service: 'snowflake-consulting',
      },
      {
        title: 'Engineers for peak-season delivery',
        body: 'Add senior data and ML engineers to your team ahead of a replatform, a peak trading season or a new market launch, without a long hiring cycle.',
        service: 'data-engineering-staff-augmentation',
      },
    ],
    compliance: ['DPDP Act 2023', 'GDPR', 'CCPA / CPRA', 'PCI DSS', 'ISO 27001'],
    caseStudyIndustries: ['Retail', 'E-Commerce', 'Retail / E-Commerce'],
    faqs: [
      {
        q: 'What does a data & AI partner do for a retail or e-commerce company?',
        a: 'A data & AI partner builds the platform that unifies store, online, marketplace and supply chain data, then the models and analytics that use it: demand forecasting, customer 360, personalization, pricing and inventory analytics, and the dashboards trading teams rely on. The goal is one trusted source of truth and AI that runs in production, not in a slide deck.',
      },
      {
        q: 'How do you handle customer data privacy in retail?',
        a: 'We design platforms to support the privacy rules that apply to you, such as the DPDP Act 2023, GDPR and CCPA, and PCI DSS for payment data. That includes consent-aware pipelines, PII masking and pseudonymisation, role-based access, data retention controls and the ability to locate and delete a customer’s data on request.',
      },
      {
        q: 'How does ML demand forecasting improve on spreadsheet planning?',
        a: 'ML forecasting models learn from many signals at once, including seasonality, promotions, price changes, holidays, weather and stockout history, at SKU and location level. They retrain automatically as new sales arrive and give planners a forecast with an uncertainty range, which they can still adjust with their own judgement.',
      },
      {
        q: 'Should we buy a personalization tool or build our own?',
        a: 'It depends on your scale and data. Packaged tools are quick to start but limited by the data you can feed them. Building on your own platform gives you full control over features, ranking logic and experiments. We can help with either, including feeding a packaged tool clean customer and product data.',
      },
      {
        q: 'Can we start with a project or hire AGS engineers into our team?',
        a: 'Both. You can give us a defined outcome, such as a customer 360 build or a forecasting model, as a managed project, or embed senior AGS data and ML engineers in your own team for a replatform or peak season. Many clients start with one model and switch later.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // 3. Healthcare & Life Sciences
  // ───────────────────────────────────────────────────────────────
  {
    slug: 'healthcare-life-sciences',
    name: 'Healthcare & Life Sciences',
    accent: '#00d4aa',
    icon: '◎',
    seo: {
      title: 'Healthcare Data Platform & Analytics: AI in Healthcare at Scale',
      description:
        'Healthcare data platforms and analytics for providers, payers and pharma: FHIR-based integration, clinical and operational analytics, and AI built for privacy.',
      keywords: [
        'healthcare data platform',
        'healthcare analytics',
        'AI in healthcare',
        'healthcare data engineering',
        'HL7 FHIR data integration',
        'clinical data analytics',
        'life sciences data platform',
        'HIPAA compliant data platform',
        'healthcare lakehouse',
        'real-world evidence data',
      ],
    },
    answer:
      'A healthcare data platform integrates clinical, claims, operational and research data into one governed, privacy-controlled foundation for analytics and AI. Aureus Global Systems (AGS) builds these platforms on Databricks and Snowflake, with HL7 FHIR integration, de-identification, clinical and operational analytics and production AI, either as a delivered project or by embedding senior engineers in your team.',
    hero: {
      line1: 'Data & AI for',
      line2: 'Healthcare.',
      intro:
        'Hospitals, payers, diagnostics, pharma and health-tech companies hold some of the most valuable and most sensitive data there is. We build the platforms that integrate it safely and the analytics and AI that put it to work, with privacy, access control and auditability designed in rather than added later.',
    },
    challenges: [
      {
        title: 'Clinical data locked in disconnected systems',
        body: 'EHR, LIS, PACS, billing and claims systems each speak a different format. Getting a complete view of a patient or a care pathway means manual exports and custom interfaces that break on every upgrade.',
      },
      {
        title: 'Privacy rules that slow every project',
        body: 'Every new analytics or AI idea triggers a long review because nobody can say exactly where PHI flows, who can see it and how it is de-identified. The safe answer becomes no.',
      },
      {
        title: 'Analytics that lag operations',
        body: 'Bed occupancy, OT utilisation, turnaround times and claims denials are reported weeks after the fact, when they need to drive decisions on the same shift.',
      },
      {
        title: 'AI that cannot pass validation',
        body: 'Models built on unversioned data with no lineage cannot be reproduced, explained or validated, which stops them reaching clinical or regulated use.',
      },
    ],
    useCases: [
      {
        title: 'FHIR-based clinical data integration',
        body: 'Ingest HL7 v2, FHIR and claims feeds into a governed lakehouse, normalise them to a common model and expose clean patient, encounter and observation tables for analytics.',
        service: 'databricks-consulting',
      },
      {
        title: 'Operational and clinical analytics',
        body: 'Dashboards for occupancy, length of stay, turnaround times, readmissions and revenue cycle, built on a semantic layer so every department reports the same numbers.',
        service: 'analytics-bi-consulting',
      },
      {
        title: 'Predictive models for care and operations',
        body: 'Readmission risk, no-show prediction, demand forecasting and claims denial models, with versioned data, reproducible training and monitoring once they are in production.',
        service: 'ai-ml-engineering',
      },
      {
        title: 'Private LLMs for clinical documents',
        body: 'Summarisation, coding assistance and search over clinical notes and research documents using open-weight models hosted in your environment, so PHI never reaches a public API.',
        service: 'ai-inference-engineering',
      },
      {
        title: 'De-identified research and RWE datasets',
        body: 'Pipelines that de-identify and tokenise patient data and publish governed datasets for research, real-world evidence and data sharing with partners through secure sharing.',
        service: 'snowflake-consulting',
      },
      {
        title: 'Specialist engineers for health-tech teams',
        body: 'Embed senior data engineers familiar with healthcare data standards into your team to build integrations, scale a platform or prepare data for regulated AI.',
        service: 'data-engineering-staff-augmentation',
      },
    ],
    compliance: [
      'HIPAA',
      'HL7 FHIR',
      'DPDP Act 2023',
      'ABDM (Ayushman Bharat Digital Mission) standards',
      'GDPR',
      'GxP / 21 CFR Part 11',
      'ISO 27001',
    ],
    caseStudyIndustries: ['Healthcare'],
    faqs: [
      {
        q: 'What does a data & AI partner do for a healthcare or life sciences company?',
        a: 'A data & AI partner integrates clinical, claims, operational and research data into a governed platform, then builds the analytics and AI on top: operational dashboards, predictive models for care and capacity, de-identified research datasets and LLM applications over clinical documents, all with privacy and auditability designed in.',
      },
      {
        q: 'How do you handle patient data privacy and healthcare compliance?',
        a: 'We design platforms to support the regulations and standards that apply to you, such as HIPAA, the DPDP Act 2023, GDPR, ABDM standards and GxP / 21 CFR Part 11 for regulated life sciences work. That means PHI classification, de-identification and tokenisation, fine-grained access control, encryption, audit logs and lineage. Certification and validation remain owned by your compliance and quality teams.',
      },
      {
        q: 'Can you integrate HL7 and FHIR data?',
        a: 'Yes. We build pipelines that ingest HL7 v2 messages, FHIR resources and claims files, map them to a common data model and land them in a governed lakehouse or warehouse, so analysts and data scientists work with clean, consistent clinical tables instead of raw messages.',
      },
      {
        q: 'Can we use generative AI on clinical data safely?',
        a: 'Yes, with the right controls. We deploy open-weight LLMs inside your own cloud or data centre, apply access control at retrieval time, log every prompt and response for audit, and keep a human in the loop for any output that affects care or regulated decisions.',
      },
      {
        q: 'Can we start with a project or hire AGS engineers into our team?',
        a: 'Both. You can hand us a defined outcome, such as a FHIR integration or an analytics platform, as a managed project, or embed senior AGS data and ML engineers directly in your team. Many clients start with one model and move to the other as the work grows.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────
  // 4. Manufacturing
  // ───────────────────────────────────────────────────────────────
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    accent: '#e6a800',
    icon: '◉',
    seo: {
      title: 'Manufacturing Data Analytics, IoT Data & Predictive Maintenance',
      description:
        'Manufacturing data analytics and AI: IoT data platforms for sensor data, predictive maintenance, quality analytics and OEE dashboards for the plant floor.',
      keywords: [
        'manufacturing data analytics',
        'IoT data platform',
        'predictive maintenance',
        'industrial data engineering',
        'AI in manufacturing',
        'OEE dashboard',
        'quality analytics manufacturing',
        'sensor data pipeline',
        'smart factory data platform',
        'Databricks for manufacturing',
      ],
    },
    answer:
      'Manufacturing data analytics connects machine, sensor, MES, ERP and quality data so plants can predict failures, improve yield and see OEE in real time. Aureus Global Systems (AGS) builds the IoT data platforms, streaming pipelines, predictive maintenance models and plant dashboards behind it, delivered as a project or by embedding senior data engineers in your team.',
    hero: {
      line1: 'Data & AI for',
      line2: 'Manufacturing.',
      intro:
        'Plants generate huge volumes of sensor and machine data, and most of it is never used. We build the IoT data platforms that capture it reliably, join it with MES, ERP and quality records, and turn it into predictive maintenance, quality analytics and OEE that operations teams can act on.',
    },
    challenges: [
      {
        title: 'OT and IT data that never meet',
        body: 'Historians, PLCs and SCADA sit on the plant network; ERP, MES and quality systems sit elsewhere. Without a bridge, nobody can link a sensor anomaly to the batch, order or defect it affected.',
      },
      {
        title: 'Sensor data at volumes legacy tools cannot handle',
        body: 'High-frequency time-series data overwhelms traditional warehouses, so it is downsampled, archived or simply dropped, along with the signals that would predict a failure.',
      },
      {
        title: 'Maintenance that is reactive or calendar-based',
        body: 'Machines are serviced on fixed schedules or after they break. Unplanned downtime is expensive, and over-maintenance wastes parts and labour on equipment that was fine.',
      },
      {
        title: 'Every plant measures differently',
        body: 'OEE, scrap and downtime reasons are defined differently by site and shift. Corporate cannot compare plants, and improvement programmes lack a reliable baseline.',
      },
    ],
    useCases: [
      {
        title: 'Predictive maintenance models',
        body: 'Anomaly detection and remaining-useful-life models trained on vibration, temperature, current and maintenance history, with alerts routed into your CMMS before a failure happens.',
        service: 'ai-ml-engineering',
      },
      {
        title: 'IoT and time-series data platform',
        body: 'Streaming ingestion from historians, OPC UA and MQTT into a lakehouse built for high-frequency time-series data, joined with MES, ERP and quality records under one governance layer.',
        service: 'databricks-consulting',
      },
      {
        title: 'OEE and production dashboards',
        body: 'Standardised OEE, downtime and scrap metrics across plants and lines, defined once in a semantic layer and delivered in near-real-time dashboards for plant and corporate teams.',
        service: 'analytics-bi-consulting',
      },
      {
        title: 'Quality and yield analytics',
        body: 'Link process parameters to inspection and defect data to find the root causes of scrap and rework, and flag drifting processes before they produce out-of-spec parts.',
        service: 'snowflake-consulting',
      },
      {
        title: 'Edge and on-premise AI inference',
        body: 'Deploy vision and language models close to the line or in your own data centre for visual inspection and maintenance assistants, with predictable latency and no dependency on public APIs.',
        service: 'ai-inference-engineering',
      },
      {
        title: 'Data engineers who understand OT data',
        body: 'Add senior engineers to your team who can work with historians, time-series data and plant systems to accelerate an Industry 4.0 programme.',
        service: 'data-engineering-staff-augmentation',
      },
    ],
    compliance: [
      'ISA-95',
      'IEC 62443',
      'ISO 27001',
      'ISO 9001 quality records',
      'DPDP Act 2023',
      'GDPR',
    ],
    caseStudyIndustries: ['Manufacturing'],
    faqs: [
      {
        q: 'What does a data & AI partner do for a manufacturing company?',
        a: 'A data & AI partner connects plant-floor data from sensors, historians and MES with ERP and quality systems on one platform, then builds what runs on it: predictive maintenance, quality and yield analytics, OEE dashboards and AI assistants for operations and maintenance teams.',
      },
      {
        q: 'How do you handle data security and compliance for plant data?',
        a: 'We design platforms to support the standards that apply to your operations, such as ISA-95 for system integration, IEC 62443 for industrial cybersecurity and ISO 27001, plus the DPDP Act 2023 and GDPR where personal data is involved. In practice that means one-way data flows out of the OT network, segmented access, encryption and audit logging, agreed with your OT security team.',
      },
      {
        q: 'What data do we need to start predictive maintenance?',
        a: 'Sensor history for the target equipment, such as vibration, temperature or current, plus maintenance and failure records so a model can learn what precedes a failure. If failure history is thin, we start with anomaly detection and build toward failure prediction as labelled events accumulate.',
      },
      {
        q: 'Can you work with our existing historians and MES?',
        a: 'Yes. We build ingestion from common historians, OPC UA and MQTT sources and MES databases into the cloud or an on-premise platform, without replacing the systems your plants already depend on.',
      },
      {
        q: 'Can we start with a project or hire AGS engineers into our team?',
        a: 'Both. You can hand us a defined outcome, such as a predictive maintenance pilot on one line or an IoT data platform, as a managed project, or embed senior AGS data and ML engineers in your team. Many clients start with a single plant and scale from there.',
      },
    ],
  },
];

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug);
