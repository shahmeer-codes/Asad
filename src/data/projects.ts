export interface Project {
  id: string;
  codeNumber: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  metrics?: string;
  github: string;
  live: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'project-001',
    codeNumber: 'PROJECT 001',
    title: 'Sentellect — Learning Through Emotions',
    category: 'Edu-Tech · AI',
    description:
      'An AI-driven adaptive learning platform for HSSC Mathematics, personalizing content using student performance and mental-state data with predictive models and an AI chatbot.',
    tags: ['Education Technology', 'Adaptive Learning', 'Chatbot', 'Python', 'Streamlit'],
    metrics: 'Predictive Modeling & Adaptive AI',
    github: 'https://github.com/Asad-Aziz-001/Sentellect',
    live: 'https://sentellect.streamlit.app',
    featured: true,
  },
  {
    id: 'project-002',
    codeNumber: 'PROJECT 002',
    title: 'AI Scholar Hunt',
    category: 'LLM · RAG',
    description:
      'An intelligent chatbot for international scholarship guidance. Helps students identify required documents, track completion, and discover scholarships using an LLM-powered RAG system.',
    tags: ['LLM & RAG', 'AI & NLP', 'Scholarship Guidance', 'LangChain', 'Vector DB'],
    metrics: 'Final Year BS AI Project @ KFUEIT',
    github: 'https://github.com/Asad-Aziz-001/AI-Scholar-Hunt',
    live: 'https://ai-scholar-hunt.streamlit.app',
    featured: true,
  },
  {
    id: 'project-003',
    codeNumber: 'PROJECT 003',
    title: 'Brain Tumor Detection',
    category: 'Medical · Neuro_Scan-AI',
    description:
      'Built a deep learning web app for brain tumor detection using MobileNetV2 (95.7% accuracy) with Grad-CAM explainability. Deployed on Hugging Face Spaces with Flask, PyTorch, user auth, and PDF reports.',
    tags: ['AI & MobileNetV2', 'GradCAM', 'Deep Learning', 'PyTorch', 'Flask'],
    metrics: '95.7% Accuracy | Grad-CAM XAI',
    github: 'https://github.com/Asad-Aziz-001/Brain-Tumor-Detection',
    live: 'https://huggingface.co/spaces/Asad-Aziz-001/Brain-Tumor-Detection',
    featured: true,
  },
  {
    id: 'project-004',
    codeNumber: 'PROJECT 004',
    title: 'Smart Image Vision',
    category: 'CV · Real-time',
    description:
      'A real-time object detection and tracking app using YOLOv8 with the SORT algorithm, detecting objects in images, webcam, or video feeds with consistent unique IDs across frames.',
    tags: ['Computer Vision', 'Object Detection', 'Real-time Tracking', 'YOLOv8', 'SORT'],
    metrics: 'Real-Time SORT Multi-Object Tracking',
    github: 'https://github.com/Asad-Aziz-001/Smart-Image-Vision',
    live: 'https://smart-image-vision.streamlit.app',
    featured: true,
  },
];
