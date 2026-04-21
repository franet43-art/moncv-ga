import { Mail, Phone, MapPin, Globe2, GraduationCap, Building2, UserCheck } from "lucide-react"
import type { CVContent, CVSettings } from "@/types/cv"
import { TemplateTokens } from "@/lib/cv-design-tokens"

// Modern Template helper icons to avoid redundancy
const BriefcaseIcon = ({ className }: { className?: string }) => <Building2 className={className} />
const UsersIcon = ({ className }: { className?: string }) => <UserCheck className={className} />

export function ModernTemplate({ content, settings, tokens }: { content: CVContent, settings: CVSettings, tokens: TemplateTokens }) {
  const { personalInfo, experiences, education, skills, languages, references } = content

  return (
    <div className="flex min-h-[1050px]">
      {/* Sidebar GAUCHE */}
      <aside className="text-white flex flex-col flex-shrink-0" style={{ 
        width: tokens.sidebarWidth,
        padding: `${tokens.sidebarPadding}px`,
        gap: `${tokens.sectionGap}px`,
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
            <h1 className="font-bold uppercase tracking-tight leading-tight" style={{ fontSize: `${tokens.nameSize}px` }}>
              {personalInfo.fullName || "Votre Nom"}
            </h1>
            <p className="font-medium text-white/80 italic" style={{ fontSize: `${tokens.jobTitleSize}px` }}>
              {personalInfo.jobTitle || "Votre Poste"}
            </p>
          </div>
        </div>

        {/* Contact */}
        <section className="space-y-4">
          <h2 className="font-bold uppercase tracking-widest border-b border-white/20 pb-1" style={{ fontSize: `${tokens.sectionTitleSize}px` }}>Contact</h2>
          <div className="space-y-3 font-sans" style={{ fontSize: `${tokens.bodySize}px` }}>
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
        padding: `${tokens.mainPadding}px`,
        gap: `${tokens.sectionGap}px`
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
            <p className="text-zinc-700 whitespace-pre-wrap leading-relaxed" style={{ fontSize: `${tokens.bodySize}px` }}>
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
            <div className="flex flex-col" style={{ gap: `${tokens.entryGap}px` }}>
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
