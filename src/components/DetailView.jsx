import React, { useState } from 'react';
import {
  Car,
  Camera,
  ChevronLeft,
  Trash2,
  Rotate3d,
  ShieldCheck,
  Activity,
  FileSearch,
} from 'lucide-react';
import { Card, Badge, InfoItem, DocRow, Tab } from './ui.jsx';
import Car3DViewer from './Car3DViewer.jsx';

export default function DetailView({ car, onBack, onEdit, onUpdate, onDelete }) {
  const [tab, setTab] = useState('3d');
  const history = car.history || [];
  const docs = car.documents || { insurance: false, vtv: false, title: false, taxes: false };

  const handleToggleDoc = (key) => {
    onUpdate({ ...car, documents: { ...docs, [key]: !docs[key] } });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors font-black text-[10px] uppercase tracking-[0.3em]"
        >
          <ChevronLeft className="w-5 h-5" /> Regresar al Garage
        </button>
        <div className="flex gap-4">
          <button
            onClick={onEdit}
            className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Editar Auto
          </button>
          <button
            onClick={() => onDelete(car.id)}
            className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 p-3 rounded-2xl transition-all"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-8">
          <Card>
            <div className="h-72 bg-slate-800 relative">
              {car.photoUrl ? (
                <img src={car.photoUrl} className="w-full h-full object-cover" alt={car.model} />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Car className="w-24 h-24 text-slate-700" />
                </div>
              )}
              <div
                className="absolute top-6 right-6 w-14 h-14 rounded-2xl shadow-2xl border-4 border-slate-900"
                style={{ backgroundColor: car.colorHex }}
              ></div>
            </div>
            <div className="p-8">
              <h2 className="text-4xl font-black text-white leading-none tracking-tighter uppercase">
                {car.make}
              </h2>
              <p className="text-2xl text-slate-500 font-bold mt-2 uppercase">{car.model}</p>

              <div className="grid grid-cols-2 gap-6 mt-10 py-8 border-y border-white/5">
                <InfoItem label="Fabricación" value={car.year} />
                <InfoItem label="Matrícula" value={car.plate || '-'} />
                <InfoItem
                  label="Kilometraje"
                  value={Number(car.mileage || 0).toLocaleString()}
                />
                <InfoItem label="Estatus" value={car.status} />
              </div>

              <div className="mt-10 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-slate-400">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      car.needsService ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
                    }`}
                  ></div>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {car.needsService ? 'Service Pendiente' : 'Mecánica al día'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      car.papersOk ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'
                    }`}
                  ></div>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {car.papersOk ? 'Documentación OK' : 'Papeles Vencidos'}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-8 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5" /> AUDITORÍA LEGAL
            </h4>
            <div className="space-y-4">
              <DocRow
                label="Seguro de Unidad"
                active={docs.insurance}
                onToggle={() => handleToggleDoc('insurance')}
              />
              <DocRow
                label="Inspección VTV / ITV"
                active={docs.vtv}
                onToggle={() => handleToggleDoc('vtv')}
              />
              <DocRow
                label="Título de Propiedad"
                active={docs.title}
                onToggle={() => handleToggleDoc('title')}
              />
              <DocRow
                label="Patentes e Impuestos"
                active={docs.taxes}
                onToggle={() => handleToggleDoc('taxes')}
              />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div className="flex gap-10 border-b border-white/5 overflow-x-auto">
            <Tab
              label="SIMULADOR 3D"
              active={tab === '3d'}
              onClick={() => setTab('3d')}
              icon={<Rotate3d className="w-5 h-5" />}
            />
            <Tab
              label="HISTORIA CLÍNICA"
              active={tab === 'history'}
              onClick={() => setTab('history')}
              icon={<Activity className="w-5 h-5" />}
            />
            <Tab
              label="PAPELERA / GALERÍA"
              active={tab === 'gallery'}
              onClick={() => setTab('gallery')}
              icon={<Camera className="w-5 h-5" />}
            />
          </div>

          <div className="min-h-[600px]">
            {tab === '3d' && (
              <div className="h-[600px] bg-slate-900 rounded-[3rem] border border-white/5 relative shadow-inner overflow-hidden group">
                <Car3DViewer color={car.colorHex} />
                <div className="absolute inset-0 pointer-events-none p-10 flex flex-col justify-end">
                  <div className="bg-slate-950/80 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 w-fit max-w-sm">
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">
                      Digital Twin
                    </p>
                    <h4 className="text-2xl font-black text-white uppercase leading-none">
                      Chasis e Interior
                    </h4>
                    <p className="text-slate-400 text-sm mt-4 font-medium leading-relaxed">
                      Representación volumétrica estilizada. El auto rota automáticamente para que puedas
                      examinar la distribución de color de la unidad.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {tab === 'history' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                    Cronología de Servicios
                  </h3>
                  <button
                    onClick={() => {
                      const desc = window.prompt('Descripción del servicio:');
                      if (desc) {
                        const newHistory = [
                          {
                            date: new Date().toISOString().split('T')[0],
                            description: desc,
                            mileage: car.mileage,
                            cost: window.prompt('Costo de la intervención ($):') || '0',
                          },
                          ...history,
                        ];
                        onUpdate({ ...car, history: newHistory });
                      }
                    }}
                    className="bg-blue-600/10 text-blue-500 hover:bg-blue-600/20 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest"
                  >
                    + Nueva Entrada
                  </button>
                </div>

                {history.length > 0 ? (
                  <div className="relative pl-10 space-y-8 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-1 before:bg-slate-800 before:rounded-full">
                    {history.map((h, i) => (
                      <div key={i} className="relative group">
                        <div className="absolute -left-[31px] top-1 w-6 h-6 rounded-full bg-slate-950 border-4 border-blue-600 group-hover:scale-125 transition-transform"></div>
                        <Card className="p-8 bg-slate-900/40 hover:bg-slate-900 transition-all border-white/5">
                          <div className="flex justify-between items-start mb-6">
                            <span className="text-blue-500 font-black text-xs tracking-widest">
                              {h.date}
                            </span>
                            <Badge variant="info">
                              {Number(h.mileage || 0).toLocaleString()} KM
                            </Badge>
                          </div>
                          <h5 className="text-xl font-black text-white uppercase">
                            {h.description}
                          </h5>
                          {h.cost && (
                            <p className="text-emerald-500 text-sm font-black mt-4">
                              INVERSIÓN: ${h.cost}
                            </p>
                          )}
                        </Card>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-32 text-center bg-slate-900/30 rounded-[3rem] border border-dashed border-white/5">
                    <Activity className="w-20 h-20 text-slate-800 mx-auto mb-8" />
                    <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-xs">
                      Sin registros históricos
                    </p>
                  </div>
                )}
              </div>
            )}

            {tab === 'gallery' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="aspect-square bg-slate-900 border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-slate-800 transition-all text-slate-700">
                  <Camera className="w-12 h-12" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    Cargar Foto
                  </span>
                </div>
                {car.photoUrl && (
                  <div className="aspect-square rounded-[2.5rem] overflow-hidden border border-white/5 group relative shadow-2xl">
                    <img
                      src={car.photoUrl}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      alt="Vista Galería"
                    />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <FileSearch className="text-white w-10 h-10" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
