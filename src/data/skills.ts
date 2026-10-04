export interface Skill {
    name: string;
    category: string;
    proficiency: 'Expert' | 'Advanced' | 'Intermediate';
    level: number; // 0-100
    description: string;
}

export interface SkillCategory {
    id: string;
    name: string;
    icon: string;
    color: string;
    skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
    {
        id: 'core',
        name: '⚙ Core & Programming',
        icon: 'Terminal',
        color: '#00F0FF',
        skills: [
            { name: 'Python', category: 'Core', proficiency: 'Expert', level: 95, description: 'Core language for ML, NLP, scripting, and backend pipelines.' },
            { name: 'SQL', category: 'Core', proficiency: 'Advanced', level: 88, description: 'Complex querying, schema design, and database operations.' },
            { name: 'Git & GitHub', category: 'Core', proficiency: 'Advanced', level: 88, description: 'Version control, branching, PR workflows, and collaboration.' },
            { name: 'OOP', category: 'Core', proficiency: 'Advanced', level: 85, description: 'Object-oriented programming, design patterns, and clean code.' },
        ],
    },
    {
        id: 'ml',
        name: '🤖 Machine Learning',
        icon: 'Cpu',
        color: '#8B5CF6',
        skills: [
            { name: 'Scikit-learn', category: 'ML', proficiency: 'Advanced', level: 88, description: 'Supervised/unsupervised algorithms, pipelines, and tuning.' },
            { name: 'Model Evaluation', category: 'ML', proficiency: 'Advanced', level: 88, description: 'Cross-validation, confusion matrices, ROC-AUC, and metrics.' },
            { name: 'YOLOv8 / CV', category: 'ML', proficiency: 'Intermediate', level: 78, description: 'Real-time object detection, SORT tracking, and vision tasks.' },
            { name: 'PyTorch', category: 'ML', proficiency: 'Intermediate', level: 78, description: 'Neural network training, MobileNetV2, and tensor ops.' },
        ],
    },
    {
        id: 'nlp',
        name: '💬 NLP & LLM',
        icon: 'MessageSquare',
        color: '#EC4899',
        skills: [
            { name: 'RAG Pipelines', category: 'NLP', proficiency: 'Advanced', level: 90, description: 'Retrieval-Augmented Generation, vector embeddings, and chunking.' },
            { name: 'Prompt Engineering', category: 'NLP', proficiency: 'Advanced', level: 90, description: 'Few-shot prompting, system instructions, and LLM tuning.' },
            { name: 'Text Preprocessing', category: 'NLP', proficiency: 'Expert', level: 95, description: 'Tokenization, lemmatization, stop-words, and vectorization.' },
            { name: 'Chatbot Dev', category: 'NLP', proficiency: 'Advanced', level: 88, description: 'Conversational agents, state management, and memory.' },
        ],
    },
    {
        id: 'ds',
        name: '📊 Data Science',
        icon: 'BarChart3',
        color: '#3B82F6',
        skills: [
            { name: 'Pandas / NumPy', category: 'Data Science', proficiency: 'Expert', level: 95, description: 'Data manipulation, vectorized math, and DataFrame ops.' },
            { name: 'Data Visualization', category: 'Data Science', proficiency: 'Advanced', level: 88, description: 'Matplotlib, Seaborn, Plotly, and dynamic charts.' },
            { name: 'EDA & Cleaning', category: 'Data Science', proficiency: 'Expert', level: 95, description: 'Exploratory data analysis, missing data, and feature engineering.' },
            { name: 'Statistical Analysis', category: 'Data Science', proficiency: 'Advanced', level: 85, description: 'Hypothesis testing, probability distributions, and correlation.' },
        ],
    },
    {
        id: 'deploy',
        name: '🚀 Deployment',
        icon: 'Rocket',
        color: '#10B981',
        skills: [
            { name: 'Streamlit', category: 'Deployment', proficiency: 'Expert', level: 95, description: 'Rapid ML web app prototyping and interactive dashboards.' },
            { name: 'Flask / FastAPI', category: 'Deployment', proficiency: 'Advanced', level: 88, description: 'REST API creation, asynchronous inference endpoints.' },
            { name: 'Hugging Face', category: 'Deployment', proficiency: 'Advanced', level: 88, description: 'Model hosting, Spaces deployment, and Transformers.' },
            { name: 'Cloud / AWS', category: 'Deployment', proficiency: 'Intermediate', level: 75, description: 'EC2, S3, cloud environment setup, and basic deployment.' },
        ],
    },
    {
        id: 'db',
        name: '🗄 Databases & Tools',
        icon: 'Database',
        color: '#F59E0B',
        skills: [
            { name: 'SQLite', category: 'Databases', proficiency: 'Advanced', level: 88, description: 'Embedded relational databases, lightweight storage.' },
            { name: 'PostgreSQL', category: 'Databases', proficiency: 'Intermediate', level: 78, description: 'Relational data management and SQL queries.' },
            { name: 'CRUD Operations', category: 'Databases', proficiency: 'Advanced', level: 88, description: 'Create, Read, Update, Delete persistence logic.' },
            { name: 'Linux Commands', category: 'Databases', proficiency: 'Intermediate', level: 78, description: 'Bash shell navigation, permissions, and server setup.' },
        ],
    },
];

export const allSkills = skillCategories.flatMap((c) => c.skills);
