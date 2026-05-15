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

export const ExecutivePreview = () => (
  <BasePreview badge={{ text: "Cadres & Dirigeants", color: "bg-zinc-800 text-white" }}>
    <div className="flex flex-col h-full text-slate-800">
      <div className="h-4 w-full bg-indigo-600 mb-6" />
      <div className="px-4 mb-8">
        <h1 className="text-4xl font-serif font-bold text-slate-900">{CV_DATA.name}</h1>
        <p className="text-lg text-indigo-600 font-medium uppercase tracking-widest">{CV_DATA.title}</p>
      </div>
      <div className="grid grid-cols-3 gap-6 px-4">
        <div className="col-span-2 space-y-6">
          <h2 className="text-sm font-bold border-b-2 border-slate-900 pb-1">EXPÉRIENCE PROFESSIONNELLE</h2>
          {CV_DATA.experience.map((exp, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between font-bold text-sm">
                <span>{exp.role}</span>
                <span>{exp.period}</span>
              </div>
              <p className="text-xs text-slate-600">{exp.company}</p>
              <div className="h-1.5 w-full bg-slate-100 rounded" />
            </div>
          ))}
        </div>
        <div className="space-y-6">
          <h2 className="text-sm font-bold border-b-2 border-slate-900 pb-1">CONTACT</h2>
          <div className="text-[10px] space-y-2">
            <p>{CV_DATA.email}</p>
            <p>{CV_DATA.phone}</p>
            <p>{CV_DATA.location}</p>
          </div>
          <h2 className="text-sm font-bold border-b-2 border-slate-900 pb-1">EXPERTISE</h2>
          <div className="flex flex-col gap-1">
            {CV_DATA.skills.map(skill => (
              <span key={skill} className="text-[10px] font-medium">• {skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </BasePreview>
);

export const CreativePreview = () => (
  <BasePreview badge={{ text: "Portfolio Ready", color: "bg-purple-600 text-white" }}>
    <div className="flex h-full">
      <div className="w-2/3 p-8 space-y-8">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">{CV_DATA.name}</h1>
          <div className="h-2 w-20 bg-purple-500 mt-2" />
          <p className="text-xl font-bold text-slate-400 mt-4 italic">{CV_DATA.title}</p>
        </div>
        <div className="space-y-6">
          <h2 className="text-xl font-black text-purple-600 italic">PARCOURS</h2>
          {CV_DATA.experience.map((exp, i) => (
            <div key={i} className="space-y-1">
              <h4 className="font-bold text-lg">{exp.role}</h4>
              <p className="text-sm font-medium opacity-60">{exp.company} / {exp.period}</p>
              <div className="h-3 w-full bg-purple-50 rounded-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/3 bg-purple-600 p-8 text-white space-y-8">
        <div className="space-y-4">
          <h3 className="font-black text-sm uppercase tracking-[0.2em] border-b border-white/30 pb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {CV_DATA.skills.map(skill => (
              <span key={skill} className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold">{skill}</span>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-black text-sm uppercase tracking-[0.2em] border-b border-white/30 pb-2">Reach Me</h3>
          <div className="text-[10px] space-y-2 opacity-80">
            <p>{CV_DATA.email}</p>
            <p>{CV_DATA.location}</p>
          </div>
        </div>
      </div>
    </div>
  </BasePreview>
);

export const TechPreview = () => (
  <BasePreview badge={{ text: "Dev & IT Optimized", color: "bg-emerald-600 text-white" }}>
    <div className="bg-slate-900 h-full p-8 text-slate-300 font-mono">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-bold text-emerald-400">const developer = "{CV_DATA.name}";</h1>
          <p className="text-emerald-400/60 mt-2 text-sm">// {CV_DATA.title}</p>
        </div>
        <div className="text-[10px] text-right text-slate-500">
           {CV_DATA.location}<br/>
           {CV_DATA.email}
        </div>
      </div>
      <div className="space-y-8">
        <section>
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-emerald-500">01.</span> EXPERIENCE
          </h2>
          <div className="space-y-4 pl-4 border-l border-slate-800">
            {CV_DATA.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs text-emerald-400 mb-1">
                   <span>{exp.role}</span>
                   <span>{exp.period}</span>
                </div>
                <p className="text-[10px] text-slate-500 mb-2">{exp.company}</p>
                <div className="h-1 w-full bg-slate-800 rounded">
                   <div className="h-full bg-emerald-500/30 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-emerald-500">02.</span> STACK
          </h2>
          <div className="flex flex-wrap gap-2 pl-4">
            {CV_DATA.skills.map(skill => (
              <span key={skill} className="text-[10px] border border-emerald-500/30 px-2 py-0.5 rounded text-emerald-400/80">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  </BasePreview>
);

export const ElegantPreview = () => (
  <BasePreview badge={{ text: "Premium & Luxe", color: "bg-rose-100 text-rose-700" }}>
    <div className="h-full border-[12px] border-rose-50 p-8 flex flex-col items-center text-center">
      <div className="w-16 h-px bg-rose-200 mb-6" />
      <h1 className="text-4xl font-serif italic text-slate-900 mb-2">{CV_DATA.name}</h1>
      <p className="text-xs uppercase tracking-[0.4em] text-rose-600 mb-8">{CV_DATA.title}</p>
      
      <div className="w-full grid grid-cols-2 gap-8 text-[10px] text-slate-500 mb-12 border-y border-rose-50 py-4">
        <span>{CV_DATA.email}</span>
        <span>{CV_DATA.location}</span>
      </div>

      <div className="w-full space-y-8">
        <h2 className="text-xs font-serif italic text-slate-400">Expériences Significatives</h2>
        {CV_DATA.experience.map((exp, i) => (
          <div key={i} className="space-y-2">
            <h3 className="font-bold text-slate-800 italic">{exp.role}</h3>
            <p className="text-[10px] uppercase tracking-widest text-rose-400">{exp.company} — {exp.period}</p>
            <div className="h-px w-20 mx-auto bg-rose-100" />
          </div>
        ))}
      </div>

      <div className="mt-auto pt-8">
        <div className="flex gap-4">
           {CV_DATA.skills.map(skill => (
             <span key={skill} className="text-[10px] font-serif italic text-slate-400">{skill}</span>
           ))}
        </div>
      </div>
    </div>
  </BasePreview>
);

export const CompactPreview = () => (
  <BasePreview badge={{ text: "Efficacité Maximale", color: "bg-orange-100 text-orange-700" }}>
    <div className="p-4 text-slate-800">
      <div className="flex justify-between items-end border-b-2 border-orange-500 pb-2 mb-4">
        <div>
          <h1 className="text-2xl font-black">{CV_DATA.name}</h1>
          <p className="text-xs font-bold text-orange-600 uppercase">{CV_DATA.title}</p>
        </div>
        <div className="text-[8px] text-right font-medium opacity-60">
          {CV_DATA.email} | {CV_DATA.phone}<br/>
          {CV_DATA.location}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <h2 className="text-[10px] font-black bg-slate-100 px-1">EXPÉRIENCE</h2>
          {CV_DATA.experience.map((exp, i) => (
            <div key={i} className="space-y-0.5">
              <p className="text-[10px] font-bold">{exp.role}</p>
              <p className="text-[8px] opacity-70">{exp.company} | {exp.period}</p>
              <div className="h-1 w-full bg-slate-50 rounded-full" />
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <h2 className="text-[10px] font-black bg-slate-100 px-1">COMPÉTENCES</h2>
          <div className="grid grid-cols-2 gap-1">
            {CV_DATA.skills.map(skill => (
              <span key={skill} className="text-[8px] font-medium">• {skill}</span>
            ))}
          </div>
          <h2 className="text-[10px] font-black bg-slate-100 px-1">FORMATION</h2>
          {CV_DATA.education.map((edu, i) => (
            <div key={i} className="space-y-0.5">
              <p className="text-[10px] font-bold">{edu.degree}</p>
              <p className="text-[8px] opacity-70">{edu.school}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </BasePreview>
);
