import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { PDFPhoto } from './shared/pdf-photo'
import { sanitizeForPDF } from './pdf-document'
import { MailIcon, PhoneIcon, MapPinIcon, GlobeIcon } from '@/lib/pdf/pdf-icons'
import { getTokens } from '@/lib/cv-design-tokens'

interface ElegantPDFProps { content: CVContent; settings: CVSettings }

const LANG_LEVEL_PCT: Record<string, number> = { basique: 20, intermediaire: 45, courant: 70, bilingue: 90, natif: 100 }

export function ElegantPDF({ content, settings }: ElegantPDFProps) {
  const { personalInfo, experiences = [], education = [], skills = [], languages = [], references = [], certifications = [], accomplishments = [], hobbies = [] } = content
  const tokens = getTokens(settings.fontSize as any)
  const accent = settings?.accentColor || '#6C63FF'
  const photoUrl = settings?.photoUrl
  const hasPhoto = !!(photoUrl && String(photoUrl).trim())

  const s = StyleSheet.create({
    page: { flexDirection: 'column', backgroundColor: '#ffffff', color: '#18181b' },
    header: { alignItems: 'center', paddingTop: tokens.mainPadding, paddingHorizontal: tokens.mainPadding, paddingBottom: tokens.entryGap },
    photo: { width: 64, height: 64, borderRadius: 32, borderWidth: 1, borderColor: `${accent}60`, overflow: 'hidden', marginBottom: 12 },
    ornament: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 8 },
    ornamentLine: { width: 40, height: 0.5, backgroundColor: `${accent}60` },
    ornamentDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: accent },
    name: { fontSize: tokens.nameSize + 2, color: '#09090b', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 4, textAlign: 'center' },
    jobTitle: { fontSize: tokens.jobTitleSize - 2, fontWeight: 'bold', color: accent, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8, textAlign: 'center' },
    contactRow: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 14 },
    contactItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    contactText: { fontSize: tokens.bodySize - 1, color: '#71717a' },
    summary: { fontSize: tokens.bodySize, color: '#52525b', lineHeight: 1.6, textAlign: 'center', fontStyle: 'italic', marginTop: 10, marginBottom: 4, paddingHorizontal: tokens.mainPadding * 1.5 },
    body: { paddingHorizontal: tokens.mainPadding, paddingTop: tokens.entryGap, gap: tokens.sectionGap },
    stRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: tokens.entryGap / 1.5 },
    stLine: { width: 10, height: 0.5, backgroundColor: accent },
    stDiamond: { width: 4, height: 4, backgroundColor: accent },
    stText: { fontSize: tokens.sectionTitleSize, color: '#52525b', textTransform: 'uppercase', letterSpacing: 2 },
    stTrail: { flex: 1, height: 0.5, backgroundColor: `${accent}30` },
    expRow: { flexDirection: 'row', marginBottom: tokens.entryGap },
    dateCol: { width: '25%', alignItems: 'flex-end', paddingRight: 14, paddingTop: 1 },
    dateText: { fontSize: tokens.bodySize - 2, color: '#a1a1aa', textAlign: 'right' },
    companyText: { fontSize: tokens.bodySize - 1, color: '#71717a', fontWeight: 'bold', marginTop: 2, textAlign: 'right' },
    contentCol: { flex: 1, borderLeftWidth: 0.5, borderLeftColor: `${accent}40`, paddingLeft: 14 },
    posText: { fontSize: tokens.bodySize + 1, fontWeight: 'bold', color: '#09090b', marginBottom: 2 },
    descText: { fontSize: tokens.bodySize - 1, color: '#52525b', lineHeight: 1.5 },
    twoCols: { flexDirection: 'row', gap: 30 },
    halfCol: { flex: 1 },
    skillTag: { fontSize: tokens.bodySize - 1, color: '#52525b', borderBottomWidth: 0.5, borderBottomColor: `${accent}50`, marginBottom: 4, paddingBottom: 2 },
    langRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    langName: { fontSize: tokens.bodySize - 1, fontWeight: 'bold', color: '#52525b' },
    langLevel: { fontSize: tokens.bodySize - 3, color: '#a1a1aa', fontStyle: 'italic' },
    langBarBg: { height: 1, backgroundColor: '#e4e4e7', marginTop: 2 },
    langBarFill: { height: 1, backgroundColor: accent },
    certGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    certCard: { width: '48%', borderBottomWidth: 0.5, borderBottomColor: `${accent}20`, paddingBottom: 6, marginBottom: 2 },
    certName: { fontSize: tokens.bodySize, fontWeight: 'bold', color: '#09090b', marginBottom: 1 },
    certIssuer: { fontSize: tokens.bodySize - 2, color: '#a1a1aa' },
    hobbiesText: { fontSize: tokens.bodySize - 1, color: '#a1a1aa', fontStyle: 'italic', textAlign: 'center' },
    refGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    refCard: { width: '48%', padding: 8, borderWidth: 0.5, borderColor: `${accent}30` },
    refName: { fontSize: tokens.bodySize, fontWeight: 'bold', color: '#09090b', marginBottom: 1 },
    refPos: { fontSize: tokens.bodySize - 1, color: '#71717a', marginBottom: 1 },
    refEmail: { fontSize: tokens.bodySize - 2, color: accent, fontWeight: 'bold' },
  })

  const ST = ({ title }: { title: string }) => (
    <View style={s.stRow}>
      <View style={s.stLine} />
      <View style={s.stDiamond} />
      <Text style={s.stText}>{title}</Text>
      <View style={s.stTrail} />
    </View>
  )

  return (
    <View>
      <View style={s.header}>
        {hasPhoto && <View style={s.photo}><PDFPhoto src={photoUrl} style={{ width: 64, height: 64 }} /></View>}
        <View style={s.ornament}><View style={s.ornamentLine} /><View style={s.ornamentDot} /><View style={s.ornamentLine} /></View>
        {personalInfo?.fullName && <Text style={s.name}>{sanitizeForPDF(personalInfo.fullName)}</Text>}
        {personalInfo?.jobTitle && <Text style={s.jobTitle}>{sanitizeForPDF(personalInfo.jobTitle)}</Text>}
        <View style={s.ornament}><View style={s.ornamentLine} /><View style={[s.ornamentDot, { borderRadius: 0 }]} /><View style={s.ornamentLine} /></View>
        <View style={s.contactRow}>
          {personalInfo?.email && <View style={s.contactItem}><MailIcon size={8} color={accent} /><Text style={s.contactText}>{sanitizeForPDF(personalInfo.email)}</Text></View>}
          {personalInfo?.phone && <View style={s.contactItem}><PhoneIcon size={8} color={accent} /><Text style={s.contactText}>{sanitizeForPDF(personalInfo.phone)}</Text></View>}
          {personalInfo?.address && <View style={s.contactItem}><MapPinIcon size={8} color={accent} /><Text style={s.contactText}>{sanitizeForPDF(personalInfo.address)}</Text></View>}
          {personalInfo?.linkedin && <View style={s.contactItem}><GlobeIcon size={8} color={accent} /><Text style={s.contactText}>LinkedIn</Text></View>}
        </View>
      </View>
      {personalInfo?.summary && <Text style={s.summary}>{sanitizeForPDF(personalInfo.summary)}</Text>}
      <View style={s.body}>
        {experiences.length > 0 && (
          <View>
            <ST title="Experiences Professionnelles" />
            {experiences.map((exp: any, i: number) => (
              <View key={exp.id ?? i} style={s.expRow}>
                <View style={s.dateCol}>
                  <Text style={s.dateText}>{sanitizeForPDF(exp.startDate)}</Text>
                  <Text style={s.dateText}>- {exp.isCurrent ? 'Present' : sanitizeForPDF(exp.endDate)}</Text>
                  <Text style={s.companyText}>{sanitizeForPDF(exp.company)}</Text>
                </View>
                <View style={s.contentCol}>
                  <Text style={s.posText}>{sanitizeForPDF(exp.position)}</Text>
                  <Text style={s.descText}>{sanitizeForPDF(exp.description)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
        {education.length > 0 && (
          <View>
            <ST title="Formation & Diplomes" />
            {education.map((edu: any, i: number) => (
              <View key={edu.id ?? i} style={s.expRow}>
                <View style={s.dateCol}>
                  <Text style={s.dateText}>{sanitizeForPDF(edu.startDate)} - {edu.isCurrent ? 'Present' : sanitizeForPDF(edu.endDate)}</Text>
                </View>
                <View style={s.contentCol}>
                  <Text style={s.posText}>{sanitizeForPDF(edu.degree)}</Text>
                  <Text style={s.descText}>{sanitizeForPDF(edu.institution)}{edu.field ? ` - ${sanitizeForPDF(edu.field)}` : ''}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
        {accomplishments.length > 0 && (
          <View>
            <ST title="Realisations" />
            {accomplishments.map((acc: any, i: number) => (
              <View key={acc.id ?? i} style={s.expRow}>
                <View style={s.dateCol}><Text style={s.dateText}>{sanitizeForPDF(acc.date)}</Text></View>
                <View style={s.contentCol}>
                  <Text style={s.posText}>{sanitizeForPDF(acc.title)}</Text>
                  {acc.description && <Text style={s.descText}>{sanitizeForPDF(acc.description)}</Text>}
                </View>
              </View>
            ))}
          </View>
        )}
        {(skills.length > 0 || languages.length > 0) && (
          <View style={s.twoCols}>
            {skills.length > 0 && (
              <View style={s.halfCol}>
                <ST title="Competences" />
                {skills.map((sk: any, i: number) => <Text key={sk.id ?? i} style={s.skillTag}>{sanitizeForPDF(sk.name)}</Text>)}
              </View>
            )}
            {languages.length > 0 && (
              <View style={s.halfCol}>
                <ST title="Langues" />
                {languages.map((l: any, i: number) => (
                  <View key={l.id ?? i}>
                    <View style={s.langRow}><Text style={s.langName}>{sanitizeForPDF(l.name)}</Text><Text style={s.langLevel}>{sanitizeForPDF(l.level)}</Text></View>
                    <View style={s.langBarBg}><View style={[s.langBarFill, { width: `${LANG_LEVEL_PCT[l.level] ?? 50}%` }]} /></View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
        {certifications.length > 0 && (
          <View>
            <ST title="Certifications" />
            <View style={s.certGrid}>
              {certifications.map((c: any, i: number) => (
                <View key={c.id ?? i} style={s.certCard}>
                  <Text style={s.certName}>{sanitizeForPDF(c.name)}</Text>
                  <Text style={s.certIssuer}>{sanitizeForPDF(c.issuer)} - {sanitizeForPDF(c.date)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        {hobbies.length > 0 && (
          <View>
            <ST title="Centres d'interet" />
            <Text style={s.hobbiesText}>{hobbies.map((h: any) => sanitizeForPDF(h.name)).join('  -  ')}</Text>
          </View>
        )}
        {references.length > 0 && (
          <View>
            <ST title="References" />
            <View style={s.refGrid}>
              {references.map((r: any, i: number) => (
                <View key={r.id ?? i} style={s.refCard}>
                  <Text style={s.refName}>{sanitizeForPDF(r.name)}</Text>
                  {r.position && <Text style={s.refPos}>{sanitizeForPDF(r.position)}</Text>}
                  {r.company && <Text style={[s.refPos, { color: '#a1a1aa' }]}>{sanitizeForPDF(r.company)}</Text>}
                  {r.email && <Text style={s.refEmail}>{sanitizeForPDF(r.email)}</Text>}
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  )
}
