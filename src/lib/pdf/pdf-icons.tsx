import React from 'react'
import { Svg, Path, Circle, Rect } from '@react-pdf/renderer'

interface PDFIconProps {
  size?: number
  color?: string
}

const SVGWrapper: React.FC<PDFIconProps & { children: React.ReactNode }> = ({
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

export const MailIcon: React.FC<PDFIconProps> = (props) => (
  <SVGWrapper {...props}>
    <Rect x="2" y="4" width="20" height="16" rx="2" />
    <Path d="M22 6l-10 7L2 6" />
  </SVGWrapper>
)

export const PhoneIcon: React.FC<PDFIconProps> = (props) => (
  <SVGWrapper {...props}>
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.64 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </SVGWrapper>
)

export const MapPinIcon: React.FC<PDFIconProps> = (props) => (
  <SVGWrapper {...props}>
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <Circle cx="12" cy="10" r="3" />
  </SVGWrapper>
)

export const GlobeIcon: React.FC<PDFIconProps> = (props) => (
  <SVGWrapper {...props}>
    <Circle cx="12" cy="12" r="10" />
    <Path d="M2 12h20" />
    <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </SVGWrapper>
)

export const BuildingIcon: React.FC<PDFIconProps> = (props) => (
  <SVGWrapper {...props}>
    <Rect x="4" y="2" width="16" height="20" rx="2" />
    <Path d="M9 22v-4h6v4" />
    <Path d="M8 6h2" />
    <Path d="M14 6h2" />
    <Path d="M8 10h2" />
    <Path d="M14 10h2" />
    <Path d="M8 14h2" />
    <Path d="M14 14h2" />
  </SVGWrapper>
)

export const GraduationCapIcon: React.FC<PDFIconProps> = (props) => (
  <SVGWrapper {...props}>
    <Path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <Path d="M6 12v5c3 3 9 3 12 0v-5" />
  </SVGWrapper>
)

export const UserCheckIcon: React.FC<PDFIconProps> = (props) => (
  <SVGWrapper {...props}>
    <Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <Circle cx="9" cy="7" r="4" />
    <Path d="M16 11l2 2 4-4" />
  </SVGWrapper>
)

export const CalendarIcon: React.FC<PDFIconProps> = (props) => (
  <SVGWrapper {...props}>
    <Rect x="3" y="4" width="18" height="18" rx="2" />
    <Path d="M16 2v4" />
    <Path d="M8 2v4" />
    <Path d="M3 10h18" />
  </SVGWrapper>
)

export const LaptopIcon: React.FC<PDFIconProps> = (props) => (
  <SVGWrapper {...props}>
    <Rect x="2" y="3" width="20" height="14" rx="2" />
    <Path d="M2 20h20" />
  </SVGWrapper>
)

export const LanguagesIcon: React.FC<PDFIconProps> = (props) => (
  <SVGWrapper {...props}>
    <Path d="m5 8 6 6" />
    <Path d="m4 14 6-6 2-3" />
    <Path d="M2 5h12" />
    <Path d="M7 2h1" />
    <Path d="m22 22-5-10-5 10" />
    <Path d="M14 18h6" />
  </SVGWrapper>
)
