import React from 'react';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, User, Award } from 'lucide-react';

const CV_DATA = {
  name: "Jean-Marc Mba",
  title: "Comptable OHADA",
  email: "jm.mba@email.ga",
  phone: "+241 77 00 00 00",
  location: "Libreville, Gabon",
  experience: [
    { company: "Valco", role: "Superviseur Comptable", period: "2020 - Présent" },
    { company: "Gabon Services", role: "Aide Comptable", period: "2018 - 2020" }
  ],
  education: [
    { school: "INSG Libreville", degree: "Master en Comptabilité", year: "2018" }
  ],
  skills: ["Sage 100", "OHADA", "Fiscalité", "Audit"]
};

interface PreviewProps {
  children: React.ReactNode;
  badge?: {
    text: string;
    color: string;
  };
}

const BasePreview = ({ children, badge }: PreviewProps) => (
  <div className="group flex flex-col items-center">
    <div className="w-[270px] h-[382px] overflow-hidden rounded-2xl shadow-xl border border-slate-200 bg-white cursor-default transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-indigo-100 group-hover:-translate-y-2 ring-1 ring-slate-200/50">
      <div className="origin-top-left scale-[0.45] w-[600px] h-[848px] pointer-events-none p-8">
        {children}
      </div>
    </div>
    {badge && (
      <div className={`mt-5 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest shadow-sm ${badge.color} border border-white/20 transition-all duration-300 group-hover:scale-110`}>
        {badge.text}
      </div>
    )}
  </div>
);

export const ClassicPreview = () => (
  <BasePreview badge={{ text: "Tous secteurs", color: "bg-slate-100 text-slate-600" }}>
    <div className="flex flex-col gap-6 text-slate-800">
      <div className="border-b-2 border-slate-900 pb-4 text-center">
        <h1 className="text-4xl font-bold uppercase tracking-wider">{CV_DATA.name}</h1>
        <p className="text-xl text-slate-600 mt-2">{CV_DATA.title}</p>
      </div>
      
      <div className="flex justify-center gap-4 text-sm text-slate-500">
        <div className="flex items-center gap-1"><Mail size={14} /> {CV_DATA.email}</div>
        <div className="flex items-center gap-1"><MapPin size={14} /> {CV_DATA.location}</div>
      </div>

      <div className="space-y-4">
        <div className="border-b border-slate-300 pb-1">
          <h2 className="text-lg font-bold uppercase tracking-tight flex items-center gap-2">
            <Briefcase size={18} /> Expérience Professionnelle
          </h2>
        </div>
        {CV_DATA.experience.map((exp, i) => (
          <div key={i}>
            <div className="flex justify-between font-bold">
              <span>{exp.role}</span>
              <span>{exp.period}</span>
            </div>
            <p className="text-slate-600 italic">{exp.company}</p>
            <div className="mt-2 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full bg-slate-300 w-3/4"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="border-b border-slate-300 pb-1">
          <h2 className="text-lg font-bold uppercase tracking-tight flex items-center gap-2">
            <GraduationCap size={18} /> Formation
          </h2>
        </div>
        {CV_DATA.education.map((edu, i) => (
          <div key={i}>
            <div className="flex justify-between font-bold">
              <span>{edu.degree}</span>
              <span>{edu.year}</span>
            </div>
            <p className="text-slate-600">{edu.school}</p>
          </div>
        ))}
      </div>
    </div>
  </BasePreview>
);

export const ModernPreview = () => (
  <BasePreview badge={{ text: "⭐ Populaire", color: "bg-indigo-600 text-white" }}>
    <div className="flex h-full -m-8">
      {/* Sidebar */}
      <div className="w-1/3 bg-slate-900 text-white p-8 space-y-8 h-full">
        <div className="w-32 h-32 bg-slate-700 rounded-full mx-auto flex items-center justify-center">
          <User size={64} className="text-slate-400" />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Contact</h3>
          <div className="space-y-3 text-xs opacity-90">
            <div className="flex items-center gap-2"><Mail size={12} /> {CV_DATA.email}</div>
            <div className="flex items-center gap-2"><MapPin size={12} /> {CV_DATA.location}</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Compétences</h3>
          <div className="flex flex-wrap gap-2">
            {CV_DATA.skills.map(skill => (
              <span key={skill} className="bg-slate-800 px-2 py-1 rounded text-[10px]">{skill}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 bg-white p-10 space-y-8">
        <div>
          <h1 className="text-5xl font-black text-slate-900 leading-tight">{CV_DATA.name.split(' ')[0]}<br/>{CV_DATA.name.split(' ')[1]}</h1>
          <p className="text-xl font-medium text-indigo-600 mt-2">{CV_DATA.title}</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200"></div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Expérience</h2>
          </div>
          {CV_DATA.experience.map((exp, i) => (
            <div key={i} className="relative pl-6 border-l-2 border-indigo-100">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white"></div>
              <h4 className="font-bold text-slate-800">{exp.role}</h4>
              <p className="text-sm text-indigo-600 font-medium mb-1">{exp.company} | {exp.period}</p>
              <div className="space-y-1">
                <div className="h-1.5 w-full bg-slate-100 rounded"></div>
                <div className="h-1.5 w-5/6 bg-slate-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </BasePreview>
);

export const MinimalPreview = () => (
  <BasePreview badge={{ text: "Recommandé IA", color: "bg-emerald-100 text-emerald-700" }}>
    <div className="flex flex-col gap-10 text-slate-700 max-w-[500px] mx-auto">
      <header className="space-y-2">
        <h1 className="text-5xl font-light tracking-tight text-slate-900">{CV_DATA.name}</h1>
        <p className="text-lg tracking-[0.2em] uppercase text-slate-400">{CV_DATA.title}</p>
      </header>

      <section className="grid grid-cols-2 gap-8 text-sm">
        <div className="space-y-1">
          <p className="font-bold text-slate-900">Email</p>
          <p>{CV_DATA.email}</p>
        </div>
        <div className="space-y-1">
          <p className="font-bold text-slate-900">Localisation</p>
          <p>{CV_DATA.location}</p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-300">Expérience</h2>
        <div className="space-y-8">
          {CV_DATA.experience.map((exp, i) => (
            <div key={i} className="group/item">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-medium text-slate-800">{exp.role}</h3>
                <span className="text-xs text-slate-400">{exp.period}</span>
              </div>
              <p className="text-slate-500 mb-3">{exp.company}</p>
              <div className="h-1 bg-slate-50 rounded-full overflow-hidden">
                <div className="h-full bg-slate-200 w-2/3 group-hover/item:w-full transition-all duration-700"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-300">Compétences</h2>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {CV_DATA.skills.map(skill => (
            <span key={skill} className="text-sm border-b border-slate-100 pb-1">{skill}</span>
          ))}
        </div>
      </section>
    </div>
  </BasePreview>
);
