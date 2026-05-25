import { Mail, Phone, MapPin, Globe2, GraduationCap, Building2, Medal, Trophy, Heart, ExternalLink, Star } from "lucide-react"
import type { CVContent, CVSettings } from "@/types/cv"
import { TemplateTokens } from "@/lib/cv-design-tokens"

const SKILL_LEVEL_PCT: Record<string, number> = { debutant: 25, intermediaire: 50, avance: 75, expert: 100 }

export function CreativeTemplate({ content, settings, tokens }: { content: CVContent, settings: CVSettings, tokens: TemplateTokens }) {
  const { personalInfo, experiences, education, skills, languages, references, certifications = [], accomplishments = [], hobbies = [] } = content
  const accent = settings.accentColor

  return (
    <div className="flex" style={{ minHeight: '1123px' }}>
      {/* ── MAIN LEFT ── */}
      <main className="flex-1 flex flex-col" style={{ backgroundColor: settings.backgroundColor || '#ffffff', padding: `${tokens.mainPadding}px`, gap: `${tokens.sectionGap}px` }}>
        <header>
          {settings.photoUrl && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 mb-4" style={{ borderColor: `${accent}30` }}>
              <img src={settings.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
          <h1 className="font-black leading-none text-zinc-950 mb-1" style={{ fontSize: `${tokens.nameSize + 6}px` }}>{personalInfo.fullName || "Votre Nom"}</h1>
          <p className="font-bold tracking-widest uppercase mb-4" style={{ color: accent, fontSize: `${tokens.jobTitleSize - 1}px` }}>{personalInfo.jobTitle || "Votre Poste"}</p>
          {personalInfo.summary && <p className="text-zinc-600 leading-relaxed whitespace-pre-wrap" style={{ fontSize: `${tokens.bodySize}px` }}>{personalInfo.summary}</p>}
        </header>

        {experiences.length > 0 && (
          <section>
            <h2 className="font-black uppercase tracking-widest mb-4 pb-2 border-b-2" style={{ color: accent, borderColor: `${accent}20`, fontSize: `${tokens.sectionTitleSize}px` }}>Expériences</h2>
            <div className="flex flex-col" style={{ gap: `${tokens.entryGap}px` }}>
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-5" style={{ borderLeft: `3px solid ${accent}20` }}>
                  <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full border-2 border-white" style={{ backgroundColor: accent }} />
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className="font-black text-zinc-950" style={{ fontSize: `${tokens.bodySize + 2}px` }}>{exp.position}</h3>
                    <span className="font-sans text-zinc-400 shrink-0 ml-2" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{exp.startDate} — {exp.isCurrent ? "Présent" : exp.endDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Building2 className="h-3 w-3 opacity-40" />
                    <span className="font-bold text-zinc-500 font-sans" style={{ fontSize: `${tokens.bodySize}px` }}>{exp.company}</span>
                  </div>
                  <p className="text-zinc-600 whitespace-pre-wrap leading-relaxed" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="font-black uppercase tracking-widest mb-4 pb-2 border-b-2" style={{ color: accent, borderColor: `${accent}20`, fontSize: `${tokens.sectionTitleSize}px` }}>Formation</h2>
            <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 1.5}px` }}>
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${accent}15` }}>
                      <GraduationCap className="h-4 w-4" style={{ color: accent }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900" style={{ fontSize: `${tokens.bodySize + 1}px` }}>{edu.degree}</h3>
                      <p className="text-zinc-500 font-sans" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{edu.institution}{edu.field ? ` · ${edu.field}` : ""}</p>
                    </div>
                  </div>
                  <span className="text-zinc-400 font-sans shrink-0 ml-2" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{edu.startDate} — {edu.isCurrent ? "Présent" : edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {accomplishments.length > 0 && (
          <section>
            <h2 className="font-black uppercase tracking-widest mb-4 pb-2 border-b-2" style={{ color: accent, borderColor: `${accent}20`, fontSize: `${tokens.sectionTitleSize}px` }}>Réalisations</h2>
            <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 1.5}px` }}>
              {accomplishments.map((acc) => (
                <div key={acc.id} className="flex gap-3">
                  <Trophy className="h-4 w-4 shrink-0 mt-0.5" style={{ color: accent }} />
                  <div>
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-bold text-zinc-900" style={{ fontSize: `${tokens.bodySize + 1}px` }}>{acc.title}</h3>
                      <span className="text-zinc-400 font-sans" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{acc.date}</span>
                    </div>
                    {acc.description && <p className="text-zinc-600 leading-normal" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{acc.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {references.length > 0 && (
          <section>
            <h2 className="font-black uppercase tracking-widest mb-4 pb-2 border-b-2" style={{ color: accent, borderColor: `${accent}20`, fontSize: `${tokens.sectionTitleSize}px` }}>Références</h2>
            <div className="grid grid-cols-2 gap-3">
              {references.map((ref) => (
                <div key={ref.id} className="p-3 rounded-xl border" style={{ borderColor: `${accent}20`, backgroundColor: `${accent}05` }}>
                  <p className="font-bold text-zinc-900" style={{ fontSize: `${tokens.bodySize}px` }}>{ref.name}</p>
                  {ref.position && <p className="text-zinc-500 font-sans" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{ref.position}</p>}
                  {ref.company && <p className="text-zinc-400 font-sans" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{ref.company}</p>}
                  {ref.email && <p className="font-bold font-sans mt-1" style={{ color: accent, fontSize: `${tokens.bodySize - 2}px` }}>{ref.email}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ── RIGHT SIDEBAR ── */}
      <aside className="flex flex-col text-white flex-shrink-0" style={{ width: tokens.sidebarWidth, padding: `${tokens.sidebarPadding}px`, gap: `${tokens.sectionGap}px`, backgroundColor: accent }}>
        <section className="space-y-3">
          <h2 className="font-black uppercase tracking-widest border-b border-white/20 pb-2" style={{ fontSize: `${tokens.sectionTitleSize}px` }}>Contact</h2>
          <div className="space-y-2.5 font-sans" style={{ fontSize: `${tokens.bodySize}px` }}>
            {personalInfo.email && <div className="flex items-start gap-2.5"><Mail className="h-4 w-4 text-white/60 shrink-0 mt-0.5" /><span className="break-all">{personalInfo.email}</span></div>}
            {personalInfo.phone && <div className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-white/60" /><span>{personalInfo.phone}</span></div>}
            {personalInfo.address && <div className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-white/60" /><span>{personalInfo.address}</span></div>}
            {personalInfo.linkedin && <div className="flex items-center gap-2.5"><Globe2 className="h-4 w-4 text-white/60" /><span>LinkedIn</span></div>}
          </div>
        </section>

        {skills.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-black uppercase tracking-widest border-b border-white/20 pb-2" style={{ fontSize: `${tokens.sectionTitleSize}px` }}>Compétences</h2>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between items-center mb-1" style={{ fontSize: `${tokens.bodySize - 1}px` }}>
                    <span className="font-bold">{skill.name}</span>
                    <span className="opacity-60 font-sans capitalize">{skill.level}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${SKILL_LEVEL_PCT[skill.level ?? "intermediaire"] ?? 50}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-black uppercase tracking-widest border-b border-white/20 pb-2" style={{ fontSize: `${tokens.sectionTitleSize}px` }}>Langues</h2>
            <div className="space-y-2">
              {languages.map((lang) => {
                const dots = lang.level === "natif" || lang.level === "bilingue" ? 5 : lang.level === "courant" ? 4 : lang.level === "intermediaire" ? 3 : 2
                return (
                  <div key={lang.id} className="flex justify-between items-center font-sans" style={{ fontSize: `${tokens.bodySize - 1}px` }}>
                    <span className="font-bold">{lang.name}</span>
                    <div className="flex gap-1">{[1,2,3,4,5].map((d) => <div key={d} className="w-2 h-2 rounded-full" style={{ backgroundColor: d <= dots ? "white" : "rgba(255,255,255,0.25)" }} />)}</div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-black uppercase tracking-widest border-b border-white/20 pb-2" style={{ fontSize: `${tokens.sectionTitleSize}px` }}>Certifications</h2>
            <div className="space-y-2.5" style={{ fontSize: `${tokens.bodySize - 1}px` }}>
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <div className="flex items-center gap-1.5">
                    <Medal className="h-3 w-3 opacity-70" />
                    <span className="font-bold">{cert.name}</span>
                    {cert.url && <a href={cert.url} target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-80"><ExternalLink className="h-2.5 w-2.5" /></a>}
                  </div>
                  <p className="opacity-60 font-sans pl-4" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{cert.issuer} · {cert.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {hobbies.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-black uppercase tracking-widest border-b border-white/20 pb-2" style={{ fontSize: `${tokens.sectionTitleSize}px` }}>Loisirs</h2>
            <div className="flex flex-wrap gap-2">
              {hobbies.map((h) => (
                <span key={h.id} className="flex items-center gap-1.5 font-sans" style={{ fontSize: `${tokens.bodySize - 1}px` }}>
                  <Star className="h-2.5 w-2.5 opacity-50" />{h.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </aside>
    </div>
  )
}
