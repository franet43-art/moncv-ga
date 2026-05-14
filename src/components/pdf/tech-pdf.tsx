import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { PDFPhoto } from './shared/pdf-photo'
import { sanitizeForPDF } from './pdf-document'
import { MailIcon, PhoneIcon, MapPinIcon, GlobeIcon } from '@/lib/pdf/pdf-icons'
import { getTokens } from '@/lib/cv-design-tokens'

interface TechPDFProps { content: CVContent; settings: CVSettings }

const SKILL_LEVEL_LABEL: Record<string, string> = { debutant: "junior", intermediaire: "mid", avance: "senior", expert: "expert" }
const LANG_LEVEL_PCT: Record<string, number> = { basique: 20, intermediaire: 45, courant: 70, bilingue: 90, natif: 100 }

export function TechPDF({ content, settings }: TechPDFProps) {
  const { personalInfo, experiences = [], education = [], skills = [], languages = [], references = [], certifications = [], accomplishments = [], hobbies = [] } = content
  const tokens = getTokens(settings.fontSize as any)
  const accent = settings?.accentColor || '#10b981'
  const photoUrl = settings?.photoUrl
  const hasPhoto = !!(photoUrl && String(photoUrl).trim())

  const s = StyleSheet.create({
    page: { flexDirection: 'column', backgroundColor: '#ffffff', color: '#18181b' },
    // Header uses white background with accent border to save ink, as requested
    header: { padding: tokens.mainPadding, borderBottomWidth: 4, borderBottomColor: accent, backgroundColor: '#fafafa' },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    headerLeft: { flexDirection: 'row', gap: 16, flex: 1 },
    photo: { width: 64, height: 64, borderRadius: 8, borderWidth: 2, borderColor: accent, overflow: 'hidden' },
    codeTag: { fontSize: 9, color: '#71717a', marginBottom: 2, fontFamily: 'Courier' },
    name: { fontSize: tokens.nameSize + 2, fontWeight: 'bold', color: '#09090b', marginBottom: 2 },
    jobTitle: { fontSize: tokens.jobTitleSize, color: accent, fontFamily: 'Courier', fontWeight: 'bold' },
    contactCol: { flexDirection: 'column', gap: 4, alignItems: 'flex-end' },
    contactItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    contactText: { fontSize: tokens.bodySize - 1, color: '#52525b', fontFamily: 'Courier' },
    summaryBlock: { marginTop: 12, paddingLeft: 10, borderLeftWidth: 2, borderLeftColor: accent },
    summaryText: { fontSize: tokens.bodySize, color: '#52525b', lineHeight: 1.5, fontFamily: 'Courier' },
    
    // Skills Strip
    skillsStrip: { paddingHorizontal: tokens.mainPadding, paddingVertical: 10, backgroundColor: '#f4f4f5', flexDirection: 'row', flexWrap: 'wrap', gap: 6, borderBottomWidth: 1, borderBottomColor: '#e4e4e7' },
    skillBadge: { paddingHorizontal: 6, paddingVertical: 3, borderRadius: 4, borderWidth: 1, borderColor: accent, backgroundColor: '#ffffff', flexDirection: 'row', alignItems: 'center' },
    skillName: { fontSize: tokens.bodySize - 2, fontWeight: 'bold', color: accent, fontFamily: 'Courier' },
    
    // Body Layout
    body: { flexDirection: 'row', flex: 1 },
    mainCol: { flex: 1, padding: tokens.mainPadding, gap: tokens.sectionGap },
    sideCol: { width: '32%', padding: tokens.sidebarPadding, borderLeftWidth: 1, borderLeftColor: '#e4e4e7', gap: tokens.sectionGap },
    
    sectionTitleBlock: { flexDirection: 'row', alignItems: 'center', marginBottom: tokens.entryGap },
    sectionTitleText: { fontSize: tokens.sectionTitleSize, fontWeight: 'bold', color: accent, fontFamily: 'Courier', marginRight: 8 },
    sectionTitleLine: { flex: 1, height: 1, backgroundColor: '#e4e4e7' },
    
    expItem: { marginBottom: tokens.entryGap, paddingLeft: 12, borderLeftWidth: 1, borderLeftColor: '#d4d4d8' },
    expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 },
    expPosition: { fontSize: tokens.bodySize + 1, fontWeight: 'bold', color: '#09090b', flex: 1 },
    expDate: { fontSize: tokens.bodySize - 2, color: '#71717a', fontFamily: 'Courier' },
    expCompany: { fontSize: tokens.bodySize, fontWeight: 'bold', color: '#52525b', marginBottom: 4, fontFamily: 'Courier' },
    expDesc: { fontSize: tokens.bodySize - 1, color: '#52525b', lineHeight: 1.5 },
    
    eduItem: { marginBottom: tokens.entryGap / 1.5 },
    eduHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    eduDegree: { fontSize: tokens.bodySize, fontWeight: 'bold', color: '#09090b', flex: 1 },
    eduInst: { fontSize: tokens.bodySize - 1, color: '#71717a', fontFamily: 'Courier', marginTop: 2 },
    
    accItem: { marginBottom: tokens.entryGap / 1.5 },
    accTitle: { fontSize: tokens.bodySize, fontWeight: 'bold', color: '#09090b' },
    accDesc: { fontSize: tokens.bodySize - 1, color: '#52525b', marginTop: 2 },
    
    sideTitleText: { fontSize: tokens.sectionTitleSize, fontWeight: 'bold', color: accent, fontFamily: 'Courier', marginBottom: tokens.entryGap / 1.5 },
    langRow: { marginBottom: 6 },
    langHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
    langName: { fontSize: tokens.bodySize - 1, fontWeight: 'bold', color: '#09090b' },
    langLevel: { fontSize: tokens.bodySize - 3, color: '#71717a', fontFamily: 'Courier' },
    langBarBg: { height: 3, backgroundColor: '#e4e4e7', borderRadius: 1.5 },
    langBarFill: { height: 3, backgroundColor: accent, borderRadius: 1.5 },
    
    certItem: { marginBottom: tokens.entryGap / 1.5, padding: 6, borderWidth: 1, borderColor: '#e4e4e7', borderRadius: 4, backgroundColor: '#fafafa' },
    certName: { fontSize: tokens.bodySize - 1, fontWeight: 'bold', color: '#09090b', marginBottom: 2 },
    certIssuer: { fontSize: tokens.bodySize - 3, color: '#71717a', fontFamily: 'Courier' },
    
    refItem: { marginBottom: tokens.entryGap / 1.5, padding: 6, borderWidth: 1, borderColor: '#e4e4e7', borderRadius: 4 },
    refName: { fontSize: tokens.bodySize - 1, fontWeight: 'bold', color: '#09090b' },
    refPos: { fontSize: tokens.bodySize - 2, color: '#71717a', marginVertical: 1 },
    refEmail: { fontSize: tokens.bodySize - 3, color: accent, fontFamily: 'Courier' },
  })

  return (
    <View style={s.page}>
      <View style={s.header}>
        <View style={s.headerRow}>
          <View style={s.headerLeft}>
            {hasPhoto && <View style={s.photo}><PDFPhoto src={photoUrl} style={{ width: 64, height: 64 }} /></View>}
            <View>
              <Text style={s.codeTag}>const dev =</Text>
              {personalInfo?.fullName && <Text style={s.name}>{sanitizeForPDF(personalInfo.fullName)}</Text>}
              {personalInfo?.jobTitle && <Text style={s.jobTitle}>&lt;{sanitizeForPDF(personalInfo.jobTitle)} /&gt;</Text>}
            </View>
          </View>
          <View style={s.contactCol}>
            {personalInfo?.email && <View style={s.contactItem}><Text style={s.contactText}>{sanitizeForPDF(personalInfo.email)}</Text><MailIcon size={8} color={accent} /></View>}
            {personalInfo?.phone && <View style={s.contactItem}><Text style={s.contactText}>{sanitizeForPDF(personalInfo.phone)}</Text><PhoneIcon size={8} color={accent} /></View>}
            {personalInfo?.address && <View style={s.contactItem}><Text style={s.contactText}>{sanitizeForPDF(personalInfo.address)}</Text><MapPinIcon size={8} color={accent} /></View>}
            {personalInfo?.linkedin && <View style={s.contactItem}><Text style={s.contactText}>LinkedIn</Text><GlobeIcon size={8} color={accent} /></View>}
          </View>
        </View>
        {personalInfo?.summary && (
          <View style={s.summaryBlock}>
            <Text style={s.summaryText}>// {sanitizeForPDF(personalInfo.summary)}</Text>
          </View>
        )}
      </View>

      {skills.length > 0 && (
        <View style={s.skillsStrip}>
          {skills.map((skill: any, i: number) => (
            <View key={skill.id ?? i} style={s.skillBadge}>
              <Text style={s.skillName}>{sanitizeForPDF(skill.name)}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={s.body}>
        <View style={s.mainCol}>
          {experiences.length > 0 && (
            <View>
              <View style={s.sectionTitleBlock}><Text style={s.sectionTitleText}>./experiences</Text><View style={s.sectionTitleLine}/></View>
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
              <View style={s.sectionTitleBlock}><Text style={s.sectionTitleText}>./formation</Text><View style={s.sectionTitleLine}/></View>
              {education.map((edu: any, i: number) => (
                <View key={edu.id ?? i} style={s.eduItem}>
                  <View style={s.eduHeader}>
                    <Text style={s.eduDegree}>{sanitizeForPDF(edu.degree)}</Text>
                    <Text style={s.expDate}>{sanitizeForPDF(edu.startDate)} - {edu.isCurrent ? 'now' : sanitizeForPDF(edu.endDate)}</Text>
                  </View>
                  <Text style={s.eduInst}>{sanitizeForPDF(edu.institution)}</Text>
                </View>
              ))}
            </View>
          )}

          {accomplishments.length > 0 && (
            <View>
              <View style={s.sectionTitleBlock}><Text style={s.sectionTitleText}>./realisations</Text><View style={s.sectionTitleLine}/></View>
              {accomplishments.map((acc: any, i: number) => (
                <View key={acc.id ?? i} style={s.accItem}>
                  <View style={s.eduHeader}>
                    <Text style={s.accTitle}>{sanitizeForPDF(acc.title)}</Text>
                    <Text style={s.expDate}>{sanitizeForPDF(acc.date)}</Text>
                  </View>
                  {acc.description && <Text style={s.accDesc}>{sanitizeForPDF(acc.description)}</Text>}
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={s.sideCol}>
          {languages.length > 0 && (
            <View>
              <Text style={s.sideTitleText}>./langues</Text>
              {languages.map((lang: any, i: number) => (
                <View key={lang.id ?? i} style={s.langRow}>
                  <View style={s.langHeader}>
                    <Text style={s.langName}>{sanitizeForPDF(lang.name)}</Text>
                    <Text style={s.langLevel}>{sanitizeForPDF(lang.level)}</Text>
                  </View>
                  <View style={s.langBarBg}><View style={[s.langBarFill, { width: `${LANG_LEVEL_PCT[lang.level] || 50}%` }]} /></View>
                </View>
              ))}
            </View>
          )}

          {certifications.length > 0 && (
            <View>
              <Text style={s.sideTitleText}>./certs</Text>
              {certifications.map((cert: any, i: number) => (
                <View key={cert.id ?? i} style={s.certItem}>
                  <Text style={s.certName}>{sanitizeForPDF(cert.name)}</Text>
                  <Text style={s.certIssuer}>{sanitizeForPDF(cert.issuer)} · {sanitizeForPDF(cert.date)}</Text>
                </View>
              ))}
            </View>
          )}

          {references.length > 0 && (
            <View>
              <Text style={s.sideTitleText}>./refs</Text>
              {references.map((ref: any, i: number) => (
                <View key={ref.id ?? i} style={s.refItem}>
                  <Text style={s.refName}>{sanitizeForPDF(ref.name)}</Text>
                  {ref.position && <Text style={s.refPos}>{sanitizeForPDF(ref.position)}</Text>}
                  {ref.email && <Text style={s.refEmail}>{sanitizeForPDF(ref.email)}</Text>}
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  )
}
