import { Mail, Phone, MapPin, Globe2, GraduationCap, Building2, Medal, Trophy, Heart, ExternalLink } from "lucide-react"
import type { CVContent, CVSettings } from "@/types/cv"
import { TemplateTokens } from "@/lib/cv-design-tokens"

const LANG_LEVEL_PCT: Record<string, number> = {
  basique: 20, intermediaire: 45, courant: 70, bilingue: 90, natif: 100
}

export function ElegantTemplate({ content, settings, tokens }: { content: CVContent, settings: CVSettings, tokens: TemplateTokens }) {
  const { personalInfo, experiences, education, skills, languages, references, certifications = [], accomplishments = [], hobbies = [] } = content
  const accent = settings.accentColor

  return (
    <div 
      className="flex flex-col" 
      style={{ 
        minHeight: '1123px',
        padding: `${tokens.mainPadding}px`, 
        gap: `${tokens.sectionGap}px`,
        backgroundColor: settings.backgroundColor || '#ffffff'
      }}
    >

      {/* ── HEADER — centré ornementé ── */}
      <header className="text-center" style={{ paddingBottom: `${tokens.sectionGap / 1.5}px` }}>
        {settings.photoUrl && (
          <div className="w-20 h-20 rounded-full overflow-hidden border mx-auto mb-5" style={{ borderColor: `${accent}40` }}>
            <img src={settings.photoUrl} alt="Profile" className="w-full h-full object-cover grayscale" />
          </div>
        )}

        {/* Ornement supérieur */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px flex-1 max-w-[60px]" style={{ backgroundColor: `${accent}40` }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
          <div className="h-px flex-1 max-w-[60px]" style={{ backgroundColor: `${accent}40` }} />
        </div>

        <h1 className="font-light tracking-[0.25em] uppercase text-zinc-950 mb-2" style={{ fontSize: `${tokens.nameSize + 2}px` }}>
          {personalInfo.fullName || "Votre Nom"}
        </h1>
        <p className="font-medium tracking-[0.3em] uppercase mb-4" style={{ color: accent, fontSize: `${tokens.jobTitleSize - 2}px` }}>
          {personalInfo.jobTitle || "Votre Poste"}
        </p>

        {/* Ornement inférieur */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px flex-1 max-w-[60px]" style={{ backgroundColor: `${accent}40` }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: `${accent}60` }} />
          <div className="h-px flex-1 max-w-[60px]" style={{ backgroundColor: `${accent}40` }} />
        </div>

        {/* Contact inline */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-zinc-500 font-sans" style={{ fontSize: `${tokens.bodySize - 1}px` }}>
          {personalInfo.email && <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" style={{ color: accent }} />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" style={{ color: accent }} />{personalInfo.phone}</span>}
          {personalInfo.address && <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" style={{ color: accent }} />{personalInfo.address}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1.5"><Globe2 className="h-3 w-3" style={{ color: accent }} />LinkedIn</span>}
        </div>

        {personalInfo.summary && (
          <p className="mt-6 text-zinc-600 leading-relaxed italic max-w-2xl mx-auto whitespace-pre-wrap" style={{ fontSize: `${tokens.bodySize}px` }}>
            « {personalInfo.summary} »
          </p>
        )}
      </header>

      {/* ── Section helper ── */}
      {/* Experiences */}
      {experiences.length > 0 && (
        <section>
          <OrnamentTitle title="Expériences Professionnelles" accent={accent} tokens={tokens} />
          <div className="flex flex-col" style={{ gap: `${tokens.entryGap}px` }}>
            {experiences.map((exp) => (
              <div key={exp.id} className="grid grid-cols-[1fr_3fr] gap-8">
                <div className="text-right pt-1">
                  <p className="text-zinc-400 font-sans leading-tight" style={{ fontSize: `${tokens.bodySize - 2}px` }}>
                    {exp.startDate}<br />— {exp.isCurrent ? "Présent" : exp.endDate}
                  </p>
                  <p className="font-medium text-zinc-500 font-sans mt-1" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{exp.company}</p>
                </div>
                <div className="border-l pl-6" style={{ borderColor: `${accent}25` }}>
                  <h3 className="font-semibold text-zinc-900 mb-2" style={{ fontSize: `${tokens.bodySize + 1}px` }}>{exp.position}</h3>
                  <p className="text-zinc-600 whitespace-pre-wrap leading-relaxed" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section>
          <OrnamentTitle title="Formation & Diplômes" accent={accent} tokens={tokens} />
          <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 1.5}px` }}>
            {education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-[1fr_3fr] gap-8">
                <div className="text-right pt-0.5">
                  <p className="text-zinc-400 font-sans" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{edu.startDate} — {edu.isCurrent ? "Présent" : edu.endDate}</p>
                </div>
                <div className="border-l pl-6" style={{ borderColor: `${accent}25` }}>
                  <h3 className="font-semibold text-zinc-900" style={{ fontSize: `${tokens.bodySize + 1}px` }}>{edu.degree}</h3>
                  <p className="text-zinc-500 font-sans" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{edu.institution}{edu.field ? ` · ${edu.field}` : ""}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Accomplishments */}
      {accomplishments.length > 0 && (
        <section>
          <OrnamentTitle title="Réalisations & Distinctions" accent={accent} tokens={tokens} />
          <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 1.5}px` }}>
            {accomplishments.map((acc) => (
              <div key={acc.id} className="grid grid-cols-[1fr_3fr] gap-8">
                <div className="text-right pt-0.5">
                  <p className="text-zinc-400 font-sans" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{acc.date}</p>
                </div>
                <div className="border-l pl-6" style={{ borderColor: `${accent}25` }}>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-3.5 w-3.5" style={{ color: accent }} />
                    <h3 className="font-semibold text-zinc-900" style={{ fontSize: `${tokens.bodySize + 1}px` }}>{acc.title}</h3>
                  </div>
                  {acc.description && <p className="text-zinc-600 mt-1" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{acc.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Languages — 2 col */}
      {(skills.length > 0 || languages.length > 0) && (
        <div className="grid grid-cols-2 gap-x-12">
          {skills.length > 0 && (
            <section>
              <OrnamentTitle title="Compétences" accent={accent} tokens={tokens} />
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="font-sans text-zinc-700 border-b" style={{ borderColor: `${accent}50`, fontSize: `${tokens.bodySize - 1}px` }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
          {languages.length > 0 && (
            <section>
              <OrnamentTitle title="Langues" accent={accent} tokens={tokens} />
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 2}px` }}>
                {languages.map((lang) => (
                  <div key={lang.id}>
                    <div className="flex justify-between items-center mb-1 font-sans">
                      <span className="font-medium text-zinc-700" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{lang.name}</span>
                      <span className="capitalize text-zinc-400 italic" style={{ fontSize: `${tokens.bodySize - 3}px` }}>{lang.level}</span>
                    </div>
                    <div className="h-px w-full bg-zinc-100 overflow-hidden">
                      <div className="h-full" style={{ width: `${LANG_LEVEL_PCT[lang.level] ?? 50}%`, backgroundColor: accent }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <OrnamentTitle title="Certifications" accent={accent} tokens={tokens} />
          <div className="grid grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-start border-b pb-2" style={{ borderColor: `${accent}15` }}>
                <div>
                  <div className="flex items-center gap-1.5">
                    <Medal className="h-3 w-3" style={{ color: accent }} />
                    <h3 className="font-semibold text-zinc-900" style={{ fontSize: `${tokens.bodySize}px` }}>{cert.name}</h3>
                    {cert.url && <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-zinc-600"><ExternalLink className="h-2.5 w-2.5" /></a>}
                  </div>
                  <p className="text-zinc-400 font-sans pl-4" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{cert.issuer}</p>
                </div>
                <span className="text-zinc-400 font-sans" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hobbies */}
      {hobbies.length > 0 && (
        <section className="text-center">
          <OrnamentTitle title="Centres d'intérêt" accent={accent} tokens={tokens} />
          <p className="text-zinc-400 italic font-sans" style={{ fontSize: `${tokens.bodySize - 1}px` }}>
            {hobbies.map(h => h.name).join("  ·  ")}
          </p>
        </section>
      )}

      {/* References */}
      {references.length > 0 && (
        <section>
          <OrnamentTitle title="Références" accent={accent} tokens={tokens} />
          <div className="grid grid-cols-2 gap-4">
            {references.map((ref) => (
              <div key={ref.id} className="p-3 border" style={{ borderColor: `${accent}20` }}>
                <p className="font-semibold text-zinc-900" style={{ fontSize: `${tokens.bodySize}px` }}>{ref.name}</p>
                {ref.position && <p className="text-zinc-500 font-sans" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{ref.position}</p>}
                {ref.company && <p className="text-zinc-400 font-sans" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{ref.company}</p>}
                {ref.email && <p className="font-sans mt-1" style={{ color: accent, fontSize: `${tokens.bodySize - 2}px` }}>{ref.email}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function OrnamentTitle({ title, accent, tokens }: { title: string, accent: string, tokens: TemplateTokens }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-3 h-px" style={{ backgroundColor: accent }} />
      <div className="w-1 h-1 rotate-45" style={{ backgroundColor: accent }} />
      <h2 className="font-light uppercase tracking-[0.2em] text-zinc-700" style={{ fontSize: `${tokens.sectionTitleSize}px` }}>{title}</h2>
      <div className="flex-1 h-px" style={{ backgroundColor: `${accent}20` }} />
    </div>
  )
}
