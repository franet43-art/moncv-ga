import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { PDFPhoto } from './shared/pdf-photo'
import { sanitizeForPDF } from './pdf-document'
import { MailIcon, PhoneIcon, MapPinIcon, GlobeIcon } from '@/lib/pdf/pdf-icons'
import { getTokens } from '@/lib/cv-design-tokens'

interface CreativePDFProps { content: CVContent; settings: CVSettings }

const SKILL_LEVEL_PCT: Record<string, number> = { debutant: 25, intermediaire: 50, avance: 75, expert: 100 }

export function CreativePDF({ content, settings }: CreativePDFProps) {
  const { personalInfo, experiences = [], education = [], skills = [], languages = [], references = [], certifications = [], accomplishments = [] } = content
  const tokens = getTokens(settings.fontSize as any)
  const accent = settings?.accentColor || '#8b5cf6'
  const photoUrl = settings?.photoUrl
  const hasPhoto = !!(photoUrl && String(photoUrl).trim())

  const s = StyleSheet.create({
    page: { flexDirection: 'row', backgroundColor: '#ffffff', color: '#18181b', flex: 1 },
    mainCol: { flex: 1, padding: tokens.mainPadding, gap: tokens.sectionGap },
    sideCol: { width: tokens.sidebarWidth, padding: tokens.sidebarPadding, backgroundColor: accent, color: '#ffffff', gap: tokens.sectionGap },
    header: { marginBottom: tokens.sectionGap / 2 },
    photo: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#ffffff', overflow: 'hidden', marginBottom: 16 },
    name: { fontSize: tokens.nameSize + 4, fontWeight: 'bold', color: '#09090b', marginBottom: 4, letterSpacing: -0.5 },
    jobTitle: { fontSize: tokens.jobTitleSize, fontWeight: 'bold', color: accent, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 },
    summary: { fontSize: tokens.bodySize, color: '#52525b', lineHeight: 1.6 },
    sectionTitle: { fontSize: tokens.sectionTitleSize, fontWeight: 'bold', color: accent, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: tokens.entryGap, paddingBottom: 4, borderBottomWidth: 1, borderBottomColor: accent },
    expItem: { marginBottom: tokens.entryGap, paddingLeft: 12, borderLeftWidth: 2, borderLeftColor: accent },
    expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 },
    expPosition: { fontSize: tokens.bodySize + 1, fontWeight: 'bold', color: '#09090b', flex: 1 },
    expDate: { fontSize: tokens.bodySize - 2, color: '#a1a1aa' },
    expCompany: { fontSize: tokens.bodySize, color: '#71717a', marginBottom: 4, fontWeight: 'bold' },
    expDesc: { fontSize: tokens.bodySize - 1, color: '#52525b', lineHeight: 1.5 },
    eduItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: tokens.entryGap / 1.5 },
    eduDegree: { fontSize: tokens.bodySize + 1, fontWeight: 'bold', color: '#09090b', marginBottom: 1 },
    eduInst: { fontSize: tokens.bodySize - 1, color: '#71717a' },
    accItem: { marginBottom: tokens.entryGap / 1.5 },
    accHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
    accTitle: { fontSize: tokens.bodySize + 1, fontWeight: 'bold', color: '#09090b' },
    accDesc: { fontSize: tokens.bodySize - 1, color: '#52525b' },
    refGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    refCard: { width: '47%', padding: 8, borderWidth: 1, borderColor: '#e4e4e7', borderRadius: 6, backgroundColor: '#fafafa' },
    refName: { fontSize: tokens.bodySize, fontWeight: 'bold', color: '#09090b', marginBottom: 1 },
    refPos: { fontSize: tokens.bodySize - 1, color: '#71717a', marginBottom: 1 },
    refEmail: { fontSize: tokens.bodySize - 2, fontWeight: 'bold', color: accent },
    
    // Sidebar styles
    sideSectionTitle: { fontSize: tokens.sectionTitleSize, fontWeight: 'bold', color: '#ffffff', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: tokens.entryGap, paddingBottom: 4, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.3)' },
    contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
    contactText: { fontSize: tokens.bodySize, color: '#ffffff' },
    skillItem: { marginBottom: 8 },
    skillHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
    skillName: { fontSize: tokens.bodySize - 1, fontWeight: 'bold', color: '#ffffff' },
    skillLevel: { fontSize: tokens.bodySize - 3, color: 'rgba(255,255,255,0.7)', textTransform: 'capitalize' },
    skillBarBg: { height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2 },
    skillBarFill: { height: 4, backgroundColor: '#ffffff', borderRadius: 2 },
    langItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    langName: { fontSize: tokens.bodySize - 1, fontWeight: 'bold', color: '#ffffff' },
    langDots: { flexDirection: 'row', gap: 2 },
    langDot: { width: 5, height: 5, borderRadius: 2.5 },
    certItem: { marginBottom: tokens.entryGap / 1.5 },
    certName: { fontSize: tokens.bodySize - 1, fontWeight: 'bold', color: '#ffffff', marginBottom: 1 },
    certIssuer: { fontSize: tokens.bodySize - 2, color: 'rgba(255,255,255,0.8)' },
  })

  return (
    <View style={s.page}>
      {/* Main Content (Left) */}
      <View style={s.mainCol}>
        <View style={s.header}>
          {hasPhoto && <View style={s.photo}><PDFPhoto src={photoUrl} style={{ width: 80, height: 80 }} /></View>}
          {personalInfo?.fullName && <Text style={s.name}>{sanitizeForPDF(personalInfo.fullName)}</Text>}
          {personalInfo?.jobTitle && <Text style={s.jobTitle}>{sanitizeForPDF(personalInfo.jobTitle)}</Text>}
          {personalInfo?.summary && <Text style={s.summary}>{sanitizeForPDF(personalInfo.summary)}</Text>}
        </View>

        {experiences.length > 0 && (
          <View style={{ marginBottom: tokens.sectionGap }}>
            <Text style={s.sectionTitle}>Experiences</Text>
            {experiences.map((exp: any, i: number) => (
              <View key={exp.id ?? i} style={s.expItem}>
                <View style={s.expHeader}>
                  <Text style={s.expPosition}>{sanitizeForPDF(exp.position)}</Text>
                  <Text style={s.expDate}>{sanitizeForPDF(exp.startDate)} - {exp.isCurrent ? 'Présent' : sanitizeForPDF(exp.endDate)}</Text>
                </View>
                <Text style={s.expCompany}>{sanitizeForPDF(exp.company)}</Text>
                <Text style={s.expDesc}>{sanitizeForPDF(exp.description)}</Text>
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View style={{ marginBottom: tokens.sectionGap }}>
            <Text style={s.sectionTitle}>Formation</Text>
            {education.map((edu: any, i: number) => (
              <View key={edu.id ?? i} style={s.eduItem}>
                <View style={{ flex: 1 }}>
                  <Text style={s.eduDegree}>{sanitizeForPDF(edu.degree)}</Text>
                  <Text style={s.eduInst}>{sanitizeForPDF(edu.institution)}{edu.field ? ` · ${sanitizeForPDF(edu.field)}` : ''}</Text>
                </View>
                <Text style={s.expDate}>{sanitizeForPDF(edu.startDate)} - {edu.isCurrent ? 'Présent' : sanitizeForPDF(edu.endDate)}</Text>
              </View>
            ))}
          </View>
        )}

        {accomplishments.length > 0 && (
          <View style={{ marginBottom: tokens.sectionGap }}>
            <Text style={s.sectionTitle}>Realisations</Text>
            {accomplishments.map((acc: any, i: number) => (
              <View key={acc.id ?? i} style={s.accItem}>
                <View style={s.accHeader}>
                  <Text style={s.accTitle}>{sanitizeForPDF(acc.title)}</Text>
                  <Text style={s.expDate}>{sanitizeForPDF(acc.date)}</Text>
                </View>
                {acc.description && <Text style={s.accDesc}>{sanitizeForPDF(acc.description)}</Text>}
              </View>
            ))}
          </View>
        )}

        {references.length > 0 && (
          <View style={{ marginBottom: tokens.sectionGap }}>
            <Text style={s.sectionTitle}>References</Text>
            <View style={s.refGrid}>
              {references.map((ref: any, i: number) => (
                <View key={ref.id ?? i} style={s.refCard}>
                  <Text style={s.refName}>{sanitizeForPDF(ref.name)}</Text>
                  {(ref.position || ref.company) && (
                    <Text style={s.refPos}>
                      {sanitizeForPDF(ref.position)}{ref.position && ref.company ? ' - ' : ''}{sanitizeForPDF(ref.company)}
                    </Text>
                  )}
                  {ref.email && <Text style={s.refEmail}>{sanitizeForPDF(ref.email)}</Text>}
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Sidebar (Right) */}
      <View style={s.sideCol}>
        <View style={{ marginBottom: tokens.sectionGap }}>
          <Text style={s.sideSectionTitle}>Contact</Text>
          {personalInfo?.email && (
            <View style={s.contactItem}>
              <MailIcon size={10} color="#ffffff" />
              <Text style={s.contactText}>{sanitizeForPDF(personalInfo.email)}</Text>
            </View>
          )}
          {personalInfo?.phone && (
            <View style={s.contactItem}>
              <PhoneIcon size={10} color="#ffffff" />
              <Text style={s.contactText}>{sanitizeForPDF(personalInfo.phone)}</Text>
            </View>
          )}
          {personalInfo?.address && (
            <View style={s.contactItem}>
              <MapPinIcon size={10} color="#ffffff" />
              <Text style={s.contactText}>{sanitizeForPDF(personalInfo.address)}</Text>
            </View>
          )}
          {personalInfo?.linkedin && (
            <View style={s.contactItem}>
              <GlobeIcon size={10} color="#ffffff" />
              <Text style={s.contactText}>LinkedIn</Text>
            </View>
          )}
        </View>

        {skills.length > 0 && (
          <View style={{ marginBottom: tokens.sectionGap }}>
            <Text style={s.sideSectionTitle}>Competences</Text>
            {skills.map((skill: any, i: number) => (
              <View key={skill.id ?? i} style={s.skillItem}>
                <View style={s.skillHeader}>
                  <Text style={s.skillName}>{sanitizeForPDF(skill.name)}</Text>
                  <Text style={s.skillLevel}>{sanitizeForPDF(skill.level)}</Text>
                </View>
                <View style={s.skillBarBg}>
                  <View style={[s.skillBarFill, { width: `${SKILL_LEVEL_PCT[skill.level] || 50}%` }]} />
                </View>
              </View>
            ))}
          </View>
        )}

        {languages.length > 0 && (
          <View style={{ marginBottom: tokens.sectionGap }}>
            <Text style={s.sideSectionTitle}>Langues</Text>
            {languages.map((lang: any, i: number) => {
              const dots = lang.level === "natif" || lang.level === "bilingue" ? 5 : lang.level === "courant" ? 4 : lang.level === "intermediaire" ? 3 : 2
              return (
                <View key={lang.id ?? i} style={s.langItem}>
                  <Text style={s.langName}>{sanitizeForPDF(lang.name)}</Text>
                  <View style={s.langDots}>
                    {[1, 2, 3, 4, 5].map((d) => (
                      <View key={d} style={[s.langDot, { backgroundColor: d <= dots ? '#ffffff' : 'rgba(255,255,255,0.3)' }]} />
                    ))}
                  </View>
                </View>
              )
            })}
          </View>
        )}

        {certifications.length > 0 && (
          <View style={{ marginBottom: tokens.sectionGap }}>
            <Text style={s.sideSectionTitle}>Certifications</Text>
            {certifications.map((cert: any, i: number) => (
              <View key={cert.id ?? i} style={s.certItem}>
                <Text style={s.certName}>{sanitizeForPDF(cert.name)}</Text>
                <Text style={s.certIssuer}>{sanitizeForPDF(cert.issuer)} · {sanitizeForPDF(cert.date)}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  )
}
