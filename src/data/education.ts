export interface Education {
    id: string;
    degree: string;
    institution: string;
    location: string;
    period: string;
    fyp?: string;
    details: string;
}

export const educationList: Education[] = [
    {
        id: 'edu-1',
        degree: 'Bachelor of Science in Artificial Intelligence',
        institution: 'Khwaja Fareed University of Engineering & Information Technology (KFUEIT)',
        location: 'Rahim Yar Khan, PK',
        period: '2022 – 2026',
        fyp: 'AI Scholar Hunt — LLM + RAG-based scholarship discovery platform for Pakistani students',
        details:
            'Core subjects: Machine Learning, Deep Learning, NLP, Computer Vision, Data Science. Active in AI project development with 18+ deployed applications across diverse domains.',
    },
    {
        id: 'edu-2',
        degree: 'Intermediate of Computer Science (ICS)',
        institution: 'Board of Intermediate & Secondary Education (BISE)',
        location: 'Rahim Yar Khan, PK',
        period: '2020 – 2022',
        details: 'Focus: Physics, Mathematics, Computer Science. Developed foundational algorithmic logic and computer science fundamentals.',
    },
];
