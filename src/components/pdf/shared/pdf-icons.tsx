import React from 'react'
import { Svg, Path, Circle, Rect } from '@react-pdf/renderer'

interface PDFIconProps {
  size?: number
  color?: string
}

const PDFIcon: React.FC<PDFIconProps & { children: React.ReactNode }> = ({
  size = 10,
  color = '#000000',
  children,
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </Svg>
)

export const MailIcon: React.FC<PDFIconProps> = ({ size, color }) => (
  <PDFIcon size={size} color={color}>
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <Path d="M22 6l-10 7L2 6" />
  </PDFIcon>
)

export const PhoneIcon: React.FC<PDFIconProps> = ({ size, color }) => (
  <PDFIcon size={size} color={color}>
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.64 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </PDFIcon>
)

export const MapPinIcon: React.FC<PDFIconProps> = ({ size, color }) => (
  <PDFIcon size={size} color={color}>
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <Circle cx={12} cy={10} r={3} fill="none" />
  </PDFIcon>
)

export const Globe2Icon: React.FC<PDFIconProps> = ({ size, color }) => (
  <PDFIcon size={size} color={color}>
    <Path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
    <Path d="M2 12h20" />
    <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </PDFIcon>
)

export const CalendarIcon: React.FC<PDFIconProps> = ({ size, color }) => (
  <PDFIcon size={size} color={color}>
    <Rect x={3} y={4} width={18} height={18} rx={2} fill="none" />
    <Path d="M16 2v4" />
    <Path d="M8 2v4" />
    <Path d="M3 10h18" />
  </PDFIcon>
)

export const Building2Icon: React.FC<PDFIconProps> = ({ size, color }) => (
  <PDFIcon size={size} color={color}>
    <Path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
    <Path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <Path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
    <Path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
  </PDFIcon>
)

export const GraduationCapIcon: React.FC<PDFIconProps> = ({ size, color }) => (
  <PDFIcon size={size} color={color}>
    <Path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <Path d="M6 12v5c3 3 9 3 12 0v-5" />
  </PDFIcon>
)

export const UserCheckIcon: React.FC<PDFIconProps> = ({ size, color }) => (
  <PDFIcon size={size} color={color}>
    <Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <Circle cx={9} cy={7} r={4} fill="none" />
    <Path d="M16 11l2 2 4-4" />
  </PDFIcon>
)

export const LaptopIcon: React.FC<PDFIconProps> = ({ size, color }) => (
  <PDFIcon size={size} color={color}>
    <Rect x={2} y={3} width={20} height={13} rx={2} fill="none" />
    <Path d="M2 20h20" />
  </PDFIcon>
)

export const LanguagesIcon: React.FC<PDFIconProps> = ({ size, color }) => (
  <PDFIcon size={size} color={color}>
    <Path d="M5 8l6 6" />
    <Path d="M4 14l6-6 2-3" />
    <Path d="M2 5h12" />
    <Path d="M7 2h1" />
    <Path d="M22 22l-5-10-5 10" />
    <Path d="M14 18h6" />
  </PDFIcon>
)
