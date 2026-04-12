import { StyleSheet } from '@react-pdf/renderer'

export const fontSizeMap = {
  small:  { name: 9,  title: 11, section: 10, body: 8  },
  medium: { name: 11, title: 13, section: 11, body: 9  },
  large:  { name: 13, title: 15, section: 13, body: 10 },
}

export const createStyles = (accentColor: string, fontSize: keyof typeof fontSizeMap, fontFamily: string) => {
  const sizes = fontSizeMap[fontSize]

  // Font family mapping to match registered font names or fallback to Helvetica
  const getFontFamily = (name: string) => {
    switch (name) {
      case 'inter': return 'Inter'
      case 'roboto': return 'Roboto'
      case 'merriweather': return 'Merriweather'
      case 'playfair': return 'Playfair'
      default: return 'Helvetica'
    }
  }

  const family = getFontFamily(fontFamily)

  return StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: family,
    },
    // Typographic elements
    name: {
      fontSize: sizes.name + 8,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 5,
    },
    jobTitle: {
      fontSize: sizes.title,
      color: accentColor,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: sizes.section,
      fontWeight: 'bold',
      color: accentColor,
      borderBottomWidth: 1,
      borderBottomColor: accentColor,
      paddingBottom: 3,
      marginBottom: 10,
      marginTop: 15,
      textTransform: 'uppercase',
    },
    body: {
      fontSize: sizes.body,
      color: '#374151',
      lineHeight: 1.5,
    },
    muted: {
      fontSize: sizes.body - 1,
      color: '#6B7280',
    },
    // Layout utilities
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    flexRowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    flexCol: {
      flexDirection: 'column',
    },
    gap1: { gap: 4 },
    gap2: { gap: 8 },
    gap3: { gap: 12 },
    mb1: { marginBottom: 5 },
    mb2: { marginBottom: 10 },
    // Custom elements
    photo: {
      width: 80,
      height: 80,
      borderRadius: 40,
      objectFit: 'cover',
    },
    contactIconContainer: {
      width: 14,
      height: 14,
      marginRight: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // Template specific
    modernSidebar: {
      width: '35%',
      backgroundColor: accentColor,
      padding: 20,
      color: 'white',
    },
    modernMain: {
      width: '65%',
      padding: 20,
      paddingTop: 30,
    },
    modernSectionTitle: {
      fontSize: sizes.section,
      fontWeight: 'bold',
      color: 'white',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.3)',
      paddingBottom: 3,
      marginBottom: 10,
      marginTop: 15,
      textTransform: 'uppercase',
    },
    minimalSectionTitle: {
      fontSize: sizes.section,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 8,
      marginTop: 15,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    minimalName: {
      fontSize: sizes.name + 6,
      fontWeight: 'bold',
      color: accentColor,
      marginBottom: 5,
      letterSpacing: 2,
      textTransform: 'uppercase',
    }
  })
}
