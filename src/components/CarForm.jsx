import React, { useState } from 'react';
import { Card, InputField, CheckboxField } from './ui.jsx';

const EMPTY_CAR = {
  make: '',
  model: '',
  year: new Date().getFullYear(),
  plate: '',
  mileage: '',
  status: 'En Garage',
  colorHex: '#3b82f6',
  colorName: 'Azul',
  photoUrl: '',
  needsService: false,
  papersOk: true,
  history: [],
  documents: { insurance: false, vtv: false, title: false, taxes: false },
};

export default function CarForm({ car, onCancel, onSave }) {
  const [formData, setFormData] = useState(car || EMPTY_CAR);

  return (
    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-10 animate-in slide-in-from-bottom-8 duration-700">
      <div className="flex justify-between items-center gap-3 flex-wrap">
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tighter uppercase">
          {car ? 'MODIFICAR FICHA' : 'REGISTRAR INGRESO'}
        </h2>
        <button
          onClick={onCancel}
          className="text-slate-600 hover:text-white font-black text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-colors"
        >
          Cancelar
        </button>
      </div>

      <Card className="p-5 sm:p-10 space-y-8 sm:space-y-10 border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          <InputField
            label="Marca"
            value={formData.make}
            onChange={(v) => setFormData({ ...formData, make: v })}
            placeholder="Ej: Ferrari"
          />
          <InputField
            label="Modelo"
            value={formData.model}
            onChange={(v) => setFormData({ ...formData, model: v })}
            placeholder="Ej: F40"
          />
          <InputField
            label="Año de Fabricación"
            type="number"
            value={formData.year}
            onChange={(v) => setFormData({ ...formData, year: v })}
          />
          <InputField
            label="Matrícula / Patente"
            value={formData.plate}
            onChange={(v) => setFormData({ ...formData, plate: v })}
            placeholder="Ej: RS-911"
          />
          <InputField
            label="Kilometraje Registrado"
            type="number"
            value={formData.mileage}
            onChange={(v) => setFormData({ ...formData, mileage: v })}
          />
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">
              Situación Garage
            </label>
            <select
              className="bg-slate-800 border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-blue-500 text-white outline-none appearance-none cursor-pointer hover:bg-slate-700 transition-colors"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option>En Garage</option>
              <option>En Mantenimiento</option>
              <option>En Exposición</option>
              <option>En Uso</option>
              <option>Vendido</option>
            </select>
          </div>
          <InputField
            label="Denominación Color"
            value={formData.colorName}
            onChange={(v) => setFormData({ ...formData, colorName: v })}
            placeholder="Ej: Rosso Corsa"
          />
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">
              Pintura (Selector)
            </label>
            <input
              type="color"
              className="w-full h-12 bg-slate-800 border-white/5 rounded-2xl cursor-pointer p-1"
              value={formData.colorHex}
              onChange={(e) => setFormData({ ...formData, colorHex: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <InputField
              label="Enlace Imagen Digital (URL)"
              value={formData.photoUrl}
              onChange={(v) => setFormData({ ...formData, photoUrl: v })}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="pt-6 sm:pt-10 border-t border-white/5 flex flex-col gap-6">
          <CheckboxField
            label="Requiere atención mecánica urgente"
            checked={formData.needsService}
            onChange={(v) => setFormData({ ...formData, needsService: v })}
          />
          <CheckboxField
            label="Toda la documentación está legalizada y al día"
            checked={formData.papersOk}
            onChange={(v) => setFormData({ ...formData, papersOk: v })}
          />
        </div>

        <div className="pt-6 sm:pt-10">
          <button
            onClick={() => onSave(formData)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 sm:py-5 rounded-3xl sm:rounded-[2rem] font-black text-base sm:text-xl uppercase tracking-widest shadow-2xl shadow-blue-900/40 transition-all hover:scale-[1.02] active:scale-95"
          >
            CONFIRMAR EN GARAGE
          </button>
        </div>
      </Card>
    </div>
  );
}
