import type { CVContent, CVSettings } from "@/types/cv"
import { TemplateTokens } from "@/lib/cv-design-tokens"

export function MinimalTemplate({ content, settings, tokens }: { content: CVContent, settings: CVSettings, tokens: TemplateTokens }) {
  const { personalInfo, experiences, education, skills, languages, references } = content

  return (
    <div className="flex flex-col px-4" style={{ gap: `${tokens.sectionGap}px` }}>
      {/* Header */}
      <header className="flex flex-col items-center text-center gap-4">
        {settings.photoUrl && (
          <div className="w-20 h-20 rounded-full grayscale overflow-hidden mb-2">
            <img src={settings.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="space-y-2">
          <h1 className="font-light tracking-tight text-zinc-950" style={{ color: settings.accentColor, fontSize: `${tokens.nameSize * 1.3}px` }}>
            {personalInfo.fullName || "Votre Nom"}
          </h1>
          <p className="font-medium tracking-widest uppercase text-zinc-400" style={{ fontSize: `${tokens.jobTitleSize}px` }}>
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
          <p className="text-zinc-600 whitespace-pre-wrap text-center leading-relaxed italic" style={{ fontSize: `${tokens.bodySize}px` }}>
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
