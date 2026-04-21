import { Mail, Phone, MapPin, Globe2, Calendar, GraduationCap, Building2, Languages as LangIcon, UserCheck, Laptop } from "lucide-react"
import type { CVContent, CVSettings } from "@/types/cv"
import { cn } from "@/lib/utils"
import { TemplateTokens } from "@/lib/cv-design-tokens"

const SectionTitle = ({ title, accentColor, tokens, className }: { title: string, accentColor: string, tokens: TemplateTokens, className?: string }) => (
  <h2 
    className={cn("font-bold uppercase tracking-widest border-b font-sans", className)}
    style={{ 
      color: accentColor, 
      borderBottomColor: `${accentColor}20`,
      fontSize: `${tokens.sectionTitleSize}px`,
      marginBottom: `${tokens.entryGap / 2}px`,
    }}
  >
    {title}
  </h2>
)

export function ClassicTemplate({ content, settings, tokens }: { content: CVContent, settings: CVSettings, tokens: TemplateTokens }) {
  const { personalInfo, experiences, education, skills, languages, references } = content

  return (
    <div className="flex flex-col" style={{ gap: `${tokens.sectionGap}px` }}>
      {/* Header */}
      <header className="text-center relative pb-6 border-b-2" style={{ borderBottomColor: settings.accentColor }}>
        {settings.photoUrl && (
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-100 shadow-sm">
            <img src={settings.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
        <div className={cn(settings.photoUrl ? "pr-28 text-left" : "text-center")}>
          <h1 className="font-bold uppercase tracking-tight text-zinc-950 mb-2" style={{ fontSize: `${tokens.nameSize}px` }}>
            {personalInfo.fullName || "Votre Nom"}
          </h1>
          <p className="font-medium mb-4 italic" style={{ color: settings.accentColor, fontSize: `${tokens.jobTitleSize}px` }}>
            {personalInfo.jobTitle || "Votre Poste"}
          </p>
          
          <div className={cn("flex flex-wrap gap-x-6 gap-y-2 text-zinc-600 font-sans", !settings.photoUrl && "justify-center")} style={{ fontSize: `${tokens.bodySize}px` }}>
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
          <p className="text-zinc-700 whitespace-pre-wrap leading-relaxed" style={{ fontSize: `${tokens.bodySize}px` }}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section>
          <SectionTitle title="Expériences Professionnelles" accentColor={settings.accentColor} tokens={tokens} />
          <div className="flex flex-col" style={{ gap: `${tokens.entryGap}px` }}>
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
      <div className="grid grid-cols-2" style={{ gap: `${tokens.sectionGap}px` }}>
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
