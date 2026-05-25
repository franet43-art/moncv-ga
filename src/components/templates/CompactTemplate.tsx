import { Mail, Phone, MapPin, Globe2, GraduationCap, Building2, Medal, Trophy, Heart, ExternalLink, Calendar } from "lucide-react"
import type { CVContent, CVSettings } from "@/types/cv"
import { TemplateTokens } from "@/lib/cv-design-tokens"

const SKILL_LEVEL_PCT: Record<string, number> = { debutant: 25, intermediaire: 50, avance: 75, expert: 100 }

export function CompactTemplate({ content, settings, tokens }: { content: CVContent, settings: CVSettings, tokens: TemplateTokens }) {
  const { personalInfo, experiences, education, skills, languages, references, certifications = [], accomplishments = [], hobbies = [] } = content
  const accent = settings.accentColor

  return (
    <div className="flex flex-col" style={{ minHeight: '1123px', padding: `${tokens.mainPadding}px`, gap: `${tokens.sectionGap * 0.8}px`, backgroundColor: settings.backgroundColor || '#ffffff' }}>

      {/* ── HEADER compact 2 colonnes ── */}
      <header className="grid grid-cols-2 gap-6 pb-5 border-b-2" style={{ borderColor: accent }}>
        {/* Col gauche : identité */}
        <div className="flex items-start gap-4">
          {settings.photoUrl && (
            <div className="w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0" style={{ borderColor: `${accent}40` }}>
              <img src={settings.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h1 className="font-black tracking-tight text-zinc-950 leading-none mb-1" style={{ fontSize: `${tokens.nameSize + 2}px` }}>
              {personalInfo.fullName || "Votre Nom"}
            </h1>
            <p className="font-bold uppercase tracking-widest" style={{ color: accent, fontSize: `${tokens.jobTitleSize - 2}px` }}>
              {personalInfo.jobTitle || "Votre Poste"}
            </p>
          </div>
        </div>
        {/* Col droite : contact */}
        <div className="flex flex-col justify-center gap-1 font-sans" style={{ fontSize: `${tokens.bodySize - 1}px`, color: "#52525b" }}>
          {personalInfo.email && <div className="flex items-center gap-1.5"><Mail className="h-3 w-3" style={{ color: accent }} />{personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" style={{ color: accent }} />{personalInfo.phone}</div>}
          {personalInfo.address && <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" style={{ color: accent }} />{personalInfo.address}</div>}
          {personalInfo.linkedin && <div className="flex items-center gap-1.5"><Globe2 className="h-3 w-3" style={{ color: accent }} />LinkedIn</div>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <p className="text-zinc-600 leading-relaxed whitespace-pre-wrap" style={{ fontSize: `${tokens.bodySize}px` }}>
          {personalInfo.summary}
        </p>
      )}

      {/* ── BODY 2 COLONNES ÉGALES ── */}
      <div className="grid grid-cols-2 gap-x-8" style={{ gap: `${tokens.sectionGap * 0.8}px` }}>

        {/* ─── COLONNE GAUCHE ─── */}
        <div className="flex flex-col" style={{ gap: `${tokens.sectionGap * 0.8}px` }}>

          {experiences.length > 0 && (
            <section>
              <CompactTitle title="Expériences" accent={accent} tokens={tokens} />
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap * 0.8}px` }}>
                {experiences.map((exp) => (
                  <div key={exp.id} className="border-l-2 pl-3" style={{ borderColor: `${accent}30` }}>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="font-bold text-zinc-950 leading-tight" style={{ fontSize: `${tokens.bodySize + 1}px` }}>{exp.position}</h3>
                      <span className="font-sans text-zinc-400 shrink-0 ml-1" style={{ fontSize: `${tokens.bodySize - 3}px` }}>{exp.startDate} — {exp.isCurrent ? "now" : exp.endDate}</span>
                    </div>
                    <p className="font-semibold text-zinc-500 font-sans mb-1" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{exp.company}</p>
                    <p className="text-zinc-600 whitespace-pre-wrap leading-snug" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <CompactTitle title="Formation" accent={accent} tokens={tokens} />
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 2}px` }}>
                {education.map((edu) => (
                  <div key={edu.id} className="flex gap-2 items-start">
                    <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${accent}15` }}>
                      <GraduationCap className="h-3.5 w-3.5" style={{ color: accent }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-zinc-900 truncate" style={{ fontSize: `${tokens.bodySize}px` }}>{edu.degree}</h3>
                        <span className="font-sans text-zinc-400 shrink-0 ml-1" style={{ fontSize: `${tokens.bodySize - 3}px` }}>{edu.startDate} — {edu.isCurrent ? "now" : edu.endDate}</span>
                      </div>
                      <p className="text-zinc-500 font-sans" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{edu.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {accomplishments.length > 0 && (
            <section>
              <CompactTitle title="Réalisations" accent={accent} tokens={tokens} />
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 2}px` }}>
                {accomplishments.map((acc) => (
                  <div key={acc.id} className="flex gap-2 items-start">
                    <Trophy className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: accent }} />
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-bold text-zinc-900" style={{ fontSize: `${tokens.bodySize}px` }}>{acc.title}</h3>
                        <span className="text-zinc-400 font-sans shrink-0" style={{ fontSize: `${tokens.bodySize - 3}px` }}>{acc.date}</span>
                      </div>
                      {acc.description && <p className="text-zinc-600 leading-snug" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{acc.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ─── COLONNE DROITE ─── */}
        <div className="flex flex-col" style={{ gap: `${tokens.sectionGap * 0.8}px` }}>

          {skills.length > 0 && (
            <section>
              <CompactTitle title="Compétences" accent={accent} tokens={tokens} />
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 2.5}px` }}>
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-0.5 font-sans">
                      <span className="font-medium text-zinc-700" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{skill.name}</span>
                      {skill.level && <span className="capitalize text-zinc-400" style={{ fontSize: `${tokens.bodySize - 3}px` }}>{skill.level}</span>}
                    </div>
                    <div className="h-1 w-full rounded-full bg-zinc-100 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${SKILL_LEVEL_PCT[skill.level ?? "intermediaire"] ?? 50}%`, backgroundColor: accent }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <CompactTitle title="Langues" accent={accent} tokens={tokens} />
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 2.5}px` }}>
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center font-sans">
                    <span className="font-medium text-zinc-700" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{lang.name}</span>
                    <span className="capitalize text-zinc-400 italic" style={{ fontSize: `${tokens.bodySize - 3}px` }}>{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <CompactTitle title="Certifications" accent={accent} tokens={tokens} />
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 2}px` }}>
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Medal className="h-3 w-3" style={{ color: accent }} />
                        <h3 className="font-bold text-zinc-900" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{cert.name}</h3>
                        {cert.url && <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-zinc-600"><ExternalLink className="h-2.5 w-2.5" /></a>}
                      </div>
                      <p className="text-zinc-400 font-sans pl-4" style={{ fontSize: `${tokens.bodySize - 3}px` }}>{cert.issuer}</p>
                    </div>
                    <span className="text-zinc-400 font-sans shrink-0 ml-1" style={{ fontSize: `${tokens.bodySize - 3}px` }}>{cert.date}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {hobbies.length > 0 && (
            <section>
              <CompactTitle title="Intérêts" accent={accent} tokens={tokens} />
              <div className="flex flex-wrap gap-1.5">
                {hobbies.map((h) => (
                  <span key={h.id} className="flex items-center gap-1 font-sans text-zinc-500" style={{ fontSize: `${tokens.bodySize - 2}px` }}>
                    <Heart className="h-2.5 w-2.5 opacity-40" />{h.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {references.length > 0 && (
            <section>
              <CompactTitle title="Références" accent={accent} tokens={tokens} />
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 2}px` }}>
                {references.map((ref) => (
                  <div key={ref.id} className="p-2 rounded border border-zinc-100 bg-zinc-50/50">
                    <p className="font-bold text-zinc-900" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{ref.name}</p>
                    {ref.position && <p className="text-zinc-500 font-sans" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{ref.position}</p>}
                    {ref.email && <p className="font-sans" style={{ color: accent, fontSize: `${tokens.bodySize - 3}px` }}>{ref.email}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

function CompactTitle({ title, accent, tokens }: { title: string, accent: string, tokens: TemplateTokens }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="h-3 w-0.5 rounded-full" style={{ backgroundColor: accent }} />
      <h2 className="font-black uppercase tracking-widest text-zinc-800" style={{ fontSize: `${tokens.sectionTitleSize - 1}px` }}>{title}</h2>
      <div className="flex-1 h-px bg-zinc-100" />
    </div>
  )
}
