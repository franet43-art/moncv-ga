import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { PDFPhoto } from './shared/pdf-photo'
import { sanitizeForPDF } from './pdf-document'
import { MailIcon, PhoneIcon, MapPinIcon, GlobeIcon } from '@/lib/pdf/pdf-icons'
import { getTokens } from '@/lib/cv-design-tokens'

interface CompactPDFProps { content: CVContent; settings: CVSettings }

const SKILL_LEVEL_PCT: Record<string, number> = { debutant: 25, intermediaire: 50, avance: 75, expert: 100 }

export function CompactPDF({ content, settings }: CompactPDFProps) {
  const { personalInfo, experiences = [], education = [], skills = [], languages = [], references = [], certifications = [], accomplishments = [], hobbies = [] } = content
  const tokens = getTokens(settings.fontSize as any)
  const accent = settings?.accentColor || '#6C63FF'
  const photoUrl = settings?.photoUrl
  const hasPhoto = !!(photoUrl && String(photoUrl).trim())

  const s = StyleSheet.create({
    page: { flexDirection: 'column', backgroundColor: '#ffffff', color: '#18181b' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: tokens.mainPadding, paddingBottom: tokens.entryGap, borderBottomWidth: 2, borderBottomColor: accent },
    headerLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, flex: 1 },
    photo: { width: 48, height: 48, borderRadius: 6, borderWidth: 2, borderColor: `${accent}60`, overflow: 'hidden', flexShrink: 0 },
    name: { fontSize: tokens.nameSize + 2, fontWeight: 'bold', color: '#09090b', marginBottom: 2 },
    jobTitle: { fontSize: tokens.jobTitleSize - 2, fontWeight: 'bold', color: accent, textTransform: 'uppercase', letterSpacing: 1.5 },
    contactCol: { flexDirection: 'column', gap: 4 },
    contactItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    contactText: { fontSize: tokens.bodySize - 1, color: '#52525b' },
    summary: { fontSize: tokens.bodySize, color: '#52525b', lineHeight: 1.5, paddingHorizontal: tokens.mainPadding, marginTop: tokens.entryGap / 2, marginBottom: tokens.entryGap / 2 },
    body: { flexDirection: 'row', paddingHorizontal: tokens.mainPadding, paddingTop: tokens.entryGap, gap: 20 },
    leftCol: { flex: 1, gap: tokens.sectionGap * 0.8 },
    rightCol: { flex: 1, gap: tokens.sectionGap * 0.8 },
    stRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: tokens.entryGap / 2 },
    stBar: { width: 2, height: 10, borderRadius: 1, backgroundColor: accent },
    stText: { fontSize: tokens.sectionTitleSize - 1, fontWeight: 'bold', color: '#18181b', textTransform: 'uppercase', letterSpacing: 1.2 },
    stTrail: { flex: 1, height: 0.5, backgroundColor: '#f4f4f5' },
    expItem: { borderLeftWidth: 2, borderLeftColor: `${accent}40`, paddingLeft: 8, marginBottom: tokens.entryGap * 0.8 },
    expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 1 },
    expPosition: { fontSize: tokens.bodySize + 1, fontWeight: 'bold', color: '#09090b', flex: 1, paddingRight: 4 },
    expDate: { fontSize: tokens.bodySize - 3, color: '#a1a1aa', flexShrink: 0 },
    expCompany: { fontSize: tokens.bodySize - 1, fontWeight: 'bold', color: '#71717a', marginBottom: 2 },
    expDesc: { fontSize: tokens.bodySize - 1, color: '#52525b', lineHeight: 1.4 },
    eduItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginBottom: tokens.entryGap / 2 },
    eduDegree: { fontSize: tokens.bodySize, fontWeight: 'bold', color: '#09090b' },
    eduInst: { fontSize: tokens.bodySize - 2, color: '#71717a' },
    eduDate: { fontSize: tokens.bodySize - 3, color: '#a1a1aa' },
    skillRow: { marginBottom: 6 },
    skillHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
    skillName: { fontSize: tokens.bodySize - 1, color: '#52525b' },
    skillLevel: { fontSize: tokens.bodySize - 3, color: '#a1a1aa', textTransform: 'capitalize' },
    skillBar: { height: 3, backgroundColor: '#f4f4f5', borderRadius: 1.5, overflow: 'hidden' },
    skillFill: { height: 3, backgroundColor: accent, borderRadius: 1.5 },
    langRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    langName: { fontSize: tokens.bodySize - 1, fontWeight: 'bold', color: '#52525b' },
    langLevel: { fontSize: tokens.bodySize - 3, color: '#a1a1aa', fontStyle: 'italic', textTransform: 'capitalize' },
    certItem: { marginBottom: tokens.entryGap / 2 },
    certName: { fontSize: tokens.bodySize - 1, fontWeight: 'bold', color: '#09090b', marginBottom: 1 },
    certIssuer: { fontSize: tokens.bodySize - 3, color: '#a1a1aa' },
    hobbyRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
    hobbyText: { fontSize: tokens.bodySize - 2, color: '#71717a' },
    refCard: { padding: 6, borderWidth: 0.5, borderColor: '#f4f4f5', borderRadius: 4, backgroundColor: '#fafafa', marginBottom: 6 },
    refName: { fontSize: tokens.bodySize - 1, fontWeight: 'bold', color: '#09090b', marginBottom: 1 },
    refPos: { fontSize: tokens.bodySize - 2, color: '#71717a' },
    refEmail: { fontSize: tokens.bodySize - 3, color: accent, fontWeight: 'bold', marginTop: 2 },
    accItem: { flexDirection: 'row', gap: 4, marginBottom: tokens.entryGap / 2 },
    accTitle: { fontSize: tokens.bodySize, fontWeight: 'bold', color: '#09090b' },
    accDate: { fontSize: tokens.bodySize - 3, color: '#a1a1aa' },
    accDesc: { fontSize: tokens.bodySize - 2, color: '#52525b' },
  })

  const ST = ({ title }: { title: string }) => (
    <View style={s.stRow}><View style={s.stBar} /><Text style={s.stText}>{title}</Text><View style={s.stTrail} /></View>
  )

  return (
    <View>
      <View style={s.header}>
        <View style={s.headerLeft}>
          {hasPhoto && <View style={s.photo}><PDFPhoto src={photoUrl} style={{ width: 48, height: 48 }} /></View>}
          <View>
            {personalInfo?.fullName && <Text style={s.name}>{sanitizeForPDF(personalInfo.fullName)}</Text>}
            {personalInfo?.jobTitle && <Text style={s.jobTitle}>{sanitizeForPDF(personalInfo.jobTitle)}</Text>}
          </View>
        </View>
        <View style={s.contactCol}>
          {personalInfo?.email && <View style={s.contactItem}><MailIcon size={8} color={accent} /><Text style={s.contactText}>{sanitizeForPDF(personalInfo.email)}</Text></View>}
          {personalInfo?.phone && <View style={s.contactItem}><PhoneIcon size={8} color={accent} /><Text style={s.contactText}>{sanitizeForPDF(personalInfo.phone)}</Text></View>}
          {personalInfo?.address && <View style={s.contactItem}><MapPinIcon size={8} color={accent} /><Text style={s.contactText}>{sanitizeForPDF(personalInfo.address)}</Text></View>}
          {personalInfo?.linkedin && <View style={s.contactItem}><GlobeIcon size={8} color={accent} /><Text style={s.contactText}>LinkedIn</Text></View>}
        </View>
      </View>

      {personalInfo?.summary && <Text style={s.summary}>{sanitizeForPDF(personalInfo.summary)}</Text>}

      <View style={s.body}>
        <View style={s.leftCol}>
          {experiences.length > 0 && (
            <View>
              <ST title="Experiences" />
              {experiences.map((exp: any, i: number) => (
                <View key={exp.id ?? i} style={s.expItem}>
                  <View style={s.expHeader}>
                    <Text style={s.expPosition}>{sanitizeForPDF(exp.position)}</Text>
                    <Text style={s.expDate}>{sanitizeForPDF(exp.startDate)} - {exp.isCurrent ? 'now' : sanitizeForPDF(exp.endDate)}</Text>
                  </View>
                  <Text style={s.expCompany}>{sanitizeForPDF(exp.company)}</Text>
                  <Text style={s.expDesc}>{sanitizeForPDF(exp.description)}</Text>
                </View>
              ))}
            </View>
          )}
          {education.length > 0 && (
            <View>
              <ST title="Formation" />
              {education.map((edu: any, i: number) => (
                <View key={edu.id ?? i} style={s.eduItem}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={s.eduDegree}>{sanitizeForPDF(edu.degree)}</Text>
                      <Text style={s.eduDate}>{sanitizeForPDF(edu.startDate)} - {edu.isCurrent ? 'now' : sanitizeForPDF(edu.endDate)}</Text>
                    </View>
                    <Text style={s.eduInst}>{sanitizeForPDF(edu.institution)}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
          {accomplishments.length > 0 && (
            <View>
              <ST title="Realisations" />
              {accomplishments.map((acc: any, i: number) => (
                <View key={acc.id ?? i} style={s.accItem}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={s.accTitle}>{sanitizeForPDF(acc.title)}</Text>
                      <Text style={s.accDate}>{sanitizeForPDF(acc.date)}</Text>
                    </View>
                    {acc.description && <Text style={s.accDesc}>{sanitizeForPDF(acc.description)}</Text>}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={s.rightCol}>
          {skills.length > 0 && (
            <View>
              <ST title="Competences" />
              {skills.map((sk: any, i: number) => (
                <View key={sk.id ?? i} style={s.skillRow}>
                  <View style={s.skillHeader}>
                    <Text style={s.skillName}>{sanitizeForPDF(sk.name)}</Text>
                    {sk.level && <Text style={s.skillLevel}>{sanitizeForPDF(sk.level)}</Text>}
                  </View>
                  <View style={s.skillBar}><View style={[s.skillFill, { width: `${SKILL_LEVEL_PCT[sk.level] || 50}%` }]} /></View>
                </View>
              ))}
            </View>
          )}
          {languages.length > 0 && (
            <View>
              <ST title="Langues" />
              {languages.map((l: any, i: number) => (
                <View key={l.id ?? i} style={s.langRow}>
                  <Text style={s.langName}>{sanitizeForPDF(l.name)}</Text>
                  <Text style={s.langLevel}>{sanitizeForPDF(l.level)}</Text>
                </View>
              ))}
            </View>
          )}
          {certifications.length > 0 && (
            <View>
              <ST title="Certifications" />
              {certifications.map((c: any, i: number) => (
                <View key={c.id ?? i} style={s.certItem}>
                  <Text style={s.certName}>{sanitizeForPDF(c.name)}</Text>
                  <Text style={s.certIssuer}>{sanitizeForPDF(c.issuer)} - {sanitizeForPDF(c.date)}</Text>
                </View>
              ))}
            </View>
          )}
          {hobbies.length > 0 && (
            <View>
              <ST title="Interets" />
              <View style={s.hobbyRow}>
                {hobbies.map((h: any, i: number) => <Text key={h.id ?? i} style={s.hobbyText}>{sanitizeForPDF(h.name)}</Text>)}
              </View>
            </View>
          )}
          {references.length > 0 && (
            <View>
              <ST title="References" />
              {references.map((r: any, i: number) => (
                <View key={r.id ?? i} style={s.refCard}>
                  <Text style={s.refName}>{sanitizeForPDF(r.name)}</Text>
                  {r.position && <Text style={s.refPos}>{sanitizeForPDF(r.position)}</Text>}
                  {r.email && <Text style={s.refEmail}>{sanitizeForPDF(r.email)}</Text>}
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  )
}
