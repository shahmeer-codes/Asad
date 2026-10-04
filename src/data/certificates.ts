export interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string;
    badge?: string;
    link?: string;
}

export const certificates: Certificate[] = [
    {
        id: 'cert-1',
        title: 'Machine Learning Specialization',
        issuer: 'Stanford University',
        date: 'Issued Jul 2025',
        badge: 'Stanford',
    },
    {
        id: 'cert-2',
        title: 'Certified AI Foundations — Associate',
        issuer: 'Industry Certification',
        date: 'Issued Aug 2025',
        badge: 'Associate',
    },
    {
        id: 'cert-3',
        title: 'Microsoft Azure for AI and Machine Learning',
        issuer: 'Microsoft',
        date: 'Issued Aug 2025',
        badge: 'Microsoft',
    },
    {
        id: 'cert-4',
        title: 'AI For Everyone',
        issuer: 'DeepLearning.AI',
        date: 'Issued Jul 2025',
        badge: 'DeepLearning.AI',
    },
    {
        id: 'cert-5',
        title: 'Training AI with Humans',
        issuer: 'Johns Hopkins University',
        date: 'Issued Jul 2025',
        badge: 'JHU',
    },
    {
        id: 'cert-6',
        title: 'AI for Autonomous Vehicles and Robotics',
        issuer: 'University of Michigan',
        date: 'Issued Jul 2025',
        badge: 'U-Michigan',
    },
];
