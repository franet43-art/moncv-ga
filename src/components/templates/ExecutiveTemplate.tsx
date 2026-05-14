import { Mail, Phone, MapPin, Globe2, Calendar, GraduationCap, Building2, Medal, Trophy, Heart, ExternalLink, Briefcase } from "lucide-react"
import type { CVContent, CVSettings } from "@/types/cv"
import { TemplateTokens } from "@/lib/cv-design-tokens"

export function ExecutiveTemplate({ content, settings, tokens }: { content: CVContent, settings: CVSettings, tokens: TemplateTokens }) {
  const { personalInfo, experiences, education, skills, languages, references, certifications = [], accomplishments = [], hobbies = [] } = content
  const accent = settings.accentColor

  return (
    <div className="flex flex-col min-h-[1050px] bg-white">
      {/* ── TOP ACCENT BAND ── */}
      <div className="h-2 w-full" style={{ backgroundColor: accent }} />

      {/* ── HEADER ── */}
      <header className="px-10 py-8 border-b border-zinc-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            {settings.photoUrl && (
              <div className="w-20 h-20 rounded-sm overflow-hidden border-2 flex-shrink-0" style={{ borderColor: accent }}>
                <img src={settings.photoUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <h1 className="font-black uppercase tracking-tight text-zinc-950 leading-none mb-1" style={{ fontSize: `${tokens.nameSize + 4}px` }}>
                {personalInfo.fullName || "Votre Nom"}
              </h1>
              <p className="font-semibold uppercase tracking-[0.2em]" style={{ color: accent, fontSize: `${tokens.jobTitleSize - 1}px` }}>
                {personalInfo.jobTitle || "Votre Poste"}
              </p>
            </div>
          </div>

          {/* Contact bloc */}
          <div className="flex flex-col items-end gap-1.5 font-sans" style={{ fontSize: `${tokens.bodySize - 1}px`, color: "#52525b" }}>
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <span>{personalInfo.email}</span>
                <Mail className="h-3 w-3" style={{ color: accent }} />
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <span>{personalInfo.phone}</span>
                <Phone className="h-3 w-3" style={{ color: accent }} />
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center gap-2">
                <span>{personalInfo.address}</span>
                <MapPin className="h-3 w-3" style={{ color: accent }} />
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <span>LinkedIn</span>
                <Globe2 className="h-3 w-3" style={{ color: accent }} />
              </div>
            )}
          </div>
        </div>

        {/* Summary under header */}
        {personalInfo.summary && (
          <p className="mt-5 text-zinc-600 leading-relaxed border-l-4 pl-4" style={{ borderColor: accent, fontSize: `${tokens.bodySize}px` }}>
            {personalInfo.summary}
          </p>
        )}
      </header>

      {/* ── BODY 2 COLUMNS ── */}
      <div className="flex flex-1">
        {/* LEFT — Main content */}
        <main className="flex-1 flex flex-col px-10 py-7" style={{ gap: `${tokens.sectionGap}px` }}>

          {/* Experiences */}
          {experiences.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="h-4 w-4" style={{ color: accent }} />
                <h2 className="font-black uppercase tracking-[0.15em] text-zinc-900" style={{ fontSize: `${tokens.sectionTitleSize}px` }}>
                  Expériences Professionnelles
                </h2>
                <div className="flex-1 h-px bg-zinc-200" />
              </div>
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap}px` }}>
                {experiences.map((exp) => (
                  <div key={exp.id} className="group">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="font-bold text-zinc-950" style={{ fontSize: `${tokens.bodySize + 2}px` }}>{exp.position}</h3>
                      <span className="font-sans text-zinc-400 flex items-center gap-1" style={{ fontSize: `${tokens.bodySize - 2}px` }}>
                        <Calendar className="h-3 w-3" />
                        {exp.startDate} — {exp.isCurrent ? "Présent" : exp.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Building2 className="h-3 w-3 text-zinc-400" />
                      <span className="font-semibold text-zinc-500 font-sans" style={{ fontSize: `${tokens.bodySize}px` }}>{exp.company}</span>
                    </div>
                    <p className="text-zinc-600 whitespace-pre-wrap leading-relaxed pl-4 border-l border-zinc-100" style={{ fontSize: `${tokens.bodySize - 1}px` }}>
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Accomplishments */}
          {accomplishments.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="h-4 w-4" style={{ color: accent }} />
                <h2 className="font-black uppercase tracking-[0.15em] text-zinc-900" style={{ fontSize: `${tokens.sectionTitleSize}px` }}>
                  Réalisations Clés
                </h2>
                <div className="flex-1 h-px bg-zinc-200" />
              </div>
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 1.5}px` }}>
                {accomplishments.map((acc) => (
                  <div key={acc.id} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: accent }} />
                    <div>
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-bold text-zinc-900" style={{ fontSize: `${tokens.bodySize + 1}px` }}>{acc.title}</h3>
                        <span className="text-zinc-400 font-sans" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{acc.date}</span>
                      </div>
                      {acc.description && (
                        <p className="text-zinc-600 leading-normal" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{acc.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {references.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="font-black uppercase tracking-[0.15em] text-zinc-900" style={{ fontSize: `${tokens.sectionTitleSize}px` }}>Références</h2>
                <div className="flex-1 h-px bg-zinc-200" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {references.map((ref) => (
                  <div key={ref.id} className="p-3 rounded border border-zinc-100 bg-zinc-50/60">
                    <p className="font-bold text-zinc-900" style={{ fontSize: `${tokens.bodySize}px` }}>{ref.name}</p>
                    {ref.position && <p className="text-zinc-500 font-sans" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{ref.position}</p>}
                    {ref.company && <p className="text-zinc-400 font-sans" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{ref.company}</p>}
                    {ref.email && <p className="font-sans font-medium mt-1" style={{ color: accent, fontSize: `${tokens.bodySize - 2}px` }}>{ref.email}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="flex flex-col py-7 px-6 border-l border-zinc-100 bg-zinc-50/40" style={{ width: "34%", gap: `${tokens.sectionGap}px` }}>

          {/* Education */}
          {education.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-3.5 w-3.5" style={{ color: accent }} />
                <h2 className="font-black uppercase tracking-wider text-zinc-700" style={{ fontSize: `${tokens.sectionTitleSize - 1}px` }}>Formation</h2>
              </div>
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 1.5}px` }}>
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-zinc-900" style={{ fontSize: `${tokens.bodySize}px` }}>{edu.degree}</h3>
                    <p className="text-zinc-500 font-sans" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{edu.institution}</p>
                    <p className="text-zinc-400 font-sans" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{edu.startDate} — {edu.isCurrent ? "Présent" : edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="font-black uppercase tracking-wider text-zinc-700" style={{ fontSize: `${tokens.sectionTitleSize - 1}px` }}>Compétences</h2>
              </div>
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 2}px` }}>
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1 font-sans">
                      <span className="font-medium text-zinc-700" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{skill.name}</span>
                      {skill.level && <span className="text-zinc-400 capitalize" style={{ fontSize: `${tokens.bodySize - 3}px` }}>{skill.level}</span>}
                    </div>
                    <div className="h-1 w-full rounded-full bg-zinc-200 overflow-hidden">
                      <div className="h-full rounded-full" style={{
                        backgroundColor: accent,
                        width: skill.level === "expert" ? "100%" : skill.level === "avance" ? "75%" : skill.level === "intermediaire" ? "50%" : "25%"
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="font-black uppercase tracking-wider text-zinc-700" style={{ fontSize: `${tokens.sectionTitleSize - 1}px` }}>Langues</h2>
              </div>
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 2}px` }}>
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center font-sans">
                    <span className="font-medium text-zinc-700" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{lang.name}</span>
                    <span className="capitalize text-zinc-400" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Medal className="h-3.5 w-3.5" style={{ color: accent }} />
                <h2 className="font-black uppercase tracking-wider text-zinc-700" style={{ fontSize: `${tokens.sectionTitleSize - 1}px` }}>Certifications</h2>
              </div>
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 2}px` }}>
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-zinc-900" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{cert.name}</h3>
                      {cert.url && (
                        <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-zinc-600">
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-zinc-400 font-sans" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{cert.issuer} · {cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Hobbies */}
          {hobbies.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Heart className="h-3.5 w-3.5" style={{ color: accent }} />
                <h2 className="font-black uppercase tracking-wider text-zinc-700" style={{ fontSize: `${tokens.sectionTitleSize - 1}px` }}>Intérêts</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {hobbies.map((h) => (
                  <span key={h.id} className="px-2 py-0.5 rounded-full border border-zinc-200 text-zinc-500 font-sans" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{h.name}</span>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>

      {/* ── BOTTOM ACCENT BAND ── */}
      <div className="h-1 w-full opacity-40" style={{ backgroundColor: accent }} />
    </div>
  )
}
