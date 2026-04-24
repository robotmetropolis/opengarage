import React from 'react';
import { Car, History, Box } from 'lucide-react';
import { Card, Badge } from './ui.jsx';

export default function CarCard({ car, onClick }) {
  return (
    <Card onClick={onClick} className="group">
      <div className="h-56 bg-slate-800 relative overflow-hidden">
        {car.photoUrl ? (
          <img
            src={car.photoUrl}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            alt={car.model}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Car className="w-20 h-20 text-slate-700" />
          </div>
        )}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {car.needsService && <Badge variant="warning">Mecánica</Badge>}
          {!car.papersOk && <Badge variant="danger">Papeles</Badge>}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full border-2 border-white/20 shadow-2xl shadow-black"
            style={{ backgroundColor: car.colorHex }}
          ></div>
          <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
            {car.colorName}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-black text-white truncate uppercase tracking-tighter">
          {car.make} {car.model}
        </h3>
        <p className="text-slate-500 text-xs font-bold mt-1.5">
          {car.year} • {car.plate || 'SIN PATENTE'}
        </p>

        <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/5">
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-black uppercase">
            <History className="w-4 h-4 text-blue-500" />
            {Number(car.mileage || 0).toLocaleString()} KM
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-black uppercase">
            <Box className="w-4 h-4 text-emerald-500" />
            {car.status}
          </div>
        </div>

        <button className="w-full mt-6 py-3 bg-slate-800 group-hover:bg-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all">
          Ver Ficha Técnica
        </button>
      </div>
    </Card>
  );
}
