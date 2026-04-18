import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import { PDFPhoto } from './shared/pdf-photo'
import { sanitizeForPDF } from './pdf-document'
import { CVContent, CVSettings } from '@/types/cv'

function fmtDate(start: string, end: string, current: boolean): string {
  return `${sanitizeForPDF(start)} — ${current ? 'Présent' : sanitizeForPDF(end)}`
}

export function ClassicPDF({ content, settings }: { content: CVContent; settings: CVSettings }) {
  const { personalInfo, experiences, education, skills, languages, references } = content
  const accent = settings.accentColor
  const hasPhoto = !!settings.photoUrl
  const align = hasPhoto ? 'left' : 'center'

  const sectionTitle = (title: string) => (
    <Text style={{
      fontFamily: 'Helvetica',
      fontSize: 10,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: 1,
      color: accent,
      marginBottom: 8,
      textAlign: align,
    }}>
      {title}
    </Text>
  )

  const contacts: string[] = []
  if (personalInfo.email) contacts.push(sanitizeForPDF(personalInfo.email))
  if (personalInfo.phone) contacts.push(sanitizeForPDF(personalInfo.phone))
  if (personalInfo.address) contacts.push(sanitizeForPDF(personalInfo.address))
  if (personalInfo.linkedin) contacts.push('LinkedIn')

  return (
    <View style={{ paddingHorizontal: 40, paddingVertical: 36 }}>
      {/* ── HEADER ── */}
      <View style={{
        paddingBottom: 24,
        borderBottomWidth: 2,
        borderBottomColor: accent,
        marginBottom: 28,
        position: 'relative',
      }}>
        {hasPhoto && (
          <View style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 72,
            height: 72,
            borderWidth: 2,
            borderColor: '#F4F4F5',
            borderRadius: 999,
            overflow: 'hidden',
          }}>
            <PDFPhoto src={settings.photoUrl!} style={{ width: 72, height: 72 }} />
          </View>
        )}

        <View style={hasPhoto ? { paddingRight: 84 } : { alignItems: 'center' }}>
          <Text style={{
            fontFamily: 'Helvetica',
            fontSize: 28,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: -0.5,
            color: '#09090B',
            marginBottom: 8,
            textAlign: align,
          }}>
            {sanitizeForPDF(personalInfo.fullName)}
          </Text>

          <Text style={{
            fontFamily: 'Helvetica',
            fontSize: 14,
            fontWeight: 'normal',
            fontStyle: 'italic',
            color: accent,
            marginBottom: 16,
            textAlign: align,
          }}>
            {sanitizeForPDF(personalInfo.jobTitle)}
          </Text>

          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: hasPhoto ? 'flex-start' : 'center',
          }}>
            {contacts.map((item, i) => (
              <Text key={i} style={{
                fontFamily: 'Helvetica',
                fontSize: 9,
                fontWeight: 'normal',
                color: '#52525B',
                marginRight: i < contacts.length - 1 ? 24 : 0,
                marginBottom: 4,
              }}>
                {item}
              </Text>
            ))}
          </View>
        </View>
      </View>

      {/* ── PROFIL ── */}
      {personalInfo.summary && (
        <View style={{ marginBottom: 28 }}>
          {sectionTitle('PROFIL PROFESSIONNEL')}
          <Text style={{
            fontFamily: 'Helvetica',
            fontSize: 10,
            fontWeight: 'normal',
            color: '#3F3F46',
            lineHeight: 1.5,
            textAlign: align,
          }}>
            {sanitizeForPDF(personalInfo.summary)}
          </Text>
        </View>
      )}

      {/* ── EXPÉRIENCES ── */}
      {experiences.length > 0 && (
        <View style={{ marginBottom: 28 }}>
          {sectionTitle('EXPÉRIENCE PROFESSIONNELLE')}
          {experiences.map((exp, i) => (
            <View key={exp.id} style={{
              paddingLeft: 16,
              borderLeftWidth: 2,
              borderLeftColor: '#F4F4F5',
              marginBottom: i < experiences.length - 1 ? 16 : 0,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Text style={{
                  fontFamily: 'Helvetica',
                  fontSize: 11,
                  fontWeight: 'bold',
                  color: '#18181B',
                }}>
                  {sanitizeForPDF(exp.position)}
                </Text>
                <Text style={{
                  fontFamily: 'Helvetica',
                  fontSize: 8,
                  fontWeight: 'normal',
                  color: '#71717A',
                }}>
                  {fmtDate(exp.startDate, exp.endDate || '', exp.isCurrent)}
                </Text>
              </View>
              <Text style={{
                fontFamily: 'Helvetica',
                fontSize: 9,
                fontWeight: 'normal',
                color: '#52525B',
                marginBottom: 4,
              }}>
                {sanitizeForPDF(exp.company)}
              </Text>
              {exp.description && (
                <Text style={{
                  fontFamily: 'Helvetica',
                  fontSize: 9,
                  fontWeight: 'normal',
                  color: '#3F3F46',
                  lineHeight: 1.4,
                }}>
                  {sanitizeForPDF(exp.description)}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* ── FORMATION ── */}
      {education.length > 0 && (
        <View style={{ marginBottom: 28 }}>
          {sectionTitle('FORMATION')}
          {education.map((edu, i) => (
            <View key={edu.id} style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: i < education.length - 1 ? 12 : 0,
            }}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text style={{
                  fontFamily: 'Helvetica',
                  fontSize: 11,
                  fontWeight: 'bold',
                  color: '#18181B',
                }}>
                  {sanitizeForPDF(edu.degree)}
                </Text>
                <Text style={{
                  fontFamily: 'Helvetica',
                  fontSize: 9,
                  fontWeight: 'normal',
                  color: '#52525B',
                }}>
                  {sanitizeForPDF(edu.institution)}{edu.field ? ` • ${sanitizeForPDF(edu.field)}` : ''}
                </Text>
              </View>
              <Text style={{
                fontFamily: 'Helvetica',
                fontSize: 9,
                fontWeight: 'normal',
                color: '#71717A',
              }}>
                {fmtDate(edu.startDate, edu.endDate || '', edu.isCurrent)}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* ── COMPÉTENCES + LANGUES — 2 colonnes ── */}
      {(skills.length > 0 || languages.length > 0) && (
        <View style={{ flexDirection: 'row', marginBottom: 28 }}>
          <View style={{ width: '50%', paddingRight: 16 }}>
            {skills.length > 0 && (
              <View>
                {sectionTitle('COMPÉTENCES')}
                {skills.map((s, i) => (
                  <Text key={s.id} style={{
                    fontFamily: 'Helvetica',
                    fontSize: 9,
                    fontWeight: 'normal',
                    color: '#3F3F46',
                    marginBottom: i < skills.length - 1 ? 4 : 0,
                  }}>
                    {sanitizeForPDF(s.name)}{s.level ? ` (${sanitizeForPDF(s.level)})` : ''}
                  </Text>
                ))}
              </View>
            )}
          </View>
          <View style={{ width: '50%', paddingLeft: 16 }}>
            {languages.length > 0 && (
              <View>
                {sectionTitle('LANGUES')}
                {languages.map((l, i) => (
                  <View key={l.id} style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: i < languages.length - 1 ? 4 : 0,
                  }}>
                    <Text style={{
                      fontFamily: 'Helvetica',
                      fontSize: 9,
                      fontWeight: 'normal',
                      color: '#3F3F46',
                    }}>
                      {sanitizeForPDF(l.name)}
                    </Text>
                    <Text style={{
                      fontFamily: 'Helvetica',
                      fontSize: 9,
                      fontWeight: 'normal',
                      color: '#71717A',
                    }}>
                      {sanitizeForPDF(l.level)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      )}

      {/* ── RÉFÉRENCES — 2 colonnes ── */}
      {references.length > 0 && (
        <View>
          {sectionTitle('RÉFÉRENCES')}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {references.map((ref) => (
              <View key={ref.id} style={{
                width: '50%',
                paddingRight: 16,
                marginBottom: 12,
              }}>
                <Text style={{
                  fontFamily: 'Helvetica',
                  fontSize: 10,
                  fontWeight: 'bold',
                  color: '#18181B',
                  marginBottom: 2,
                }}>
                  {sanitizeForPDF(ref.name)}
                </Text>
                <Text style={{
                  fontFamily: 'Helvetica',
                  fontSize: 9,
                  fontWeight: 'normal',
                  color: '#52525B',
                }}>
                  {sanitizeForPDF(ref.position)}
                </Text>
                <Text style={{
                  fontFamily: 'Helvetica',
                  fontSize: 9,
                  fontWeight: 'normal',
                  color: '#52525B',
                }}>
                  {sanitizeForPDF(ref.company)}
                </Text>
                {ref.email && (
                  <Text style={{
                    fontFamily: 'Helvetica',
                    fontSize: 8,
                    fontWeight: 'normal',
                    color: '#71717A',
                  }}>
                    {sanitizeForPDF(ref.email)}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  )
}
