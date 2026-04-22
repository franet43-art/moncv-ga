import { z } from "zod";

// === Section Schemas ===

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Le nom complet est requis"),
  jobTitle: z.string().optional(),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  summary: z.string().optional(),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Le nom de l'entreprise est requis"),
  position: z.string().min(1, "Le poste est requis"),
  startDate: z.string(),
  endDate: z.string().optional(),
  isCurrent: z.boolean().default(false),
  description: z.string().optional(),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "L'établissement est requis"),
  degree: z.string().min(1, "Le diplôme est requis"),
  field: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  isCurrent: z.boolean().default(false),
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Le nom de la compétence est requis"),
  level: z.enum(["debutant", "intermediaire", "avance", "expert"]).optional(),
});

export const languageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "La langue est requise"),
  level: z.enum(["basique", "intermediaire", "courant", "bilingue", "natif"]),
});

export const referenceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Le nom est requis"),
  company: z.string().optional(),
  position: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
});

export const certificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Le nom de la certification est requis"),
  issuer: z.string().min(1, "L'organisme est requis"),
  date: z.string(),
  url: z.string().url().optional().or(z.literal("")),
});

export const accomplishmentSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Le titre est requis"),
  date: z.string(),
  description: z.string().optional(),
});

export const hobbySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Le centre d'intérêt est requis"),
});

// === Design & Personalization Schemas ===

export const cvSettingsSchema = z.object({
  templateId: z.enum(["classic", "modern", "minimal"]).default("classic"),
  accentColor: z.string().default("#6C63FF"),
  fontFamily: z.enum(["inter", "merriweather", "playfair", "roboto"]).default("inter"),
  photoUrl: z.string().optional(),
  fontSize: z.enum(["small", "medium", "large"]).default("medium"),
});

// === Full CV Schema ===

export const cvContentSchema = z.object({
  personalInfo: personalInfoSchema,
  experiences: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
  languages: z.array(languageSchema),
  references: z.array(referenceSchema),
  certifications: z.array(certificationSchema).default([]),
  accomplishments: z.array(accomplishmentSchema).default([]),
  hobbies: z.array(hobbySchema).default([]),
});

// === Inferred Types ===

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Language = z.infer<typeof languageSchema>;
export type Reference = z.infer<typeof referenceSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Accomplishment = z.infer<typeof accomplishmentSchema>;
export type Hobby = z.infer<typeof hobbySchema>;
export type CVSettings = z.infer<typeof cvSettingsSchema>;
export type CVContent = z.infer<typeof cvContentSchema>;

// === Default Values ===

export const defaultPersonalInfo: PersonalInfo = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  address: "",
  linkedin: "",
  summary: "",
};

export const defaultSettings: CVSettings = {
  templateId: "classic",
  accentColor: "#6C63FF",
  fontFamily: "inter",
  fontSize: "medium",
};

export const defaultCVContent: CVContent = {
  personalInfo: defaultPersonalInfo,
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  references: [],
  certifications: [],
  accomplishments: [],
  hobbies: [],
};

// === Full CV Schema ===

export const cvSchema = z.object({
  id: z.string(),
  title: z.string().default("Mon CV"),
  content: cvContentSchema,
  settings: cvSettingsSchema.default(defaultSettings),
  isPaid: z.boolean().default(false),
  userId: z.string().nullable().default(null),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type CV = z.infer<typeof cvSchema>;

// === Template Definitions ===

export type TemplateId = "classic" | "modern" | "minimal";

export interface CVTemplate {
  id: TemplateId;
  name: string;
  description: string;
  thumbnail: string;
}

export function createEmptyCV(): CV {
  return {
    id: crypto.randomUUID(),
    title: "Mon CV",
    content: { ...defaultCVContent },
    settings: { ...defaultSettings },
    isPaid: false,
    userId: null,
  };
}
