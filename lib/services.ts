// Page copy for each service landing page (/services/[slug]).
// Rendered by components/service/ServicePage.tsx; also used for metadata and JSON-LD.
// Rules: no invented statistics, clients, partner status or results.

import type { ServiceContent } from '@/lib/service-types';

export const services: ServiceContent[] = [
  // ───────────────────────────────────────────────────────────────
  // 1. Databricks
  // ───────────────────────────────────────────────────────────────
  {
    slug: 'databricks-consulting',
    shape: 'lakehouse',
    contactOption: 'Databricks AI & Lakehouse',
    seo: {
      title: 'Databricks Consulting Services: Lakehouse Builds & Migration',
      description:
        "Databricks consulting services for lakehouse implementation and Databricks migration: medallion design, Unity Catalog, Lakeflow pipelines and Mosaic AI.",
      keywords: [
        'Databricks consulting services',
        'Databricks consulting partner',
        'Databricks consultants',
        'Databricks migration',
        'Hadoop to Databricks migration',
        'lakehouse implementation',
        'data lakehouse consulting',
        'Unity Catalog implementation',
        'Delta Lake medallion architecture',
        'Databricks cost optimization',
      ],
    },
    hero: {
      line1: 'Databricks',
      line2: 'Consulting.',
      tagline: 'The data foundation your AI actually needs.',
      highlight: 'Built right from day one.',
      intro:
        "Databricks consulting services for teams building a lakehouse or migrating onto one. We design and deliver Delta Lake medallion architectures, Unity Catalog governance, Lakeflow pipelines and Mosaic AI workspaces that hold up in production, not just in the demo.",
      cta: 'Book a Migration Review',
    },
    answer:
      "Databricks consulting is specialist help to design, build, migrate and optimize data and AI platforms on Databricks. Aureus Global Systems (AGS) helps teams implement lakehouse architectures with Delta Lake and Unity Catalog, migrate from Hadoop and legacy warehouses, build Lakeflow pipelines and set up Mosaic AI, either as a delivered project or by embedding senior Databricks engineers in your team.",
    problemsHeading: ['The platform is powerful.', 'The setup is the problem.'],
    problems: [
      {
        title: 'A lakehouse that became a swamp',
        body: "Tables dumped into storage with no layering, no contracts and no owners. Every new use case starts with a week of figuring out which copy of the data is the real one.",
      },
      {
        title: 'Governance bolted on too late',
        body: "Workspaces still on the legacy Hive metastore, permissions managed by hand, no lineage. Unity Catalog was meant to fix it, but migrating to it mid-flight feels risky, so nobody does.",
      },
      {
        title: 'DBU bills nobody can explain',
        body: "All-purpose clusters left running, jobs on oversized compute, no tagging or cost attribution. The platform gets blamed for spend that is really a configuration problem.",
      },
      {
        title: 'A migration stuck at 60 percent',
        body: "The Hadoop cluster or legacy warehouse is still running alongside Databricks because the last workloads are the hardest ones. You are paying for two platforms and trusting neither.",
      },
    ],
    offeringsHeading: ['One platform for data and AI.', 'Engineered to last.'],
    offerings: [
      {
        icon: '◈',
        title: 'Lakehouse Architecture & Implementation',
        body: "We design the lakehouse around how your data is actually used: Bronze, Silver and Gold layers with clear contracts, sensible table design and workspace topology that scales across teams.",
        points: ['Delta Lake medallion architecture', 'Liquid clustering and table layout design', 'Workspace, environment and CI/CD setup'],
      },
      {
        icon: '◇',
        title: 'Databricks Migration',
        body: "Moving from Hadoop, a legacy warehouse or self-managed Spark onto Databricks. We inventory every workload, sequence the migration, run old and new in parallel and reconcile the outputs before cutover.",
        points: ['Hadoop, Hive, Teradata, SQL Server and Synapse sources', 'Automated data reconciliation and validation', 'Phased cutover with a rollback path'],
      },
      {
        icon: '◆',
        title: 'Unity Catalog & Governance',
        body: "One governance layer across every workspace: catalogs, schemas, fine-grained access control, lineage and auditing. We also migrate existing Hive metastore tables into Unity Catalog without breaking downstream jobs.",
        points: ['Hive metastore to Unity Catalog migration', 'Row filters, column masks and attribute-based access', 'Lineage, audit logs and data discovery'],
      },
      {
        icon: '◎',
        title: 'Pipelines with Lakeflow',
        body: "Reliable batch and streaming ingestion and transformation using Lakeflow Declarative Pipelines (formerly Delta Live Tables), Lakeflow Connect and Jobs, with data quality expectations built in rather than checked after the fact.",
        points: ['Declarative pipelines with data quality expectations', 'Streaming ingestion from Kafka and CDC sources', 'Orchestration with Lakeflow Jobs or Airflow'],
      },
      {
        icon: '◉',
        title: 'Mosaic AI & ML Workspace',
        body: "The lakehouse is only half the point. We set up the AI side properly: MLflow tracking and registry in Unity Catalog, Model Serving, Vector Search and feature engineering on governed data.",
        points: ['MLflow experiment tracking and model registry', 'Mosaic AI Model Serving and Vector Search', 'Feature engineering on governed Delta tables'],
      },
      {
        icon: '❖',
        title: 'Performance & Cost Optimization',
        body: "We find where DBUs are going and why. Cluster policies, job compute and serverless where it fits, Photon, table optimization and tagging so spend can be attributed to teams and workloads.",
        points: ['Cluster policies and compute right-sizing', 'Serverless, Photon and query tuning', 'Cost tagging, system tables and budget alerts'],
      },
    ],
    steps: [
      { title: 'Assess', body: "We review your current platform, workloads, data volumes, governance model and spend, then write down what to keep, fix and migrate." },
      { title: 'Design', body: "We produce the target lakehouse architecture, Unity Catalog model and migration plan, sequenced by business value and risk." },
      { title: 'Build & Migrate', body: "We build pipelines and governance, migrate workloads in phases and reconcile every output against the old system before cutover." },
      { title: 'Hand Over', body: "We document everything, train your team and leave runbooks behind, or stay on as a managed team to keep improving the platform." },
    ],
    tech: [
      'Databricks', 'Delta Lake', 'Unity Catalog', 'Lakeflow', 'Delta Live Tables', 'Apache Spark', 'Photon',
      'Databricks SQL', 'Mosaic AI', 'MLflow', 'Vector Search', 'Kafka', 'Airflow', 'dbt', 'Terraform',
      'AWS', 'Azure', 'GCP',
    ],
    faqs: [
      {
        q: 'What is Databricks consulting?',
        a: "Databricks consulting is expert help to design, build and run data and AI platforms on Databricks. Databricks consulting services usually cover lakehouse architecture design, migration from legacy platforms, pipeline development, Unity Catalog governance, cost optimization and setting up Mosaic AI for machine learning. At AGS we take a platform from assessment through to production, then document it and train your team so you are not dependent on us.",
      },
      {
        q: 'How much does Databricks consulting cost?',
        a: "Cost depends on scope: the number of workloads to migrate, data volumes, governance requirements and how much of the build your own team will do. We work in three models: resource augmentation (our engineers in your team), a managed team that owns delivery, or a fixed-price project for well-defined migrations. Most engagements start with a short assessment so the estimate is based on your actual estate, not guesswork.",
      },
      {
        q: 'How long does a Databricks migration take?',
        a: "An assessment and migration plan usually takes two to four weeks. The migration itself depends on how many pipelines, tables and downstream consumers are involved; a focused migration can run in a few months, while a large Hadoop or enterprise warehouse estate is typically delivered in phases over a longer period.",
      },
      {
        q: 'What is a lakehouse implementation, and do we need one?',
        a: "A lakehouse combines low-cost open storage (Delta Lake) with warehouse-style performance and governance, so analytics, BI and machine learning run on the same data. You likely need one if you are maintaining a separate data lake and warehouse, copying data between them, or struggling to give ML teams access to governed data.",
      },
      {
        q: 'Should we migrate to Unity Catalog?',
        a: "Yes, for almost every Databricks customer. Unity Catalog is the governance foundation for current Databricks features, including fine-grained access control, lineage, system tables and Mosaic AI. We migrate Hive metastore tables, permissions and jobs in stages so production workloads keep running.",
      },
      {
        q: 'How do we choose a Databricks consulting partner?',
        a: "Look for engineers who have run migrations and production platforms, not just proofs of concept. Ask how they validate migrated data, how they handle Unity Catalog and cost governance, and what they leave behind at handover. If you already have a delivery lead and just need capacity, you can also hire senior Databricks engineers from AGS to work inside your team.",
      },
    ],
    leadMagnet: {
      title: 'Free Databricks Migration Readiness Review',
      body: "Send us an outline of your current platform and we will review it with you on a call: workload inventory, migration risks, Unity Catalog readiness and where your DBU spend is likely going. You get a written summary with a recommended migration sequence, with no obligation.",
      cta: 'Request the Review',
    },
  },

  // ───────────────────────────────────────────────────────────────
  // 2. AI & ML Engineering
  // ───────────────────────────────────────────────────────────────
  {
    slug: 'ai-ml-engineering',
    shape: 'neural',
    contactOption: 'AI & ML Engineering',
    seo: {
      title: 'AI/ML Engineering Services: RAG, LLM Apps & MLOps Consulting',
      description:
        "AI/ML engineering services that reach production: RAG development, LLM application development and MLOps consulting, built on your governed enterprise data.",
      keywords: [
        'AI/ML engineering services',
        'AI engineering services',
        'machine learning engineering services',
        'RAG development',
        'RAG development company',
        'LLM application development',
        'generative AI development services',
        'MLOps consulting',
        'LLM evaluation and guardrails',
        'enterprise AI consulting',
      ],
    },
    hero: {
      line1: 'AI & ML',
      line2: 'Engineering.',
      tagline: "AI that runs on your data,",
      highlight: "not someone else's assumptions.",
      intro:
        "AI/ML engineering services for teams that need AI in production, not another pilot. We build RAG pipelines, LLM applications and MLOps on governed data, using Mosaic AI, MLflow, LangChain, Azure OpenAI, AWS Bedrock and vector search.",
      cta: 'Book an AI Readiness Call',
    },
    answer:
      "AI/ML engineering is the work of taking machine learning models and LLM applications from prototype to reliable production systems. Aureus Global Systems (AGS) builds RAG pipelines, LLM applications and MLOps on governed enterprise data, using Mosaic AI, MLflow, Azure OpenAI and AWS Bedrock, with evaluation and monitoring built in. Teams can engage AGS for a full project or hire AI engineers directly.",
    problemsHeading: ['The demo works.', 'Production is the problem.'],
    problems: [
      {
        title: 'Pilots that never ship',
        body: "The proof of concept impressed everyone in a meeting. Six months later it is still a notebook, because nobody planned for security, data access, evaluation or who maintains it.",
      },
      {
        title: 'RAG that answers confidently and wrongly',
        body: "Poor chunking, stale indexes and no retrieval evaluation. The model is not the issue; the context it receives is. Users stop trusting it after the first bad answer.",
      },
      {
        title: 'Models trained on data nobody can reproduce',
        body: "No versioned datasets, no experiment tracking, no lineage. When a model degrades, nobody can say what changed or roll back with confidence.",
      },
      {
        title: 'No way to know if it is getting worse',
        body: "No evaluation sets, no drift monitoring, no guardrails. Quality issues surface through user complaints instead of alerts.",
      },
    ],
    offeringsHeading: ['Grounded in your data.', 'Built to be trusted.'],
    offerings: [
      {
        icon: '◆',
        title: 'RAG Development',
        body: "Retrieval-augmented generation grounded in your actual knowledge base: ingestion, chunking, embeddings, hybrid search and reranking, with access controls that respect who is allowed to see what.",
        points: ['Document parsing, chunking and embedding pipelines', 'Hybrid search and reranking', 'Permission-aware retrieval'],
      },
      {
        icon: '◇',
        title: 'LLM Application Development',
        body: "Internal assistants, intelligent search, document processing and agentic workflows connected to your systems through well-defined tools and APIs, not brittle prompt chains.",
        points: ['Azure OpenAI, AWS Bedrock, Gemini and open models', 'Tool calling and agent workflows', 'FastAPI services and app integration'],
      },
      {
        icon: '◈',
        title: 'Vector Search & Data Foundations',
        body: "The data layer AI depends on: clean, governed sources, incremental embedding pipelines that keep indexes fresh, and the right vector store for your scale and stack.",
        points: ['Databricks Vector Search, Pinecone, pgvector', 'Incremental index refresh from source changes', 'Unity Catalog governance for AI data'],
      },
      {
        icon: '◎',
        title: 'ML Model Development',
        body: "Classical ML and deep learning for forecasting, classification, recommendation and anomaly detection, trained on versioned datasets with every experiment tracked.",
        points: ['Feature engineering on governed data', 'MLflow experiment tracking and registry', 'Reproducible training pipelines'],
      },
      {
        icon: '◉',
        title: 'MLOps Consulting & Implementation',
        body: "The pipeline from notebook to production: automated training and deployment, model serving, monitoring and retraining triggers, so models keep working after launch.",
        points: ['CI/CD for models and prompts', 'Databricks Model Serving or FastAPI deployment', 'Drift detection and automated retraining'],
      },
      {
        icon: '❖',
        title: 'LLM Evaluation & Guardrails',
        body: "We build evaluation sets from your real questions and measure retrieval quality, answer accuracy and safety before every release, then keep measuring in production.",
        points: ['Task-specific evaluation datasets', 'Mosaic AI Agent Evaluation and LLM-as-judge', 'Input and output guardrails, tracing and logging'],
      },
    ],
    steps: [
      { title: 'Discover', body: "We pin down the use case, the data it needs, success criteria and constraints such as security, latency and cost." },
      { title: 'Prototype', body: "We build a working version on your real data with an evaluation set, so the decision to scale is based on measured quality." },
      { title: 'Productionize', body: "We add serving, access control, monitoring, guardrails and CI/CD, and integrate it with the systems your users already work in." },
      { title: 'Operate', body: "We hand over runbooks and evaluation tooling, or stay on to monitor quality, retrain models and extend the system." },
    ],
    tech: [
      'Mosaic AI', 'MLflow', 'Databricks Vector Search', 'LangChain', 'LangGraph', 'LlamaIndex',
      'Azure OpenAI', 'AWS Bedrock', 'Gemini', 'Llama', 'Pinecone', 'pgvector',
      'Python', 'PyTorch', 'scikit-learn', 'FastAPI', 'Docker', 'Kubernetes',
    ],
    faqs: [
      {
        q: 'What are AI/ML engineering services?',
        a: "AI/ML engineering services cover everything needed to put AI into production: data preparation, model or LLM selection, RAG and application development, deployment, monitoring and retraining. Our focus is the engineering around the model, because that is where most AI projects stall.",
      },
      {
        q: 'What is RAG development and when do we need it?',
        a: "RAG (retrieval-augmented generation) gives an LLM relevant passages from your own documents and data at query time, so answers are grounded in your content rather than the model's general training. You need it when users must get answers from internal knowledge such as policies, contracts, product documentation or support history.",
      },
      {
        q: 'How much does LLM application development cost?',
        a: "It depends on the number of data sources, security and access-control requirements, integration work and the quality bar you need to hit. Ongoing costs are driven by model usage, vector storage and hosting. We usually start with a scoped prototype and evaluation, then deliver the production build as a fixed-price project or through a managed team.",
      },
      {
        q: 'How do I choose an AI/ML engineering partner?',
        a: "Choose a partner that can show production systems, not just demos, and that treats data quality, evaluation and monitoring as part of the build. Check that they are model-agnostic: we work with Azure OpenAI, AWS Bedrock, Gemini and open models such as Llama and Mistral. You can engage AGS for a complete project or hire AI and ML engineers to join your own team.",
      },
      {
        q: 'What does MLOps consulting cover?',
        a: "MLOps consulting covers the processes and tooling that keep models reliable after launch: versioned data and experiments, automated training and deployment pipelines, model serving, monitoring for drift and quality, and retraining. We typically implement it with MLflow and Databricks, or with your existing cloud tooling.",
      },
      {
        q: 'How long does it take to get an AI use case into production?',
        a: "A prototype with an evaluation set usually takes two to six weeks. Production timelines depend mainly on data readiness, security review and integration work, which is why we assess the data foundation first.",
      },
    ],
    leadMagnet: {
      title: 'Free AI Use-Case & Data Readiness Assessment',
      body: "Bring one AI use case you are considering. We will review the data it depends on, the right architecture (RAG, fine-tuning or classical ML), the risks to production and how to measure success, and send you a written summary of what it would take.",
      cta: 'Book the Assessment',
    },
  },

  // ───────────────────────────────────────────────────────────────
  // 3. Snowflake
  // ───────────────────────────────────────────────────────────────
  {
    slug: 'snowflake-consulting',
    shape: 'snowflake',
    contactOption: 'Snowflake Consulting',
    seo: {
      title: 'Snowflake Consulting Services: Migration, dbt & Cost Optimization',
      description:
        "Snowflake consulting services: Snowflake migration, dbt modeling, Snowpark and Cortex, plus Snowflake cost optimization that keeps credit spend under control.",
      keywords: [
        'Snowflake consulting services',
        'Snowflake consultants',
        'Snowflake consulting partner',
        'Snowflake cost optimization',
        'Snowflake migration',
        'Teradata to Snowflake migration',
        'dbt consulting',
        'dbt Snowflake implementation',
        'Snowpark development',
        'Snowflake Cortex',
      ],
    },
    hero: {
      line1: 'Snowflake',
      line2: 'Consulting.',
      tagline: 'Scale without',
      highlight: 'the surprise bills.',
      intro:
        "Snowflake consulting services for teams migrating to Snowflake or trying to get spend under control. We design the architecture, build dbt transformation layers, move Python workloads to Snowpark and put cost governance in place from the start.",
      cta: 'Get a Cost Health Check',
    },
    answer:
      "Snowflake consulting is expert help to architect, migrate, model and optimize data platforms on Snowflake. Aureus Global Systems (AGS) designs Snowflake environments, migrates legacy warehouses, builds dbt transformation layers, moves Python workloads to Snowpark and reduces credit spend through warehouse sizing, query tuning and cost governance. AGS delivers fixed-scope projects or provides senior Snowflake and dbt engineers to your team.",
    problemsHeading: ['Snowflake is easy to start.', 'Running it well is not.'],
    problems: [
      {
        title: 'A credit bill that keeps climbing',
        body: "Warehouses sized too large, auto-suspend set too long, queries scanning entire tables. Snowflake bills for what you run, so inefficiency turns directly into cost.",
      },
      {
        title: 'Transformation logic nobody can follow',
        body: "Hundreds of stored procedures and scheduled tasks with no tests, no documentation and no lineage. Changing one model breaks three dashboards.",
      },
      {
        title: 'A migration that copied the old problems',
        body: "The legacy warehouse was lifted and shifted as-is. Same schemas, same workarounds, now on a consumption-priced platform that punishes them.",
      },
      {
        title: 'No owner for access and governance',
        body: "Roles granted ad hoc, sensitive columns unmasked, no tagging. Every audit turns into an investigation.",
      },
    ],
    offeringsHeading: ['Architected for scale.', 'Governed for cost.'],
    offerings: [
      {
        icon: '◇',
        title: 'Snowflake Architecture & Setup',
        body: "Account, database and warehouse design built around your workloads: environment separation, role hierarchy, workload isolation and infrastructure-as-code so it stays consistent.",
        points: ['Warehouse sizing and workload isolation', 'RBAC role hierarchy design', 'Terraform-managed account setup'],
      },
      {
        icon: '◈',
        title: 'Snowflake Migration',
        body: "Migration from Teradata, Oracle, SQL Server, Redshift or on-premise warehouses, redesigned for Snowflake rather than copied. We reconcile data and outputs before any system is switched off.",
        points: ['Schema and SQL conversion', 'Historical and incremental data loads', 'Parallel runs and output reconciliation'],
      },
      {
        icon: '◆',
        title: 'dbt Transformation Layer',
        body: "Transformation logic moved into dbt: modular models, tests, documentation and lineage under version control, deployed through CI/CD so changes are reviewed before they hit production.",
        points: ['Data Vault 2.0 or dimensional modeling', 'dbt tests, docs and lineage', 'CI/CD with slim builds and environments'],
      },
      {
        icon: '◎',
        title: 'Snowflake Cost Optimization',
        body: "We find where credits go using account usage data, then fix the causes: warehouse sizing, auto-suspend, clustering, query patterns and storage. Changes are measured before and after.",
        points: ['Warehouse right-sizing and auto-suspend tuning', 'Query profiling and expensive-query fixes', 'Resource monitors, budgets and cost attribution'],
      },
      {
        icon: '◉',
        title: 'Snowpark & Cortex AI',
        body: "Python, ML and AI workloads run inside Snowflake, next to the data. We migrate pandas and Spark jobs to Snowpark and build on Cortex AI functions and Cortex Search where they fit.",
        points: ['Snowpark Python pipelines and UDFs', 'Cortex AI functions and Cortex Search', 'Snowflake ML for model training and registry'],
      },
      {
        icon: '❖',
        title: 'Governance & Security',
        body: "Access and data protection you can explain to an auditor: masking and row access policies, object tagging, and zero-copy cloning so dev and test never touch raw production data.",
        points: ['Dynamic data masking and row access policies', 'Object tagging and access history', 'Zero-copy cloning for dev and test'],
      },
    ],
    steps: [
      { title: 'Assess', body: "We review your account usage, warehouse configuration, data models and pipelines to see where cost and complexity come from." },
      { title: 'Design', body: "We define the target architecture, modeling approach, dbt project structure and governance model, and plan the migration in phases." },
      { title: 'Build', body: "We implement the architecture, dbt layer and pipelines, migrate workloads and reconcile results against the source system." },
      { title: 'Optimize', body: "We tune warehouses and queries against real usage, set up cost monitoring, then hand over runbooks or stay on to keep improving." },
    ],
    tech: [
      'Snowflake', 'dbt', 'Snowpark', 'Cortex AI', 'Snowflake ML', 'Dynamic Tables', 'Snowpipe',
      'Python', 'SQL', 'Airflow', 'Fivetran', 'Kafka', 'Terraform', 'Data Vault 2.0',
      'AWS', 'Azure', 'GCP',
    ],
    faqs: [
      {
        q: 'What is Snowflake consulting?',
        a: "Snowflake consulting is expert help to design, migrate and optimize data platforms on Snowflake. Snowflake consulting services typically cover architecture and account setup, migration from legacy warehouses, data modeling, dbt transformation layers, Snowpark development, governance and cost optimization. We work from initial design through to a platform your team can run and extend.",
      },
      {
        q: 'How can we reduce our Snowflake costs?',
        a: "Most Snowflake cost optimization comes from a few places: right-sizing warehouses, shortening auto-suspend, separating workloads, fixing queries that scan more data than they need, and reviewing clustering and storage. Resource monitors and cost attribution then keep spend from drifting back. We base recommendations on your account usage data so every change can be measured.",
      },
      {
        q: 'How long does a Snowflake migration take?',
        a: "It depends on the number of objects, the amount of procedural SQL to convert and how many downstream reports and pipelines depend on the old system. An assessment and plan usually takes two to four weeks, and larger migrations are delivered in phases so value arrives before the final cutover.",
      },
      {
        q: 'How much does Snowflake consulting cost?',
        a: "Cost is driven by scope: migration size, modeling work, the number of pipelines and whether your team is building alongside us. We offer resource augmentation, a managed team, or a fixed-price project for well-defined work such as a migration or cost optimization engagement. We scope after an assessment so the estimate reflects your real environment.",
      },
      {
        q: 'Do we need dbt with Snowflake?',
        a: "You do not need it, but most teams benefit. dbt gives Snowflake transformations version control, testing, documentation and lineage, which makes them far easier to change safely. We implement dbt Core or dbt Cloud depending on your team and tooling.",
      },
      {
        q: 'How do I choose a Snowflake consulting partner?',
        a: "Look for a partner that has run Snowflake migrations and cost optimization on real accounts, uses dbt and CI/CD as standard, and can explain how it validates migrated data. It also helps if they know Databricks, so platform advice is not biased toward one tool. AGS can deliver a scoped project, or you can hire senior Snowflake and dbt engineers to work in your team.",
      },
    ],
    leadMagnet: {
      title: 'Free Snowflake Cost Health Check',
      body: "We review your Snowflake account usage with you: warehouse sizing, auto-suspend settings, your most expensive queries and storage patterns. You get a written list of specific, prioritized changes to reduce credit consumption, with no obligation.",
      cta: 'Request the Health Check',
    },
  },

  // ───────────────────────────────────────────────────────────────
  // 4. Analytics & BI
  // ───────────────────────────────────────────────────────────────
  {
    slug: 'analytics-bi-consulting',
    shape: 'bars',
    contactOption: 'Analytics & BI',
    seo: {
      title: 'Analytics & BI Consulting: Power BI, Tableau & Semantic Layer',
      description:
        "Analytics & BI consulting for Power BI and Tableau: governed semantic layers, certified metrics and dashboards your team trusts. Power BI and Tableau experts.",
      keywords: [
        'analytics and BI consulting',
        'BI consulting services',
        'Power BI consulting',
        'Power BI consultants',
        'Microsoft Fabric consulting',
        'Tableau consulting',
        'semantic layer',
        'dbt semantic layer',
        'dashboard development services',
        'self-service analytics',
      ],
    },
    hero: {
      line1: 'Analytics & BI',
      line2: 'Consulting.',
      tagline: 'Dashboards your team',
      highlight: 'will actually open.',
      intro:
        "Analytics & BI consulting that starts with trust in the numbers. We build the semantic layer first, with certified metrics in Power BI semantic models, dbt or Cube, then deliver Power BI and Tableau dashboards on governed data.",
      cta: 'Get a BI Health Check',
    },
    answer:
      "Analytics and BI consulting is help to design the data models, metrics and dashboards an organisation uses to make decisions. Aureus Global Systems (AGS) builds a governed semantic layer first, then delivers Power BI and Tableau dashboards on certified data, fixes slow or conflicting reports and enables self-service. AGS runs BI projects end to end or supplies experienced BI engineers to your team.",
    problemsHeading: ['The dashboards exist.', 'Nobody trusts them.'],
    problems: [
      {
        title: 'Three dashboards, three different numbers',
        body: "Revenue is defined differently in finance, sales and operations reports. Meetings turn into arguments about whose number is right instead of what to do about it.",
      },
      {
        title: 'Report sprawl',
        body: "Hundreds of reports, many duplicates, most unused. Nobody knows which ones are safe to retire, so they all keep refreshing and consuming capacity.",
      },
      {
        title: 'Slow reports on fragile models',
        body: "Huge flat imports, complex DAX or calculated fields doing work the data model should do, and refreshes that fail overnight. Users give up and export to Excel.",
      },
      {
        title: 'Self-service that turned into chaos',
        body: "Everyone was given access and a licence, but no governed datasets to build on. Every analyst rebuilt the same logic slightly differently.",
      },
    ],
    offeringsHeading: ['One version of the truth.', 'Then the dashboards.'],
    offerings: [
      {
        icon: '◉',
        title: 'Semantic Layer Design',
        body: "Business metrics defined once and reused everywhere. We design the semantic layer in the tool that fits your stack, so every report, notebook and AI assistant uses the same definitions.",
        points: ['Power BI semantic models', 'dbt Semantic Layer, Cube or AtScale', 'Certified metric definitions and ownership'],
      },
      {
        icon: '◇',
        title: 'Power BI Consulting',
        body: "Power BI built properly: star-schema models, efficient DAX, the right storage mode (Import, DirectQuery or Direct Lake) and deployment pipelines across development, test and production.",
        points: ['Power BI Premium and Microsoft Fabric capacity', 'Direct Lake, Import and DirectQuery modeling', 'Deployment pipelines and Git integration'],
      },
      {
        icon: '◈',
        title: 'Tableau Consulting',
        body: "Tableau deployments that perform and scale: published data sources, extract strategy, performance tuning and governed sites and projects on Tableau Cloud or Tableau Server.",
        points: ['Published, certified data sources', 'Workbook performance tuning', 'Site, project and permission design'],
      },
      {
        icon: '◆',
        title: 'Executive & Operational Dashboards',
        body: "Dashboards designed around the decisions they support, not every metric available. Clear hierarchy, consistent design and drill paths from executive summary to operational detail.",
        points: ['KPI and decision mapping workshops', 'Executive and operational reporting', 'Embedded analytics for applications'],
      },
      {
        icon: '◎',
        title: 'BI Governance & Report Rationalization',
        body: "We inventory what exists, identify duplicates and unused content, and consolidate onto certified datasets. Then we put workspace, access and release governance in place so sprawl does not return.",
        points: ['Usage-based report inventory', 'Certified and promoted content policies', 'Row-level security and access design'],
      },
      {
        icon: '❖',
        title: 'Self-Service Enablement & Adoption',
        body: "Self-service that works because analysts build on governed models. We train report builders and business users, and set up documentation, a data catalog and lineage so people can find what exists.",
        points: ['Role-based training for builders and consumers', 'Data catalog and lineage documentation', 'Adoption tracking and support model'],
      },
    ],
    steps: [
      { title: 'Audit', body: "We review your existing reports, data models, usage and metric definitions to find where trust and performance break down." },
      { title: 'Define', body: "We agree the core business metrics with their owners and design the semantic layer and data model that serves them." },
      { title: 'Build', body: "We build the semantic models and dashboards on governed data, with deployment pipelines and access controls in place." },
      { title: 'Adopt', body: "We train users, retire redundant reports and measure adoption, so the new dashboards replace the old ones rather than add to them." },
    ],
    tech: [
      'Power BI', 'Microsoft Fabric', 'Tableau', 'Looker', 'dbt Semantic Layer', 'Cube', 'AtScale',
      'DAX', 'SQL', 'Databricks SQL', 'Snowflake', 'Azure Synapse', 'Purview', 'Unity Catalog',
    ],
    faqs: [
      {
        q: 'What is analytics and BI consulting?',
        a: "Analytics and BI consulting is expert help with the data model, metric definitions, semantic layer, dashboard design, deployment and governance behind your reporting. It covers everything from model design to user adoption. Our approach starts with the semantic layer, because dashboards built on inconsistent definitions are rarely trusted however well they are designed.",
      },
      {
        q: 'What is a semantic layer, and why does it matter?',
        a: "A semantic layer is a governed set of business definitions, such as revenue, active customer or margin, that sits between your data and your reporting tools. It means every dashboard, analyst and AI assistant calculates a metric the same way. It is the single most effective fix for conflicting numbers across reports.",
      },
      {
        q: 'Power BI or Tableau: which should we choose?',
        a: "Power BI is usually the natural choice for organisations on Microsoft 365, Azure or Fabric, and is strong on governed semantic models. Tableau is valued for visual exploration and flexibility across data platforms. We work with both and recommend based on your stack, licensing and users rather than preference.",
      },
      {
        q: 'How much does Power BI consulting cost?',
        a: "Cost depends on the number of data sources, the complexity of the data model, how many reports need building or rationalizing, and whether licensing or capacity changes are involved. We offer fixed-price projects for defined builds, a managed team for ongoing BI delivery, or individual engineers embedded in your team.",
      },
      {
        q: 'Can you fix slow Power BI or Tableau reports?',
        a: "Usually, yes. Slow reports are most often caused by the data model rather than the visuals: oversized imports, missing star schemas, inefficient DAX or calculated fields, or the wrong storage mode. We profile the report, fix the model and query design, and confirm the improvement before and after.",
      },
      {
        q: 'How do I choose a Power BI or Tableau consulting partner?',
        a: "Choose a partner that starts with the data model and metric definitions, not the visuals, and that understands the platform underneath, whether Microsoft Fabric with Direct Lake, Databricks or Snowflake. Ask how they handle governance, deployment pipelines and adoption. AGS delivers BI projects end to end, or you can hire experienced Power BI and Tableau engineers to strengthen your own team.",
      },
    ],
    leadMagnet: {
      title: 'Free BI Health Check',
      body: "We review a sample of your Power BI or Tableau environment with you: data model design, refresh and performance issues, duplicated logic and conflicting metric definitions. You get a written summary of the highest-impact fixes, with no obligation.",
      cta: 'Request the Health Check',
    },
  },

  // ───────────────────────────────────────────────────────────────
  // 5. Staff Augmentation
  // ───────────────────────────────────────────────────────────────
  {
    slug: 'data-engineering-staff-augmentation',
    shape: 'network',
    contactOption: 'Staff Augmentation',
    seo: {
      title: 'Data Engineering Staff Augmentation: Hire Senior Data Engineers',
      description:
        "Data engineering staff augmentation from India: hire senior Databricks, Snowflake and AI engineers, or a dedicated data engineering team, in your sprints.",
      keywords: [
        'data engineering staff augmentation',
        'data engineer staff augmentation',
        'hire data engineers',
        'hire Databricks engineers',
        'hire Snowflake engineers',
        'hire Databricks developers',
        'dedicated data engineering team India',
        'offshore data engineering team',
        'data engineering outsourcing India',
        'contract data engineers',
      ],
    },
    hero: {
      line1: 'Data Engineering',
      line2: 'Staff Augmentation.',
      tagline: 'Senior talent. Zero ramp-up.',
      highlight: 'When you need it.',
      intro:
        "Data engineering staff augmentation for teams that need senior hands now. We embed Databricks, Snowflake, dbt, Airflow and AI engineers from our India delivery team directly into your squads, working in your tools, your sprints and your Slack.",
      cta: 'Talk About Your Team',
    },
    answer:
      "Data engineering staff augmentation is adding external data engineers to your team to close skill or capacity gaps without permanent hiring. Aureus Global Systems (AGS) embeds senior Databricks, Snowflake, dbt, Airflow and AI engineers from its India delivery team into your squads, working in your tools and sprints, or provides a dedicated data engineering team or managed delivery for a defined scope.",
    problemsHeading: ['The roadmap is ready.', 'The team is not.'],
    problems: [
      {
        title: 'Hiring takes months you do not have',
        body: "Senior data engineers with real Databricks or Snowflake production experience are hard to find and slow to hire. Meanwhile, the roadmap slips quarter by quarter.",
      },
      {
        title: 'Contractors who need hand-holding',
        body: "Generalist contractors who need weeks to learn the platform and constant review once they do. Your senior engineers end up with less time, not more.",
      },
      {
        title: 'Outsourcing that becomes a black box',
        body: "Work handed to a vendor disappears for weeks and comes back undocumented. Nobody on your side can maintain it once the contract ends.",
      },
      {
        title: 'Spiky demand, fixed headcount',
        body: "A migration, a platform launch or an AI initiative needs extra capacity for a few months. Permanent hires are the wrong tool for a temporary peak.",
      },
    ],
    offeringsHeading: ['Senior engineers.', 'Embedded in your team.'],
    offerings: [
      {
        icon: '◎',
        title: 'Databricks Engineers',
        body: "Engineers experienced in lakehouse builds and migrations: Spark, Delta Lake, Lakeflow pipelines, Unity Catalog and performance tuning on production workloads.",
        points: ['PySpark and Spark SQL', 'Delta Lake, Lakeflow and Unity Catalog', 'Migration and cost optimization experience'],
      },
      {
        icon: '◇',
        title: 'Snowflake & dbt Engineers',
        body: "Analytics and data engineers who model, test and ship in Snowflake and dbt, with the habits that keep credit spend and code quality under control.",
        points: ['dbt modeling, tests and CI/CD', 'Snowpark and Snowflake performance tuning', 'Data Vault and dimensional modeling'],
      },
      {
        icon: '◆',
        title: 'AI & ML Engineers',
        body: "Engineers for RAG pipelines, LLM applications and MLOps, who understand the data foundations underneath and build systems that can be evaluated and maintained.",
        points: ['RAG and LLM application development', 'MLflow and Mosaic AI', 'Model serving and monitoring'],
      },
      {
        icon: '◈',
        title: 'Pipeline & Platform Engineers',
        body: "Engineers for ingestion, orchestration and infrastructure: building and operating the pipelines and cloud platform your analytics and AI depend on.",
        points: ['Airflow, Kafka and Fivetran', 'AWS, Azure and GCP data services', 'Terraform and CI/CD for data platforms'],
      },
      {
        icon: '◉',
        title: 'Dedicated Data Engineering Team',
        body: "A dedicated data engineering team from our India delivery centre, with a lead engineer and the mix of skills your roadmap needs, working as an extension of your organisation.",
        points: ['Team composition matched to your roadmap', 'Overlap hours with your time zone', 'Scale up or down as priorities change'],
      },
      {
        icon: '❖',
        title: 'Managed Delivery Option',
        body: "Prefer outcomes over headcount? We can own delivery of a defined scope with our own lead, and move between augmentation and a managed team as your needs change.",
        points: ['Weekly progress reporting to stakeholders', 'Documentation and knowledge transfer standards', 'Transition path to your permanent team'],
      },
    ],
    steps: [
      { title: 'Scope', body: "We discuss your stack, the work ahead, the seniority you need, working hours and how the engineers will fit into your team." },
      { title: 'Match', body: "We propose engineers whose experience fits your platform. You interview them and decide; nobody joins without your approval." },
      { title: 'Embed', body: "Engineers join your tools, ceremonies and communication channels and start contributing to your backlog under your direction." },
      { title: 'Scale', body: "We report progress weekly, adjust the team as priorities change and plan knowledge transfer well before any engagement ends." },
    ],
    tech: [
      'Databricks', 'Snowflake', 'dbt', 'Apache Spark', 'Airflow', 'Kafka', 'Fivetran',
      'Python', 'SQL', 'Mosaic AI', 'MLflow', 'Power BI', 'Terraform',
      'AWS', 'Azure', 'GCP', 'Your Stack',
    ],
    faqs: [
      {
        q: 'What is data engineering staff augmentation?',
        a: "Data engineering staff augmentation means adding external engineers to your existing team for a defined period. They work under your direction, in your tools and processes, filling skill or capacity gaps without the time and commitment of permanent hiring.",
      },
      {
        q: 'How quickly can we hire Databricks or Snowflake engineers through you?',
        a: "Once we understand your requirements, we propose suitable engineers for you to interview. Timing depends on the seniority and skill mix you need, but it is typically far faster than a permanent hiring cycle. Engineers start contributing in your sprints once access and onboarding are in place.",
      },
      {
        q: 'How much does data engineering staff augmentation cost?',
        a: "Cost depends on seniority, skill set, the number of engineers and engagement length. Because our delivery team is based in India, rates are typically lower than equivalent local hiring for teams in the US, UK, Europe and Australia. Contact us with your requirements and we will share a clear proposal.",
      },
      {
        q: 'What is the minimum engagement length?',
        a: "Resource augmentation engagements usually start at three months, and most run between three and twelve months. Shorter engagements can work for well-defined tasks; longer ones can transition to a managed team if that suits you better.",
      },
      {
        q: 'How does a dedicated data engineering team in India work across time zones?',
        a: "We agree overlap hours with your team for stand-ups, reviews and pairing, and structure work so progress continues outside those hours. Engineers work in your communication channels and ticketing system, and you receive weekly progress reports.",
      },
      {
        q: 'What is the difference between staff augmentation and a managed team?',
        a: "With staff augmentation, you direct the work and our engineers join your team. With a managed team, we own delivery of an agreed scope and you set the goals. Many clients start with one and move to the other as needs change.",
      },
    ],
    leadMagnet: {
      title: 'Free Team Gap Assessment',
      body: "Tell us about your roadmap and current team. We will map the skills and seniority you are missing, recommend whether augmentation, a dedicated team or a managed project fits best, and propose a team shape, with no obligation.",
      cta: 'Get the Assessment',
    },
  },
];

export const serviceContentBySlug = (slug: string) => services.find((s) => s.slug === slug);
