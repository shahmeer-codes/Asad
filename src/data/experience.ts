export interface Experience {
    id: string;
    role: string;
    company: string;
    locationType: string;
    period: string;
    description: string;
    achievements: string[];
    technologies: string[];
}

export const experiences: Experience[] = [
    {
        id: 'exp-1',
        role: 'AI & Machine Learning Engineer',
        company: 'Virtual Soft',
        locationType: 'Full-time, Onsite',
        period: 'Jan 2026 – Mar 2026',
        description:
            'Developed multi-modal RAG pipelines handling large-scale data for intelligent insights. Built and fine-tuned LLM models, improving performance metrics and real-world applicability.',
        achievements: [
            'Architected multi-modal RAG pipelines for large-scale enterprise data extraction',
            'Fine-tuned LLM parameters to enhance domain accuracy and inference latency',
            'Engineered automated benchmark evaluation suites for production AI models',
        ],
        technologies: ['Python', 'LLM', 'RAG Pipelines', 'PyTorch', 'Vector DB', 'FastAPI'],
    },
    {
        id: 'exp-2',
        role: 'AI/ML Engineer Intern',
        company: 'Code Celix',
        locationType: 'Part-time, Remote',
        period: 'Sep 2025 – Nov 2025',
        description:
            'Built data-driven solutions using Python, SQL, and machine learning for business insights. Developed predictive models, dashboards, and data pipelines.',
        achievements: [
            'Engineered end-to-end SQL query pipelines and automated ETL data transformations',
            'Built interactive Streamlit & Flask dashboards for business predictive analytics',
            'Trained and validated scikit-learn models delivering actionable business intelligence',
        ],
        technologies: ['Python', 'SQL', 'Scikit-learn', 'Streamlit', 'Flask', 'Pandas'],
    },
    {
        id: 'exp-3',
        role: 'Machine Learning Intern',
        company: 'SkillifyZone',
        locationType: 'Part-time, Remote',
        period: 'Jul 2025 – Aug 2025',
        description:
            'Designed and implemented end-to-end machine learning workflows for predictive analytics using Python, scikit-learn, and PyTorch.',
        achievements: [
            'Implemented clean exploratory data analysis (EDA) and feature engineering workflows',
            'Trained classification and regression ML models with automated cross-validation',
            'Deployed PyTorch deep learning baseline models with reproducible metric logging',
        ],
        technologies: ['Python', 'Scikit-learn', 'PyTorch', 'NumPy', 'Matplotlib', 'EDA'],
    },
];
