import { Mail, Phone, MapPin, Globe2, GraduationCap, Building2, Medal, Trophy, Heart, ExternalLink, Terminal } from "lucide-react"
import type { CVContent, CVSettings } from "@/types/cv"
import { TemplateTokens } from "@/lib/cv-design-tokens"

const SKILL_LEVEL_LABEL: Record<string, string> = {
  debutant: "junior", intermediaire: "mid", avance: "senior", expert: "expert"
}

const LANG_LEVEL_PCT: Record<string, number> = {
  basique: 20, intermediaire: 45, courant: 70, bilingue: 90, natif: 100
}

export function TechTemplate({ content, settings, tokens }: { content: CVContent, settings: CVSettings, tokens: TemplateTokens }) {
  const { personalInfo, experiences, education, skills, languages, references, certifications = [], accomplishments = [], hobbies = [] } = content
  const accent = settings.accentColor

  return (
    <div className="flex flex-col bg-white" style={{ minHeight: '1123px' }}>
      {/* ── DARK HEADER (viewer only — PDF will use white+accent) ── */}
      <header style={{ 
        backgroundColor: '#09090b', 
        color: 'white', 
        paddingLeft: '40px', 
        paddingRight: '40px', 
        paddingTop: '32px', 
        paddingBottom: '32px' 
      }}>
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-5">
            {settings.photoUrl && (
              <div className="w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0" style={{ borderColor: accent }}>
                <img src={settings.photoUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Terminal className="h-4 w-4" style={{ color: accent }} />
                <span className="font-mono text-xs text-zinc-500 tracking-wider">const dev =</span>
              </div>
              <h1 className="font-black tracking-tight text-white leading-none mb-2" style={{ fontSize: `${tokens.nameSize + 4}px` }}>
                {personalInfo.fullName || "Votre Nom"}
              </h1>
              <p className="font-mono font-medium" style={{ color: accent, fontSize: `${tokens.jobTitleSize - 1}px` }}>
                &lt;{personalInfo.jobTitle || "Votre Poste"} /&gt;
              </p>
            </div>
          </div>
          {/* Contact right */}
          <div className="flex flex-col gap-1.5 font-mono text-zinc-400 text-right" style={{ fontSize: `${tokens.bodySize - 1}px` }}>
            {personalInfo.email && <div className="flex items-center gap-2 justify-end"><span>{personalInfo.email}</span><Mail className="h-3 w-3" style={{ color: accent }} /></div>}
            {personalInfo.phone && <div className="flex items-center gap-2 justify-end"><span>{personalInfo.phone}</span><Phone className="h-3 w-3" style={{ color: accent }} /></div>}
            {personalInfo.address && <div className="flex items-center gap-2 justify-end"><span>{personalInfo.address}</span><MapPin className="h-3 w-3" style={{ color: accent }} /></div>}
            {personalInfo.linkedin && <div className="flex items-center gap-2 justify-end"><span>LinkedIn</span><Globe2 className="h-3 w-3" style={{ color: accent }} /></div>}
          </div>
        </div>

        {personalInfo.summary && (
          <p className="mt-5 text-zinc-400 leading-relaxed font-mono text-sm border-l-2 pl-4" style={{ borderColor: accent, fontSize: `${tokens.bodySize}px` }}>
            // {personalInfo.summary}
          </p>
        )}
      </header>

      {/* ── SKILLS BAR (accent strip) ── */}
      {skills.length > 0 && (
        <div className="px-10 py-4 border-b border-zinc-100" style={{ backgroundColor: `${accent}08` }}>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono font-bold border" style={{
                fontSize: `${tokens.bodySize - 2}px`,
                color: accent,
                borderColor: `${accent}30`,
                backgroundColor: `${accent}10`
              }}>
                {skill.name}
                {skill.level && <span className="opacity-50 uppercase text-[9px]">{SKILL_LEVEL_LABEL[skill.level]}</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── BODY ── */}
      <div className="flex flex-1">
        {/* LEFT — Experiences & Education */}
        <main className="flex-1 flex flex-col px-10 py-7" style={{ gap: `${tokens.sectionGap}px` }}>

          {experiences.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono font-bold" style={{ color: accent, fontSize: `${tokens.sectionTitleSize}px` }}>./expériences</span>
                <div className="flex-1 h-px bg-zinc-100" />
              </div>
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap}px` }}>
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-5 border-l-2 border-zinc-100">
                    <div className="absolute -left-1.5 top-2 w-2.5 h-2.5 rounded-sm rotate-45" style={{ backgroundColor: accent }} />
                    <div className="flex justify-between items-start mb-0.5">
                      <h3 className="font-black text-zinc-950" style={{ fontSize: `${tokens.bodySize + 2}px` }}>{exp.position}</h3>
                      <span className="font-mono text-zinc-400 shrink-0 ml-2" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{exp.startDate} → {exp.isCurrent ? "now" : exp.endDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Building2 className="h-3 w-3 text-zinc-400" />
                      <span className="font-mono font-bold text-zinc-500" style={{ fontSize: `${tokens.bodySize}px` }}>{exp.company}</span>
                    </div>
                    <p className="text-zinc-600 whitespace-pre-wrap leading-relaxed" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono font-bold" style={{ color: accent, fontSize: `${tokens.sectionTitleSize}px` }}>./formation</span>
                <div className="flex-1 h-px bg-zinc-100" />
              </div>
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 1.5}px` }}>
                {education.map((edu) => (
                  <div key={edu.id} className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accent}15` }}>
                      <GraduationCap className="h-4 w-4" style={{ color: accent }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-zinc-900" style={{ fontSize: `${tokens.bodySize + 1}px` }}>{edu.degree}</h3>
                        <span className="font-mono text-zinc-400 shrink-0 ml-2" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{edu.startDate} — {edu.isCurrent ? "now" : edu.endDate}</span>
                      </div>
                      <p className="text-zinc-500 font-mono" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{edu.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {accomplishments.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono font-bold" style={{ color: accent, fontSize: `${tokens.sectionTitleSize}px` }}>./réalisations</span>
                <div className="flex-1 h-px bg-zinc-100" />
              </div>
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 1.5}px` }}>
                {accomplishments.map((acc) => (
                  <div key={acc.id} className="flex gap-3">
                    <Trophy className="h-4 w-4 shrink-0 mt-0.5" style={{ color: accent }} />
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-bold text-zinc-900" style={{ fontSize: `${tokens.bodySize + 1}px` }}>{acc.title}</h3>
                        <span className="text-zinc-400 font-mono" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{acc.date}</span>
                      </div>
                      {acc.description && <p className="text-zinc-600" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{acc.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="flex flex-col py-7 px-5 border-l border-zinc-100" style={{ width: "32%", gap: `${tokens.sectionGap}px` }}>

          {languages.length > 0 && (
            <section>
              <span className="font-mono font-bold block mb-3" style={{ color: accent, fontSize: `${tokens.sectionTitleSize}px` }}>./langues</span>
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 1.5}px` }}>
                {languages.map((lang) => (
                  <div key={lang.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-zinc-900" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{lang.name}</span>
                      <span className="font-mono text-zinc-400 capitalize" style={{ fontSize: `${tokens.bodySize - 3}px` }}>{lang.level}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${LANG_LEVEL_PCT[lang.level] ?? 50}%`, backgroundColor: accent }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <span className="font-mono font-bold block mb-3" style={{ color: accent, fontSize: `${tokens.sectionTitleSize}px` }}>./certs</span>
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 1.5}px` }}>
                {certifications.map((cert) => (
                  <div key={cert.id} className="p-2.5 rounded-md border border-zinc-100" style={{ backgroundColor: `${accent}06` }}>
                    <div className="flex items-center gap-1.5">
                      <Medal className="h-3 w-3" style={{ color: accent }} />
                      <span className="font-bold text-zinc-900" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{cert.name}</span>
                      {cert.url && <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-zinc-600 ml-auto"><ExternalLink className="h-2.5 w-2.5" /></a>}
                    </div>
                    <p className="text-zinc-400 font-mono pl-4" style={{ fontSize: `${tokens.bodySize - 3}px` }}>{cert.issuer} · {cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {references.length > 0 && (
            <section>
              <span className="font-mono font-bold block mb-3" style={{ color: accent, fontSize: `${tokens.sectionTitleSize}px` }}>./refs</span>
              <div className="flex flex-col" style={{ gap: `${tokens.entryGap / 1.5}px` }}>
                {references.map((ref) => (
                  <div key={ref.id} className="p-2.5 rounded-md border border-zinc-100">
                    <p className="font-bold text-zinc-900" style={{ fontSize: `${tokens.bodySize - 1}px` }}>{ref.name}</p>
                    {ref.position && <p className="text-zinc-500" style={{ fontSize: `${tokens.bodySize - 2}px` }}>{ref.position}</p>}
                    {ref.email && <p className="font-mono mt-0.5" style={{ color: accent, fontSize: `${tokens.bodySize - 3}px` }}>{ref.email}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {hobbies.length > 0 && (
            <section>
              <span className="font-mono font-bold block mb-3" style={{ color: accent, fontSize: `${tokens.sectionTitleSize}px` }}>./intérêts</span>
              <div className="flex flex-wrap gap-1.5">
                {hobbies.map((h) => (
                  <span key={h.id} className="flex items-center gap-1 font-mono text-zinc-500" style={{ fontSize: `${tokens.bodySize - 2}px` }}>
                    <Heart className="h-2.5 w-2.5 opacity-40" />{h.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  )
}
