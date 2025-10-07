export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  image?: string
  logo?: string
  category: 'healthcare' | 'analytics' | 'ai' | 'systems'
  featured: boolean
  tags: string[]
  metrics: {
    label: string
    value: string
  }[]
  technologies: string[]
  duration: string
  role: string
  company?: string
  companyLogo?: string
  challenges: string[]
  solutions: string[]
  outcomes: string[]
  link?: string
}

export const projects: Project[] = [
  {
    id: 'acgme-compliance-system',
    title: 'ACGME Residency Compliance Platform',
    subtitle: 'Automated Evaluation & Accreditation Management',
    description: 'Engineered an enterprise-wide compliance automation platform that transformed residency program evaluation from a manual, error-prone process to a streamlined digital workflow. The system automated collection of 300+ evaluation types across 8 specialty programs, ensuring 100% compliance with ACGME requirements while reducing administrative burden by 40%.',
    image: '/images/projects/acgme-dashboard.png',
    logo: '/images/companies/ahn-usacs-logo.png',
    category: 'healthcare',
    featured: true,
    tags: ['Healthcare Compliance', 'Process Automation', 'Data Analytics', 'Quality Assurance'],
    metrics: [
      { label: 'Compliance Improvement', value: '296%' },
      { label: 'Risk Mitigation', value: '$2.4M' },
      { label: 'Time Saved', value: '40%' },
      { label: 'Programs Deployed', value: '8' }
    ],
    technologies: ['Python', 'SQL Server', 'Tableau', 'Epic EHR', 'REDCap', 'PowerBI'],
    duration: '2023 - 2024',
    role: 'Lead Healthcare Analytics Engineer',
    company: 'Allegheny Health Network',
    companyLogo: '/images/companies/ahn-usacs-logo.png',
    challenges: [
      'Manual evaluation processes causing 60% non-compliance rate',
      'Risk of losing ACGME accreditation worth $2.4M annually',
      'Fragmented data across 5 different systems',
      'No visibility into real-time compliance metrics'
    ],
    solutions: [
      'Built automated evaluation distribution system using Epic EHR APIs',
      'Created real-time dashboards tracking all ACGME milestones',
      'Integrated multiple data sources into unified compliance platform',
      'Implemented predictive alerts for at-risk evaluation periods'
    ],
    outcomes: [
      'Achieved 296% increase in evaluation completion rates',
      'Prevented potential $2.4M loss from accreditation failure',
      'Reduced program coordinator workload by 40%',
      'Received commendation from ACGME site visitors'
    ]
  },
  {
    id: 'sepsis-command-center',
    title: 'Sepsis Command Center & Alert System',
    subtitle: 'Real-Time Clinical Decision Support',
    description: 'Developed a real-time sepsis detection and response system that monitors patient vitals, lab results, and clinical indicators to identify sepsis onset within minutes. The platform automatically alerts rapid response teams and tracks bundle compliance, ensuring CMS SEP-1 measures are met consistently while reducing sepsis mortality by 18%.',
    image: '/images/projects/sepsis-command.png',
    category: 'ai',
    featured: true,
    tags: ['Clinical AI', 'Real-Time Analytics', 'Emergency Response', 'Quality Metrics'],
    metrics: [
      { label: 'Bundle Compliance', value: '<60 min' },
      { label: 'Mortality Reduction', value: '18%' },
      { label: 'Lives Saved/Year', value: '~45' },
      { label: 'Response Time', value: '73% faster' }
    ],
    technologies: ['Python', 'TensorFlow', 'HL7 FHIR', 'Apache Kafka', 'React', 'PostgreSQL'],
    duration: '2023 - 2024',
    role: 'Clinical Analytics Lead',
    company: 'Allegheny Health Network',
    challenges: [
      'Delayed sepsis recognition leading to higher mortality',
      'Inconsistent bundle compliance affecting CMS reimbursements',
      'Fragmented communication between care teams',
      'Manual chart reviews for SEP-1 reporting'
    ],
    solutions: [
      'ML model analyzing 27 clinical variables in real-time',
      'Automated alerts to bedside teams via secure messaging',
      'Bundle compliance tracking with smart notifications',
      'Automated SEP-1 measure calculation and reporting'
    ],
    outcomes: [
      'Reduced sepsis mortality rate by 18%',
      'Achieved 95% bundle compliance within 60 minutes',
      'Saved estimated 45 lives annually',
      'Improved CMS quality scores and reimbursements'
    ]
  },
  {
    id: 'value-based-care-modeling',
    title: 'Value-Based Care Financial Modeling Platform',
    subtitle: 'Risk Stratification & Shared Savings Optimization',
    description: 'Built a comprehensive value-based care analytics platform that aligns clinical quality metrics with financial performance. The system performs risk stratification on 50,000+ patients, predicts high-cost utilizers, and recommends interventions that simultaneously improve outcomes and reduce costs, generating $6.7M in shared savings.',
    image: '/images/projects/value-based-care.png',
    category: 'analytics',
    featured: true,
    tags: ['Financial Modeling', 'Risk Analytics', 'Population Health', 'Predictive Analytics'],
    metrics: [
      { label: 'Shared Savings', value: '$6.7M' },
      { label: 'Patients Analyzed', value: '50K+' },
      { label: 'ROI', value: '487%' },
      { label: 'Quality Score', value: '94/100' }
    ],
    technologies: ['R', 'Python', 'Snowflake', 'dbt', 'Tableau', 'SAS'],
    duration: '2022 - 2024',
    role: 'Healthcare Data Scientist',
    company: 'Allegheny Health Network',
    challenges: [
      'Misalignment between quality metrics and financial incentives',
      'Inability to identify high-risk patients proactively',
      'Complex attribution models across multiple payers',
      'Lack of actionable insights for care managers'
    ],
    solutions: [
      'Risk stratification algorithm processing 200+ clinical variables',
      'Predictive models for readmission and ED utilization',
      'Attribution logic handling 12 different payer contracts',
      'Care gap identification system with intervention recommendations'
    ],
    outcomes: [
      'Generated $6.7M in shared savings across ACO contracts',
      'Reduced unnecessary readmissions by 28%',
      'Improved HEDIS quality scores to 94th percentile',
      'Enabled proactive care management for 8,000 high-risk patients'
    ]
  },
  {
    id: 'emma-oncology-workflow',
    title: 'EMMA - Precision Oncology Clinical Trial Matching',
    subtitle: 'AI-Powered Treatment Recommendation Engine',
    description: 'Led the development of EMMA (Electronic Medical Matching Assistant), an AI platform that analyzes patient genomic data, medical history, and clinical trial eligibility criteria to match cancer patients with precision therapies. The system reduced time-to-treatment by 36% and increased clinical trial enrollment by 150%.',
    image: '/images/projects/emma-project.png',
    logo: '/images/companies/emma-logo.png',
    category: 'ai',
    featured: true,
    tags: ['Precision Medicine', 'NLP', 'Clinical Trials', 'Oncology', 'Machine Learning'],
    metrics: [
      { label: 'Time to Treatment', value: '-36%' },
      { label: 'Trial Enrollment', value: '+150%' },
      { label: 'Match Accuracy', value: '94%' },
      { label: 'Patients Served', value: '2,800+' }
    ],
    technologies: ['Python', 'BERT NLP', 'Neo4j', 'AWS SageMaker', 'FastAPI', 'React'],
    duration: '2022 - 2023',
    role: 'Technical Product Lead',
    company: 'EMMA Oncology',
    companyLogo: '/images/companies/emma-logo.png',
    challenges: [
      'Manual trial matching taking weeks per patient',
      'Complex eligibility criteria in unstructured text',
      'Genomic data interpretation requiring specialist review',
      'Low clinical trial enrollment rates (<5%)'
    ],
    solutions: [
      'NLP pipeline extracting criteria from 10,000+ trial protocols',
      'Graph database linking genomic variants to therapies',
      'ML model predicting treatment response probabilities',
      'Automated eligibility screening with explanations'
    ],
    outcomes: [
      'Reduced average time to treatment initiation by 36%',
      'Increased clinical trial enrollment from 5% to 12.5%',
      '94% accuracy in treatment matching validated by oncologists',
      'Platform adopted by 3 major cancer centers'
    ]
  },
  {
    id: 'ems-resource-optimization',
    title: 'EMS Resource Optimization & Dispatch Intelligence',
    subtitle: 'Predictive Analytics for Emergency Response',
    description: 'Created a predictive analytics platform for emergency medical services that optimizes ambulance positioning, predicts call volumes, and recommends resource allocation. The system uses historical data, weather patterns, and event schedules to reduce response times by 23% while maintaining coverage across all service areas.',
    image: '/images/projects/ems-optimization.png',
    category: 'analytics',
    featured: false,
    tags: ['Operations Research', 'Predictive Analytics', 'GIS', 'Emergency Services'],
    metrics: [
      { label: 'Response Time', value: '-23%' },
      { label: 'Coverage', value: '99.2%' },
      { label: 'Cost Savings', value: '$1.8M' },
      { label: 'Lives Impacted', value: '15K/year' }
    ],
    technologies: ['Python', 'Gurobi', 'PostGIS', 'Apache Spark', 'Grafana', 'Kubernetes'],
    duration: '2023',
    role: 'Data Science Consultant',
    company: 'US Acute Care Solutions',
    companyLogo: '/images/companies/ahn-usacs-logo.png',
    challenges: [
      'Suboptimal ambulance positioning leading to delays',
      'Inability to predict demand spikes',
      'Resource waste during low-demand periods',
      'No integration between dispatch and hospital capacity'
    ],
    solutions: [
      'ML model predicting hourly call volumes with 87% accuracy',
      'Optimization algorithm for dynamic repositioning',
      'Real-time dashboard showing coverage gaps',
      'Integration with hospital ED capacity data'
    ],
    outcomes: [
      'Reduced average response time from 8.2 to 6.3 minutes',
      'Maintained 99.2% coverage of service area',
      'Saved $1.8M annually in operational costs',
      'Improved patient outcomes for cardiac emergencies'
    ]
  },
  {
    id: 'clinical-nlp-platform',
    title: 'Clinical NLP for Quality Measure Abstraction',
    subtitle: 'Automated Chart Review & Reporting',
    description: 'Developed a natural language processing platform that automatically extracts quality measures from unstructured clinical notes, reducing manual chart abstraction by 85%. The system processes 100,000+ notes daily, identifying relevant clinical concepts for HEDIS, MIPS, and custom quality measures with 96% accuracy.',
    image: '/images/projects/nlp-platform.png',
    category: 'ai',
    featured: false,
    tags: ['Natural Language Processing', 'Healthcare Quality', 'Automation', 'Clinical Documentation'],
    metrics: [
      { label: 'Abstraction Reduction', value: '85%' },
      { label: 'Accuracy', value: '96%' },
      { label: 'Notes/Day', value: '100K+' },
      { label: 'Measures Tracked', value: '147' }
    ],
    technologies: ['Python', 'spaCy', 'BERT', 'Elasticsearch', 'RabbitMQ', 'Docker'],
    duration: '2022',
    role: 'NLP Engineer',
    company: 'Allegheny Health Network',
    challenges: [
      'Manual abstraction costing $2M annually',
      'Inconsistent quality measure capture',
      'Delayed reporting affecting reimbursements',
      'Varying documentation styles across providers'
    ],
    solutions: [
      'Custom clinical NER model trained on 500K annotations',
      'Rule-based extraction for structured measures',
      'Confidence scoring with human-in-the-loop validation',
      'Real-time processing pipeline with queue management'
    ],
    outcomes: [
      'Reduced abstraction costs by $1.7M annually',
      'Improved measure capture rate from 72% to 96%',
      'Decreased reporting lag from weeks to hours',
      'Enabled real-time quality gap notifications to providers'
    ]
  }
]

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured)
}

export function getProjectsByCategory(category: Project['category']): Project[] {
  return projects.filter(p => p.category === category)
}