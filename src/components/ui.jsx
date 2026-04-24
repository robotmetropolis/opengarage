import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

export const Card = ({ children, className = '', onClick }) => (
  <div
    onClick={onClick}
    className={`bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 ${
      onClick ? 'cursor-pointer hover:border-blue-500/50 hover:shadow-blue-900/10' : ''
    } ${className}`}
  >
    {children}
  </div>
);

export const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-slate-800 text-slate-300',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    info: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

export function StatItem({ label, value, sub, icon }) {
  return (
    <Card className="p-4 sm:p-6 flex items-center gap-3 sm:gap-6 border-white/5 bg-slate-900/40">
      <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-slate-800 flex items-center justify-center shadow-inner shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-600 mb-1.5 truncate">
          {label}
        </p>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-2xl sm:text-3xl font-black text-white leading-none tracking-tighter">
            {value}
          </span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {sub}
          </span>
        </div>
      </div>
    </Card>
  );
}

export function InfoItem({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">{label}</p>
      <p className="text-white font-black uppercase text-sm truncate">{value || '-'}</p>
    </div>
  );
}

export function DocRow({ label, active, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`p-5 rounded-2xl border flex justify-between items-center cursor-pointer transition-all duration-300 ${
        active
          ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
          : 'bg-slate-950 border-white/5 text-slate-600 hover:border-white/10'
      }`}
    >
      <span className="text-xs font-black uppercase tracking-widest">{label}</span>
      <div
        className={`w-6 h-6 rounded-lg flex items-center justify-center ${
          active ? 'bg-emerald-500/20' : 'bg-slate-800'
        }`}
      >
        {active ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4 opacity-40" />}
      </div>
    </div>
  );
}

export function Tab({ label, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-6 flex items-center gap-3 text-[10px] font-black tracking-[0.3em] transition-all border-b-4 ${
        active ? 'border-blue-600 text-white' : 'border-transparent text-slate-600 hover:text-slate-400'
      }`}
    >
      {icon} {label}
    </button>
  );
}

export function InputField({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-slate-800 border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-blue-500 text-white outline-none placeholder:text-slate-700 hover:bg-slate-700 transition-colors"
      />
    </div>
  );
}

export function CheckboxField({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-4 cursor-pointer group w-fit">
      <div
        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
          checked
            ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-900/30'
            : 'border-slate-700 bg-slate-900 group-hover:border-slate-500'
        }`}
      >
        {checked && <CheckCircle2 className="w-4 h-4 text-white" />}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />
      <span className="text-sm font-black text-slate-500 group-hover:text-slate-300 uppercase tracking-wider transition-colors">
        {label}
      </span>
    </label>
  );
}
