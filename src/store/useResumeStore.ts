import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  link: string;
  description: string;
  technologies?: string;
  date?: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
  };
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: string;
  certifications: string;
  achievements: string;
}

interface ResumeStore {
  data: ResumeData;
  selectedTemplate: string;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateData: <K extends keyof ResumeData>(section: K, data: ResumeData[K]) => void;
  setSelectedTemplate: (template: string) => void;
}

const initialData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
  },
  education: [],
  experience: [],
  projects: [],
  skills: '',
  certifications: '',
  achievements: '',
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: initialData,
      selectedTemplate: 'classic',
      updatePersonalInfo: (info) =>
        set((state) => ({
          data: {
            ...state.data,
            personalInfo: { ...state.data.personalInfo, ...info },
          },
        })),
      updateData: (section, data) =>
        set((state) => ({
          data: {
            ...state.data,
            [section]: data,
          },
        })),
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
    }),
    {
      name: 'resume-storage',
    }
  )
);

