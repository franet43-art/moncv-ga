"use client"

import { useCVStore } from "@/store/cv-store"
import { Mail, Phone, MapPin, Globe2, Calendar, GraduationCap, Building2, Languages as LangIcon, UserCheck, Laptop } from "lucide-react"
import type { CVContent, CVSettings } from "@/types/cv"
import { cn } from "@/lib/utils"
import { getTokens, TemplateTokens } from "@/lib/cv-design-tokens"

// --- Helper Components & Shared Logic ---

const SectionTitle = ({ title, accentColor, tokens, className }: { title: string, accentColor: string, tokens: TemplateTokens, className?: string }) => (
  <h2 
    className={cn("font-bold uppercase tracking-widest border-b font-sans", className)}
    style={{ 
      color: accentColor, 
      borderBottomColor: `${accentColor}20`,
      fontSize: `${tokens.sectionTitleSize}px`, // TOKEN: sectionTitleSize
      marginBottom: `${tokens.entryGap / 2}px`, // TOKEN: entryGap
    }}
  >
    {title}
  </h2>
)

// --- Template 1: Classic (Traditionnel) ---

function ClassicTemplate({ content, settings, tokens }: { content: CVContent, settings: CVSettings, tokens: TemplateTokens }) {
  const { personalInfo, experiences, education, skills, languages, references } = content

  return (
    <div className="flex flex-col" style={{ gap: `${tokens.sectionGap}px` }}> {/* TOKEN: sectionGap */}
      {/* Header */}
      <header className="text-center relative pb-6 border-b-2" style={{ borderBottomColor: settings.accentColor }}>
        {settings.photoUrl && (
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-100 shadow-sm">
            <img src={settings.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
        <div className={cn(settings.photoUrl ? "pr-28 text-left" : "text-center")}>
          <h1 className="font-bold uppercase tracking-tight text-zinc-950 mb-2" style={{ fontSize: `${tokens.nameSize}px` }}> {/* TOKEN: nameSize */}
            {personalInfo.fullName || "Votre Nom"}
          </h1>
          <p className="font-medium mb-4 italic" style={{ color: settings.accentColor, fontSize: `${tokens.jobTitleSize}px` }}> {/* TOKEN: jobTitleSize */}
            {personalInfo.jobTitle || "Votre Poste"}
          </p>
          
          <div className={cn("flex flex-wrap gap-x-6 gap-y-2 text-zinc-600 font-sans", !settings.photoUrl && "justify-center")} style={{ fontSize: `${tokens.bodySize}px` }}> {/* TOKEN: bodySize */}
            {personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <Mail style={{ color: settings.accentColor }} className="h-3.5 w-3.5" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone style={{ color: settings.accentColor }} className="h-3.5 w-3.5" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center gap-1.5">
                <MapPin style={{ color: settings.accentColor }} className="h-3.5 w-3.5" />
                <span>{personalInfo.address}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1.5">
                <Globe2 style={{ color: settings.accentColor }} className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section>
          <SectionTitle title="Profil Professionnel" accentColor={settings.accentColor} tokens={tokens} />
          <p className="text-zinc-700 whitespace-pre-wrap leading-relaxed" style={{ fontSize: `${tokens.bodySize}px` }}> {/* TOKEN: bodySize */}
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section>
          <SectionTitle title="Expériences Professionnelles" accentColor={settings.accentColor} tokens={tokens} />
          <div className="flex flex-col" style={{ gap: `${tokens.entryGap}px` }}> {/* TOKEN: entryGap */}
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-4 border-l-2 border-zinc-100 italic">
                <div className="flex justify-between items-start mb-1 not-italic">
                  <h3 className="font-bold text-zinc-900" style={{ fontSize: `${tokens.bodySize + 1}px` }}>{exp.position}</h3>
                  <div className="flex items-center gap-1.5 text-zinc-500 font-sans" style={{ fontSize: `${tokens.bodySize - 2}px` }}>
                    <Calendar className="h-3 w-3" />
                    <span>{exp.startDate} — {exp.isCurrent ? "Présent" : exp.endDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-zinc-600 mb-2 not-italic" style={{ fontSize: `${tokens.bodySize}px` }}>
                  <Building2 className="h-3.5 w-3.5" />
                  <span>{exp.company}</span>
                </div>
                <p className="text-zinc-700 whitespace-pre-wrap not-italic leading-normal" style={{ fontSize: `${tokens.bodySize - 1}px` }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section>
          <SectionTitle title="Formation & Diplômes" accentColor={settings.accentColor} tokens={tokens} />
          <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 1.5}px` }}>
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="mt-1 bg-zinc-100 p-1.5 rounded-full">
                    <GraduationCap className="h-4 w-4 text-zinc-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900" style={{ fontSize: `${tokens.bodySize + 1}px` }}>{edu.degree}</h3>
                    <p className="text-zinc-600 font-sans" style={{ fontSize: `${tokens.bodySize}px` }}>{edu.institution}{edu.field ? ` • ${edu.field}` : ""}</p>
                  </div>
                </div>
                <div className="text-zinc-500 font-sans mt-1" style={{ fontSize: `${tokens.bodySize - 2}px` }}>
                  {edu.startDate} — {edu.isCurrent ? "Présent" : edu.endDate}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Languages Grid */}
      <div className="grid grid-cols-2" style={{ gap: `${tokens.sectionGap}px` }}> {/* TOKEN: sectionGap */}
        {skills.length > 0 && (
          <section>
            <SectionTitle title="Compétences" accentColor={settings.accentColor} tokens={tokens} />
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="px-2 py-1 bg-zinc-100 text-zinc-700 rounded-sm font-sans flex items-center gap-1.5 border border-zinc-200" style={{ fontSize: `${tokens.bodySize - 2}px` }}>
                  <Laptop className="h-3 w-3 opacity-50" /> {skill.name} 
                  {skill.level && <span className="text-[10px] opacity-50 uppercase tracking-tighter">({skill.level})</span>}
                </span>
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <SectionTitle title="Langues" accentColor={settings.accentColor} tokens={tokens} />
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center font-sans" style={{ fontSize: `${tokens.bodySize - 1}px` }}>
                  <div className="flex items-center gap-1.5">
                    <LangIcon className="h-3 w-3 text-zinc-400" />
                    <span className="font-medium">{lang.name}</span>
                  </div>
                  <span className="text-zinc-500 capitalize italic">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* References */}
      {references.length > 0 && (
        <section>
          <SectionTitle title="Références" accentColor={settings.accentColor} tokens={tokens} />
          <div className="grid grid-cols-2 gap-4">
            {references.map((ref) => (
              <div key={ref.id} className="border border-zinc-100 p-3 rounded-sm bg-zinc-50/50">
                <p className="font-bold text-zinc-900 flex items-center gap-1.5 mb-1 font-sans" style={{ fontSize: `${tokens.bodySize}px` }}>
                  <UserCheck style={{ color: settings.accentColor }} className="h-3.5 w-3.5" />
                  {ref.name}
                </p>
                <div className="text-zinc-600 flex flex-col space-y-0.5 font-sans" style={{ fontSize: `${tokens.bodySize - 1}px` }}>
                    {ref.position && <span>{ref.position}</span>}
                    {ref.company && <span>{ref.company}</span>}
                    {ref.email && <span className="text-zinc-400">{ref.email}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// --- Template 2: Modern (Deux colonnes) ---

function ModernTemplate({ content, settings, tokens }: { content: CVContent, settings: CVSettings, tokens: TemplateTokens }) {
  const { personalInfo, experiences, education, skills, languages, references } = content

  return (
    <div className="flex min-h-[1050px]">
      {/* Sidebar GAUCHE */}
      <aside className="text-white flex flex-col flex-shrink-0" style={{ 
        width: tokens.sidebarWidth, // TOKEN: sidebarWidth
        padding: `${tokens.sidebarPadding}px`, // TOKEN: sidebarPadding
        gap: `${tokens.sectionGap}px`, // TOKEN: sectionGap
        backgroundColor: settings.accentColor 
      }}>
        {/* Photo + Nom */}
        <div className="flex flex-col items-center text-center gap-4">
          {settings.photoUrl && (
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
              <img src={settings.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="space-y-1">
            <h1 className="font-bold uppercase tracking-tight leading-tight" style={{ fontSize: `${tokens.nameSize}px` }}> {/* TOKEN: nameSize */}
              {personalInfo.fullName || "Votre Nom"}
            </h1>
            <p className="font-medium text-white/80 italic" style={{ fontSize: `${tokens.jobTitleSize}px` }}> {/* TOKEN: jobTitleSize */}
              {personalInfo.jobTitle || "Votre Poste"}
            </p>
          </div>
        </div>

        {/* Contact */}
        <section className="space-y-4">
          <h2 className="font-bold uppercase tracking-widest border-b border-white/20 pb-1" style={{ fontSize: `${tokens.sectionTitleSize}px` }}>Contact</h2>
          <div className="space-y-3 font-sans" style={{ fontSize: `${tokens.bodySize}px` }}> {/* TOKEN: bodySize */}
            {personalInfo.email && (
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-white/60" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-white/60" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-white/60" />
                <span>{personalInfo.address}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-3">
                <Globe2 className="h-4 w-4 text-white/60" />
                <span>LinkedIn</span>
              </div>
            )}
          </div>
        </section>

        {/* Skills */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-bold uppercase tracking-widest border-b border-white/20 pb-1" style={{ fontSize: `${tokens.sectionTitleSize}px` }}>Compétences</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="px-2 py-1 bg-black/10 border border-white/10 rounded-sm font-sans uppercase font-bold tracking-tighter" style={{ fontSize: `${tokens.bodySize - 2}px` }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-bold uppercase tracking-widest border-b border-white/20 pb-1" style={{ fontSize: `${tokens.sectionTitleSize}px` }}>Langues</h2>
            <div className="space-y-3">
              {languages.map((lang) => (
                <div key={lang.id} className="space-y-1">
                  <div className="flex justify-between uppercase font-bold" style={{ fontSize: `${tokens.bodySize - 2}px` }}>
                    <span>{lang.name}</span>
                    <span className="opacity-70">{lang.level}</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                       className="h-full bg-white" 
                       style={{ 
                         width: lang.level === "natif" || lang.level === "bilingue" ? "100%" : 
                                lang.level === "courant" ? "80%" :
                                lang.level === "intermediaire" ? "60%" : "40%" 
                       }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Contenu DROIT */}
      <main className="flex-1 flex flex-col bg-white" style={{ 
        padding: `${tokens.mainPadding}px`, // TOKEN: mainPadding
        gap: `${tokens.sectionGap}px` // TOKEN: sectionGap
      }}>
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: settings.accentColor, fontSize: `${tokens.sectionTitleSize + 2}px` }}>
              <div className="w-6 h-6 rounded bg-zinc-100 flex items-center justify-center">
                <UserCheck className="h-4 w-4" />
              </div>
              À propos de moi
            </h2>
            <p className="text-zinc-700 whitespace-pre-wrap leading-relaxed" style={{ fontSize: `${tokens.bodySize}px` }}> {/* TOKEN: bodySize */}
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className="font-bold uppercase tracking-widest flex items-center gap-2" style={{ 
              color: settings.accentColor, 
              fontSize: `${tokens.sectionTitleSize + 2}px`,
              marginBottom: `${tokens.entryGap}px`
            }}>
               <div className="w-6 h-6 rounded bg-zinc-100 flex items-center justify-center">
                 <BriefcaseIcon className="h-4 w-4" />
               </div>
               Expériences
            </h2>
            <div className="flex flex-col" style={{ gap: `${tokens.entryGap}px` }}> {/* TOKEN: entryGap */}
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-zinc-200">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-white" style={{ backgroundColor: settings.accentColor }} />
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-zinc-950" style={{ fontSize: `${tokens.bodySize + 1}px` }}>{exp.position}</h3>
                    <span className="font-bold font-sans text-zinc-400" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{exp.startDate} — {exp.isCurrent ? "Présent" : exp.endDate}</span>
                  </div>
                  <div className="font-bold opacity-70 mb-3" style={{ fontSize: `${tokens.bodySize}px` }}>{exp.company}</div>
                  <p className="text-zinc-600 whitespace-pre-wrap leading-normal" style={{ fontSize: `${tokens.bodySize - 1}px` }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="font-bold uppercase tracking-widest flex items-center gap-2" style={{ 
              color: settings.accentColor, 
              fontSize: `${tokens.sectionTitleSize + 2}px`,
              marginBottom: `${tokens.entryGap}px`
            }}>
               <div className="w-6 h-6 rounded bg-zinc-100 flex items-center justify-center">
                 <GraduationCap className="h-4 w-4" />
               </div>
               Formation
            </h2>
            <div className="flex flex-col" style={{ gap: `${tokens.entryGap}px` }}>
              {education.map((edu) => (
                <div key={edu.id} className="flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-zinc-950" style={{ fontSize: `${tokens.bodySize + 1}px` }}>{edu.degree}</h3>
                    <span className="font-bold font-sans opacity-50" style={{ fontSize: `${tokens.bodySize - 3}px` }}>{edu.startDate} — {edu.endDate}</span>
                  </div>
                  <div className="opacity-70" style={{ fontSize: `${tokens.bodySize}px` }}>{edu.institution}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {references.length > 0 && (
          <section>
            <h2 className="font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: settings.accentColor, fontSize: `${tokens.sectionTitleSize + 2}px` }}>
               <div className="w-6 h-6 rounded bg-zinc-100 flex items-center justify-center">
                 <UsersIcon className="h-4 w-4" />
               </div>
               Références
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {references.map((ref) => (
                <div key={ref.id} className="p-4 bg-zinc-50 rounded-lg border border-zinc-100" style={{ fontSize: `${tokens.bodySize - 1}px` }}>
                  <p className="font-bold text-zinc-900">{ref.name}</p>
                  <p className="opacity-60">{ref.position} @ {ref.company}</p>
                  <p className="font-sans font-medium mt-1" style={{ color: settings.accentColor }}>{ref.email}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

// Modern Template helper icons to avoid redundancy
const BriefcaseIcon = ({ className }: { className?: string }) => <Building2 className={className} />
const UsersIcon = ({ className }: { className?: string }) => <UserCheck className={className} />


// --- Template 3: Minimal (Épuré) ---

function MinimalTemplate({ content, settings, tokens }: { content: CVContent, settings: CVSettings, tokens: TemplateTokens }) {
  const { personalInfo, experiences, education, skills, languages, references } = content

  return (
    <div className="flex flex-col px-4" style={{ gap: `${tokens.sectionGap}px` }}> {/* TOKEN: sectionGap */}
      {/* Header */}
      <header className="flex flex-col items-center text-center gap-4">
        {settings.photoUrl && (
          <div className="w-20 h-20 rounded-full grayscale overflow-hidden mb-2">
            <img src={settings.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="space-y-2">
          <h1 className="font-light tracking-tight text-zinc-950" style={{ color: settings.accentColor, fontSize: `${tokens.nameSize * 1.3}px` }}> {/* TOKEN: nameSize */}
            {personalInfo.fullName || "Votre Nom"}
          </h1>
          <p className="font-medium tracking-widest uppercase text-zinc-400" style={{ fontSize: `${tokens.jobTitleSize}px` }}> {/* TOKEN: jobTitleSize */}
            {personalInfo.jobTitle || "Votre Poste"}
          </p>
        </div>
        
        <div className="h-px w-24 bg-zinc-200" />
        
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 uppercase font-sans tracking-wide" style={{ fontSize: `${tokens.bodySize - 2}px` }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.linkedin && <span>LinkedIn</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="max-w-2xl mx-auto">
          <p className="text-zinc-600 whitespace-pre-wrap text-center leading-relaxed italic" style={{ fontSize: `${tokens.bodySize}px` }}> {/* TOKEN: bodySize */}
            "{personalInfo.summary}"
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="space-y-8">
          <h2 className="font-bold uppercase tracking-[0.3em] text-zinc-300 border-b border-zinc-100 pb-2" style={{ fontSize: `${tokens.sectionTitleSize - 2}px` }}>Expériences</h2>
          <div className="flex flex-col" style={{ gap: `${tokens.entryGap * 1.5}px` }}>
            {experiences.map((exp) => (
              <div key={exp.id} className="grid grid-cols-[1fr_2fr] gap-8">
                <div className="text-right pt-1 font-bold text-zinc-400 font-sans tracking-wider" style={{ fontSize: `${tokens.bodySize - 2}px` }}>
                  {exp.startDate} — {exp.isCurrent ? "Présent" : exp.endDate}
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-zinc-900 leading-none mb-1" style={{ fontSize: `${tokens.bodySize + 2}px` }}>{exp.position}</h3>
                    <p className="font-medium text-zinc-400" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{exp.company}</p>
                  </div>
                  <p className="text-zinc-600 whitespace-pre-wrap leading-relaxed" style={{ fontSize: `${tokens.bodySize - 1}px` }}>
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="space-y-6">
          <h2 className="font-bold uppercase tracking-[0.3em] text-zinc-300 border-b border-zinc-100 pb-2" style={{ fontSize: `${tokens.sectionTitleSize - 2}px` }}>Formation</h2>
          <div className="grid grid-cols-2 gap-x-12" style={{ rowGap: `${tokens.entryGap}px` }}>
            {education.map((edu) => (
              <div key={edu.id} className="space-y-1">
                <p className="font-bold font-sans text-zinc-400 mb-1" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{edu.startDate} — {edu.endDate}</p>
                <h3 className="font-bold text-zinc-900 leading-tight" style={{ fontSize: `${tokens.bodySize}px` }}>{edu.degree}</h3>
                <p className="text-zinc-500" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Languages */}
      {(skills.length > 0 || languages.length > 0) && (
        <div className="grid grid-cols-2 gap-x-12">
          {skills.length > 0 && (
            <section className="space-y-6">
              <h2 className="font-bold uppercase tracking-[0.3em] text-zinc-300 border-b border-zinc-100 pb-2" style={{ fontSize: `${tokens.sectionTitleSize - 2}px` }}>Compétences</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="font-medium lowercase tracking-wide underline decoration-zinc-100 decoration-2 underline-offset-4" style={{ fontSize: `${tokens.bodySize - 1}px` }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section className="space-y-6">
              <h2 className="font-bold uppercase tracking-[0.3em] text-zinc-300 border-b border-zinc-100 pb-2" style={{ fontSize: `${tokens.sectionTitleSize - 2}px` }}>Langues</h2>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center" style={{ fontSize: `${tokens.bodySize - 1}px` }}>
                    <span className="text-zinc-600 font-medium">{lang.name}</span>
                    <span className="text-zinc-300 lowercase font-serif italic" style={{ fontSize: `${tokens.bodySize - 3}px` }}>{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}


// --- Watermark Overlay ---

function WatermarkOverlay() {
  return (
    <div 
      className="absolute inset-0 z-50 pointer-events-none select-none overflow-hidden opacity-[0.07] dark:opacity-[0.05] print:hidden"
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      <div className="absolute inset-[-50%] flex flex-wrap justify-center items-center content-center rotate-[-35deg]">
        {Array.from({ length: 100 }).map((_, i) => (
          <span 
            key={i} 
            className="text-xl font-bold tracking-[0.2em] whitespace-nowrap p-12"
          >
            MonCV.ga
          </span>
        ))}
      </div>
    </div>
  )
}

// --- Main Entry point ---

export function CVPreview() {
  const { currentCV } = useCVStore()
  const { content, settings } = currentCV
  
  const fontMap = {
    inter: "Inter, sans-serif",
    merriweather: "Merriweather, serif",
    playfair: "'Playfair Display', serif",
    roboto: "Roboto, sans-serif",
  }
  
  const tokens = getTokens(settings.fontSize as any)
  
  const wrapperStyle = {
    fontFamily: fontMap[settings.fontFamily as keyof typeof fontMap] || fontMap.inter,
    fontSize: `${tokens.bodySize}px`, // TOKEN: bodySize
    "--accent": settings.accentColor,
  } as React.CSSProperties

  return (
    <div 
      id="cv-preview"
      className="relative bg-white text-zinc-900 w-full min-h-[297mm] h-fit shadow-2xl overflow-hidden mx-auto transition-all duration-300 group cv-preview-container" 
      style={{ 
        ...wrapperStyle,
        padding: `${tokens.mainPadding}px` // TOKEN: mainPadding
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Watermark Overlay */}
      {!currentCV.isPaid && <WatermarkOverlay />}
      
      <div className="w-[210mm] max-w-full mx-auto relative z-10">
        {settings.templateId === "classic" && <ClassicTemplate content={content} settings={settings} tokens={tokens} />}
        {settings.templateId === "modern" && <ModernTemplate content={content} settings={settings} tokens={tokens} />}
        {settings.templateId === "minimal" && <MinimalTemplate content={content} settings={settings} tokens={tokens} />}
      </div>

      <style jsx global>{`
        @media print {
          .cv-preview-container {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
