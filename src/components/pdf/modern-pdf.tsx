import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import { PDFPhoto } from './shared/pdf-photo'
import { sanitizeForPDF } from './pdf-document'
import { CVContent, CVSettings } from '@/types/cv'

function fmtDate(start: string, end: string, current: boolean): string {
  return `${sanitizeForPDF(start)} — ${current ? 'Présent' : sanitizeForPDF(end)}`
}

function langWidth(level: string): string {
  switch (level) {
    case 'natif': case 'bilingue': return '100%'
    case 'courant': return '80%'
    case 'intermediaire': return '60%'
    case 'debutant': return '40%'
    default: return '50%'
  }
}

export function ModernPDF({ content, settings }: { content: CVContent; settings: CVSettings }) {
  const { personalInfo, experiences, education, skills, languages, references } = content
  const accent = settings.accentColor

  const sidebarTitle = (title: string) => (
    <Text style={{
      fontFamily: 'Helvetica',
      fontSize: 8,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: 2,
      color: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.2)',
      paddingBottom: 6,
      marginBottom: 10,
    }}>
      {title}
    </Text>
  )

  const mainTitle = (title: string) => (
    <Text style={{
      fontFamily: 'Helvetica',
      fontSize: 10,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: 1,
      color: accent,
      marginBottom: 12,
    }}>
      {title}
    </Text>
  )

  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      {/* ═══════ SIDEBAR ═══════ */}
      <View style={{
        width: '35%',
        backgroundColor: accent,
        paddingHorizontal: 24,
        paddingVertical: 36,
      }}>
        {/* Photo */}
        {settings.photoUrl && (
          <View style={{
            width: 96,
            height: 96,
            borderWidth: 4,
            borderColor: 'rgba(255,255,255,0.2)',
            borderRadius: 999,
            overflow: 'hidden',
            marginBottom: 20,
          }}>
            <PDFPhoto src={settings.photoUrl} style={{ width: 96, height: 96 }} />
          </View>
        )}

        {/* Nom */}
        <Text style={{
          fontFamily: 'Helvetica',
          fontSize: 18,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          marginBottom: 6,
        }}>
          {sanitizeForPDF(personalInfo.fullName)}
        </Text>

        {/* Poste */}
        <Text style={{
          fontFamily: 'Helvetica',
          fontSize: 9,
          fontWeight: 'normal',
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.8)',
          marginBottom: 28,
        }}>
          {sanitizeForPDF(personalInfo.jobTitle)}
        </Text>

        {/* Contact */}
        {(personalInfo.email || personalInfo.phone || personalInfo.address) && (
          <View style={{ marginBottom: 28 }}>
            {sidebarTitle('CONTACT')}
            {personalInfo.email && (
              <Text style={{
                fontFamily: 'Helvetica',
                fontSize: 9,
                fontWeight: 'normal',
                color: '#FFFFFF',
                marginBottom: 6,
              }}>
                {sanitizeForPDF(personalInfo.email)}
              </Text>
            )}
            {personalInfo.phone && (
              <Text style={{
                fontFamily: 'Helvetica',
                fontSize: 9,
                fontWeight: 'normal',
                color: '#FFFFFF',
                marginBottom: 6,
              }}>
                {sanitizeForPDF(personalInfo.phone)}
              </Text>
            )}
            {personalInfo.address && (
              <Text style={{
                fontFamily: 'Helvetica',
                fontSize: 9,
                fontWeight: 'normal',
                color: '#FFFFFF',
                marginBottom: 6,
              }}>
                {sanitizeForPDF(personalInfo.address)}
              </Text>
            )}
          </View>
        )}

        {/* Compétences — pills */}
        {skills.length > 0 && (
          <View style={{ marginBottom: 28 }}>
            {sidebarTitle('COMPÉTENCES')}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {skills.map((s) => (
                <View key={s.id} style={{
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  marginRight: 6,
                  marginBottom: 6,
                }}>
                  <Text style={{
                    fontFamily: 'Helvetica',
                    fontSize: 7,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                  }}>
                    {sanitizeForPDF(s.name)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Langues — barres de progression */}
        {languages.length > 0 && (
          <View style={{ marginBottom: 28 }}>
            {sidebarTitle('LANGUES')}
            {languages.map((l, i) => (
              <View key={l.id} style={{ marginBottom: i < languages.length - 1 ? 10 : 0 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text style={{
                    fontFamily: 'Helvetica',
                    fontSize: 8,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                  }}>
                    {sanitizeForPDF(l.name)}
                  </Text>
                  <Text style={{
                    fontFamily: 'Helvetica',
                    fontSize: 8,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                  }}>
                    {sanitizeForPDF(l.level)}
                  </Text>
                </View>
                <View style={{
                  height: 4,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 2,
                }}>
                  <View style={{
                    height: 4,
                    backgroundColor: '#FFFFFF',
                    width: langWidth(l.level),
                    borderRadius: 2,
                  }} />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* ═══════ CONTENU PRINCIPAL ═══════ */}
      <View style={{
        width: '65%',
        paddingHorizontal: 32,
        paddingVertical: 36,
      }}>
        {/* Summary */}
        {personalInfo.summary && (
          <View style={{ marginBottom: 32 }}>
            <Text style={{
              fontFamily: 'Helvetica',
              fontSize: 10,
              fontWeight: 'normal',
              color: '#3F3F46',
              lineHeight: 1.6,
            }}>
              {sanitizeForPDF(personalInfo.summary)}
            </Text>
          </View>
        )}

        {/* Expériences — timeline */}
        {experiences.length > 0 && (
          <View style={{ marginBottom: 32 }}>
            {mainTitle('EXPÉRIENCE PROFESSIONNELLE')}
            {experiences.map((exp, i) => (
              <View key={exp.id} style={{
                paddingLeft: 20,
                borderLeftWidth: 1,
                borderLeftColor: '#E4E4E7',
                marginBottom: i < experiences.length - 1 ? 20 : 0,
                position: 'relative',
              }}>
                {/* Point timeline */}
                <View style={{
                  position: 'absolute',
                  left: -5,
                  top: 4,
                  width: 9,
                  height: 9,
                  borderRadius: 5,
                  backgroundColor: accent,
                  borderWidth: 2,
                  borderColor: '#FFFFFF',
                }} />
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
                  fontWeight: 'bold',
                  color: 'rgba(0,0,0,0.7)',
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

        {/* Formation */}
        {education.length > 0 && (
          <View style={{ marginBottom: 32 }}>
            {mainTitle('FORMATION')}
            {education.map((edu, i) => (
              <View key={edu.id} style={{ marginBottom: i < education.length - 1 ? 14 : 0 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
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
                    color: '#71717A',
                  }}>
                    {fmtDate(edu.startDate, edu.endDate || '', edu.isCurrent)}
                  </Text>
                </View>
                <Text style={{
                  fontFamily: 'Helvetica',
                  fontSize: 9,
                  fontWeight: 'normal',
                  color: 'rgba(0,0,0,0.7)',
                }}>
                  {sanitizeForPDF(edu.institution)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Références — 2 colonnes */}
        {references.length > 0 && (
          <View>
            {mainTitle('RÉFÉRENCES')}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {references.map((ref) => (
                <View key={ref.id} style={{
                  width: '50%',
                  paddingRight: 16,
                  marginBottom: 14,
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
                    {sanitizeForPDF(ref.position)} @ {sanitizeForPDF(ref.company)}
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
    </View>
  )
}
