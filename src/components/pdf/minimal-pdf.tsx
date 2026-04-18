import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import { PDFPhoto } from './shared/pdf-photo'
import { sanitizeForPDF } from './pdf-document'
import { CVContent, CVSettings } from '@/types/cv'

function fmtDate(start: string, end: string, current: boolean): string {
  return `${sanitizeForPDF(start)} — ${current ? 'Présent' : sanitizeForPDF(end)}`
}

export function MinimalPDF({ content, settings }: { content: CVContent; settings: CVSettings }) {
  const { personalInfo, experiences, education, skills, languages, references } = content
  const accent = settings.accentColor

  const sectionTitle = (title: string) => (
    <Text style={{
      fontFamily: 'Helvetica',
      fontSize: 8,
      fontWeight: 'normal',
      textTransform: 'uppercase',
      letterSpacing: 2,
      color: '#D4D4D8',
      borderBottomWidth: 1,
      borderBottomColor: '#E4E4E7',
      paddingBottom: 8,
      marginBottom: 12,
    }}>
      {title}
    </Text>
  )

  const contacts: string[] = []
  if (personalInfo.email) contacts.push(sanitizeForPDF(personalInfo.email))
  if (personalInfo.phone) contacts.push(sanitizeForPDF(personalInfo.phone))
  if (personalInfo.address) contacts.push(sanitizeForPDF(personalInfo.address))

  return (
    <View style={{ paddingHorizontal: 48, paddingVertical: 44 }}>
      {/* ── HEADER ── */}
      <View style={{ alignItems: 'center', marginBottom: 44 }}>
        {/* Photo */}
        {settings.photoUrl && (
          <View style={{ marginBottom: 16 }}>
            <PDFPhoto src={settings.photoUrl} style={{ width: 64, height: 64 }} />
          </View>
        )}

        {/* Nom */}
        <Text style={{
          fontFamily: 'Helvetica',
          fontSize: 32,
          fontWeight: 'normal',
          letterSpacing: -0.5,
          color: accent,
          marginBottom: 8,
          textAlign: 'center',
        }}>
          {sanitizeForPDF(personalInfo.fullName)}
        </Text>

        {/* Poste */}
        <Text style={{
          fontFamily: 'Helvetica',
          fontSize: 12,
          fontWeight: 'normal',
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: '#A1A1AA',
          marginBottom: 16,
          textAlign: 'center',
        }}>
          {sanitizeForPDF(personalInfo.jobTitle)}
        </Text>

        {/* Ligne fine */}
        <View style={{
          height: 1,
          width: 80,
          backgroundColor: '#E4E4E7',
          marginBottom: 16,
        }} />

        {/* Contact */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {contacts.map((item, i) => (
            <Text key={i} style={{
              fontFamily: 'Helvetica',
              fontSize: 8,
              fontWeight: 'normal',
              textTransform: 'uppercase',
              color: '#71717A',
              marginRight: i < contacts.length - 1 ? 24 : 0,
            }}>
              {item}
            </Text>
          ))}
        </View>
      </View>

      {/* ── SUMMARY ── */}
      {personalInfo.summary && (
        <View style={{ marginBottom: 40 }}>
          <Text style={{
            fontFamily: 'Helvetica',
            fontSize: 10,
            fontWeight: 'normal',
            fontStyle: 'italic',
            color: '#52525B',
            textAlign: 'center',
            lineHeight: 1.6,
          }}>
            "{sanitizeForPDF(personalInfo.summary)}"
          </Text>
        </View>
      )}

      {/* ── EXPÉRIENCES — grille [dates droite | contenu gauche] ── */}
      {experiences.length > 0 && (
        <View style={{ marginBottom: 40 }}>
          {sectionTitle('EXPÉRIENCE')}
          {experiences.map((exp, i) => (
            <View key={exp.id} style={{
              flexDirection: 'row',
              marginBottom: i < experiences.length - 1 ? 20 : 0,
            }}>
              {/* Dates — colonne droite */}
              <View style={{ width: '33%', paddingRight: 16 }}>
                <Text style={{
                  fontFamily: 'Helvetica',
                  fontSize: 8,
                  fontWeight: 'bold',
                  color: '#A1A1AA',
                  textAlign: 'right',
                }}>
                  {fmtDate(exp.startDate, exp.endDate || '', exp.isCurrent)}
                </Text>
              </View>

              {/* Contenu — colonne gauche */}
              <View style={{ width: '67%' }}>
                <Text style={{
                  fontFamily: 'Helvetica',
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: '#18181B',
                  marginBottom: 2,
                }}>
                  {sanitizeForPDF(exp.position)}
                </Text>
                <Text style={{
                  fontFamily: 'Helvetica',
                  fontSize: 9,
                  fontWeight: 'normal',
                  color: '#A1A1AA',
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
            </View>
          ))}
        </View>
      )}

      {/* ── FORMATION — 2 colonnes ── */}
      {education.length > 0 && (
        <View style={{ marginBottom: 40 }}>
          {sectionTitle('FORMATION')}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {education.map((edu) => (
              <View key={edu.id} style={{
                width: '50%',
                paddingRight: 24,
                marginBottom: 16,
              }}>
                <Text style={{
                  fontFamily: 'Helvetica',
                  fontSize: 8,
                  fontWeight: 'bold',
                  color: '#A1A1AA',
                  marginBottom: 2,
                }}>
                  {fmtDate(edu.startDate, edu.endDate || '', edu.isCurrent)}
                </Text>
                <Text style={{
                  fontFamily: 'Helvetica',
                  fontSize: 10,
                  fontWeight: 'bold',
                  color: '#18181B',
                  marginBottom: 2,
                }}>
                  {sanitizeForPDF(edu.degree)}
                </Text>
                <Text style={{
                  fontFamily: 'Helvetica',
                  fontSize: 8,
                  fontWeight: 'normal',
                  color: '#71717A',
                }}>
                  {sanitizeForPDF(edu.institution)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* ── COMPÉTENCES + LANGUES — 2 colonnes ── */}
      {(skills.length > 0 || languages.length > 0) && (
        <View style={{ flexDirection: 'row', marginBottom: 40 }}>
          <View style={{ width: '50%', paddingRight: 24 }}>
            {skills.length > 0 && (
              <View>
                {sectionTitle('COMPÉTENCES')}
                {skills.map((s, i) => (
                  <Text key={s.id} style={{
                    fontFamily: 'Helvetica',
                    fontSize: 9,
                    fontWeight: 'normal',
                    color: '#52525B',
                    marginBottom: i < skills.length - 1 ? 4 : 0,
                  }}>
                    {sanitizeForPDF(s.name)}
                  </Text>
                ))}
              </View>
            )}
          </View>
          <View style={{ width: '50%', paddingLeft: 24 }}>
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
                      color: '#52525B',
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
                paddingRight: 24,
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
                  {sanitizeForPDF(ref.position)}
                </Text>
                {ref.company && (
                  <Text style={{
                    fontFamily: 'Helvetica',
                    fontSize: 9,
                    fontWeight: 'normal',
                    color: '#52525B',
                  }}>
                    {sanitizeForPDF(ref.company)}
                  </Text>
                )}
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
