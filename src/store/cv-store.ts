import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CV, CVContent, CVSettings } from "@/types/cv";
import { createEmptyCV, defaultCVContent } from "@/types/cv";

interface CVState {
  // Current CV being edited
  currentCV: CV;
  // Hydration tracking
  isHydrated: boolean;
  setHydrated: (value: boolean) => void;

  // CV actions
  setCurrentCV: (cv: CV) => void;
  updateContent: (content: Partial<CVContent>) => void;
  updatePersonalInfo: (info: Partial<CVContent["personalInfo"]>) => void;
  setTitle: (title: string) => void;
  
  // Customization actions
  updateSettings: (settings: Partial<CVSettings>) => void;
  setTemplateId: (templateId: string) => void;
  setPhoto: (photoUrl: string) => void;
  removePhoto: () => void;
  
  resetCV: () => void;

  // Array operations for experiences, education, skills, languages, references
  addExperience: (exp: CVContent["experiences"][number]) => void;
  updateExperience: (id: string, exp: Partial<CVContent["experiences"][number]>) => void;
  removeExperience: (id: string) => void;

  addEducation: (edu: CVContent["education"][number]) => void;
  updateEducation: (id: string, edu: Partial<CVContent["education"][number]>) => void;
  removeEducation: (id: string) => void;

  addSkill: (skill: CVContent["skills"][number]) => void;
  updateSkill: (id: string, skill: Partial<CVContent["skills"][number]>) => void;
  removeSkill: (id: string) => void;

  addLanguage: (lang: CVContent["languages"][number]) => void;
  updateLanguage: (id: string, lang: Partial<CVContent["languages"][number]>) => void;
  removeLanguage: (id: string) => void;

  addReference: (ref: CVContent["references"][number]) => void;
  updateReference: (id: string, ref: Partial<CVContent["references"][number]>) => void;
  removeReference: (id: string) => void;

  addCertification: (cert: CVContent["certifications"][number]) => void;
  updateCertification: (id: string, cert: Partial<CVContent["certifications"][number]>) => void;
  removeCertification: (id: string) => void;

  addAccomplishment: (acc: CVContent["accomplishments"][number]) => void;
  updateAccomplishment: (id: string, acc: Partial<CVContent["accomplishments"][number]>) => void;
  removeAccomplishment: (id: string) => void;

  addHobby: (hobby: CVContent["hobbies"][number]) => void;
  updateHobby: (id: string, hobby: Partial<CVContent["hobbies"][number]>) => void;
  removeHobby: (id: string) => void;

  // Sync
  clearLocalCV: () => void;
  setFromSupabase: (cv: CV) => void;
}

