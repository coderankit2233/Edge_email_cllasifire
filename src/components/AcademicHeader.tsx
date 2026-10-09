import React from 'react';
import { PROJECT_METADATA } from '../data/projectData';
import { GraduationCap, Users, UserCheck } from 'lucide-react';

export const AcademicHeader: React.FC = () => {
  return (
    <div className="bg-slate-900/90 border-b border-slate-800 text-slate-100 py-6 px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-5 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1.5 uppercase tracking-wider">
              <span>{PROJECT_METADATA.type}</span>
              <span aria-hidden="true">·</span>
              <span>GIFT Autonomous College</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 max-w-3xl">
              {PROJECT_METADATA.title}
            </h1>
            
            <p className="text-sm text-slate-400 font-medium max-w-2xl">
              {PROJECT_METADATA.department}, {PROJECT_METADATA.institution}, {PROJECT_METADATA.location}
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:items-end justify-center bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80 text-xs">
            <div className="text-slate-400 mb-1">
              Team: <span className="font-semibold text-white">{PROJECT_METADATA.teamName}</span>
            </div>
            <div className="text-slate-400 mb-1">
              Project Type: <span className="font-medium text-slate-200">Hardware & SLM Edge Appliance</span>
            </div>
            <div className="text-slate-400">
              Target Edge Device: <span className="font-mono text-cyan-400">NVIDIA Jetson Orin Nano (8GB)</span>
            </div>
          </div>
        </div>

        {/* Academic Personnel Strip */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="flex items-start gap-3 bg-slate-950/40 p-2.5 rounded-md border border-slate-800/50">
            <Users className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-200">Team Members (Team Trackmind)</div>
              <div className="text-slate-400 mt-0.5 leading-relaxed">
                <div>Ankit Kumar Manjhi <span className="font-mono text-slate-400 text-[11px]">(Reg: 2301298317)</span></div>
                <div>Amardeep Kumar <span className="font-mono text-slate-400 text-[11px]">(Reg: 2301298308)</span></div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950/40 p-2.5 rounded-md border border-slate-800/50">
            <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-200">Mentor & Guide</div>
              <div className="text-slate-300 font-medium mt-0.5">
                {PROJECT_METADATA.mentor.name}
              </div>
              <div className="text-slate-400 text-[11px]">
                {PROJECT_METADATA.mentor.designation}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950/40 p-2.5 rounded-md border border-slate-800/50">
            <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-200">Department & Institution</div>
              <div className="text-slate-400 mt-0.5 leading-relaxed text-[11px]">
                Dept. of Computer Science & Engineering (Applied AI)
                <div className="text-slate-400">GIFT Autonomous College, Bhubaneswar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