export const useCVStore = create<CVState>()(
  persist(
    (set, get) => ({
      currentCV: createEmptyCV(),
      isHydrated: false,
      setHydrated: (value) => set({ isHydrated: value }),

      setCurrentCV: (cv) => set({ currentCV: cv }),

      updateContent: (content) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: { ...state.currentCV.content, ...content },
          },
        })),

      updatePersonalInfo: (info) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              personalInfo: { ...state.currentCV.content.personalInfo, ...info },
            },
          },
        })),

      setTitle: (title) =>
        set((state) => ({ currentCV: { ...state.currentCV, title } })),

      // Customization
      updateSettings: (settings) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            settings: { ...state.currentCV.settings, ...settings },
          },
        })),

      setTemplateId: (templateId) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            settings: { ...state.currentCV.settings, templateId: templateId as any },
          },
        })),

      setPhoto: (photoUrl) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            settings: { ...state.currentCV.settings, photoUrl },
          },
        })),

      removePhoto: () =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            settings: { ...state.currentCV.settings, photoUrl: undefined },
          },
        })),

      resetCV: () => set({ currentCV: createEmptyCV() }),

      // Experiences
      addExperience: (exp) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              experiences: [...state.currentCV.content.experiences, exp],
            },
          },
        })),
      updateExperience: (id, updates) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              experiences: state.currentCV.content.experiences.map((e) =>
                e.id === id ? { ...e, ...updates } : e
              ),
            },
          },
        })),
      removeExperience: (id) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              experiences: state.currentCV.content.experiences.filter((e) => e.id !== id),
            },
          },
        })),

      // Education
      addEducation: (edu) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              education: [...state.currentCV.content.education, edu],
            },
          },
        })),
      updateEducation: (id, updates) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              education: state.currentCV.content.education.map((e) =>
                e.id === id ? { ...e, ...updates } : e
              ),
            },
          },
        })),
      removeEducation: (id) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              education: state.currentCV.content.education.filter((e) => e.id !== id),
            },
          },
        })),

      // Skills
      addSkill: (skill) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              skills: [...state.currentCV.content.skills, skill],
            },
          },
        })),
      updateSkill: (id, updates) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              skills: state.currentCV.content.skills.map((s) =>
                s.id === id ? { ...s, ...updates } : s
              ),
            },
          },
        })),
      removeSkill: (id) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              skills: state.currentCV.content.skills.filter((s) => s.id !== id),
            },
          },
        })),

      // Languages
      addLanguage: (lang) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              languages: [...state.currentCV.content.languages, lang],
            },
          },
        })),
      updateLanguage: (id, updates) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              languages: state.currentCV.content.languages.map((l) =>
                l.id === id ? { ...l, ...updates } : l
              ),
            },
          },
        })),
      removeLanguage: (id) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              languages: state.currentCV.content.languages.filter((l) => l.id !== id),
            },
          },
        })),

      // References
      addReference: (ref) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              references: [...state.currentCV.content.references, ref],
            },
          },
        })),
      updateReference: (id, updates) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              references: state.currentCV.content.references.map((r) =>
                r.id === id ? { ...r, ...updates } : r
              ),
            },
          },
        })),
      removeReference: (id) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              references: state.currentCV.content.references.filter((r) => r.id !== id),
            },
          },
        })),

      // Certifications
      addCertification: (cert) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              certifications: [...(state.currentCV.content.certifications || []), cert],
            },
          },
        })),
      updateCertification: (id, updates) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              certifications: (state.currentCV.content.certifications || []).map((c) =>
                c.id === id ? { ...c, ...updates } : c
              ),
            },
          },
        })),
      removeCertification: (id) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              certifications: (state.currentCV.content.certifications || []).filter((c) => c.id !== id),
            },
          },
        })),

      // Accomplishments
      addAccomplishment: (acc) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              accomplishments: [...(state.currentCV.content.accomplishments || []), acc],
            },
          },
        })),
      updateAccomplishment: (id, updates) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              accomplishments: (state.currentCV.content.accomplishments || []).map((a) =>
                a.id === id ? { ...a, ...updates } : a
              ),
            },
          },
        })),
      removeAccomplishment: (id) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              accomplishments: (state.currentCV.content.accomplishments || []).filter((a) => a.id !== id),
            },
          },
        })),

      // Hobbies
      addHobby: (hobby) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              hobbies: [...(state.currentCV.content.hobbies || []), hobby],
            },
          },
        })),
      updateHobby: (id, updates) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              hobbies: (state.currentCV.content.hobbies || []).map((h) =>
                h.id === id ? { ...h, ...updates } : h
              ),
            },
          },
        })),
      removeHobby: (id) =>
        set((state) => ({
          currentCV: {
            ...state.currentCV,
            content: {
              ...state.currentCV.content,
              hobbies: (state.currentCV.content.hobbies || []).filter((h) => h.id !== id),
            },
          },
        })),

      // Sync
      clearLocalCV: () => set({ currentCV: createEmptyCV() }),
      setFromSupabase: (cv) => set({ currentCV: cv }),
    }),
    {
      name: "cv-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
        currentCV: {
          ...currentState.currentCV,
          ...(persistedState as any)?.currentCV,
          settings: {
            ...currentState.currentCV.settings,
            ...(persistedState as any)?.currentCV?.settings,
          }
        }
      })
    }
  )
);
