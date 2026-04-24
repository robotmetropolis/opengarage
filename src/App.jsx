import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Car,
  Wrench,
  FileText,
  Search,
  AlertCircle,
  CheckCircle2,
  Box,
  Database,
  Activity,
} from 'lucide-react';
import { StatItem } from './components/ui.jsx';
import CarCard from './components/CarCard.jsx';
import DetailView from './components/DetailView.jsx';
import CarForm from './components/CarForm.jsx';
import * as carsRepo from './data/carsRepo.js';

export default function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid');
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);

  const selectedCar = useMemo(
    () => (selectedId ? cars.find((c) => c.id === selectedId) : null),
    [selectedId, cars]
  );

  useEffect(() => {
    let mounted = true;
    carsRepo
      .listCars()
      .then((data) => {
        if (!mounted) return;
        setCars(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error cargando flota:', err);
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const notify = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveCar = async (carData) => {
    try {
      const saved = await carsRepo.saveCar(carData);
      setCars((prev) =>
        carData.id ? prev.map((c) => (c.id === saved.id ? saved : c)) : [...prev, saved]
      );
      notify(carData.id ? 'Actualizado con éxito' : 'Añadido a la flota');
      if (view === 'form') setView(selectedId ? 'detail' : 'grid');
      if (!carData.id) setSelectedId(saved.id);
    } catch (error) {
      notify(error.message || 'Error al guardar', 'danger');
    }
  };

  const handleDeleteCar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este vehículo de la colección?')) return;
    try {
      const next = await carsRepo.deleteCar(id);
      setCars(next);
      setSelectedId(null);
      setView('grid');
      notify('Vehículo eliminado');
    } catch (error) {
      notify(error.message || 'Error al eliminar', 'danger');
    }
  };

  const seedData = async () => {
    try {
      const next = await carsRepo.seedFleet();
      setCars(next);
      notify('Flota de demostración cargada con éxito');
    } catch (error) {
      notify(error.message || 'Error al cargar demo', 'danger');
    }
  };

  const filteredCars = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return cars;
    return cars.filter(
      (c) =>
        c.make?.toLowerCase().includes(q) ||
        c.model?.toLowerCase().includes(q) ||
        c.plate?.toLowerCase().includes(q)
    );
  }, [cars, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-10">
        <Car className="w-16 h-16 animate-bounce text-blue-500 mb-6" />
        <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">
          Cargando Garage de Colección
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      {notification && (
        <div
          className={`fixed top-4 sm:top-8 right-4 sm:right-8 left-4 sm:left-auto z-50 px-5 py-4 rounded-2xl shadow-2xl border flex items-center gap-4 animate-in fade-in slide-in-from-top-4 ${
            notification.type === 'danger'
              ? 'bg-rose-950 border-rose-500 text-rose-100'
              : 'bg-slate-900 border-blue-500 text-blue-100'
          }`}
        >
          {notification.type === 'danger' ? (
            <AlertCircle className="w-5 h-5 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          )}
          <span className="font-bold text-sm">{notification.msg}</span>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-between gap-3">
          <div
            className="flex items-center gap-3 sm:gap-5 cursor-pointer group min-w-0"
            onClick={() => setView('grid')}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/40 group-hover:scale-110 transition-transform shrink-0">
              <Car className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-black tracking-tighter text-white leading-none truncate">
                OPENGARAGE
              </h1>
              <p className="hidden sm:block text-[10px] text-slate-500 uppercase tracking-[0.4em] mt-1 font-black">
                Collector Management
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center bg-slate-900/50 border border-white/5 rounded-2xl px-5 py-3 w-[450px] focus-within:border-blue-500/50 transition-all">
            <Search className="w-4 h-4 text-slate-600" />
            <input
              type="text"
              placeholder="Buscar por marca, modelo o patente..."
              className="bg-transparent border-none focus:ring-0 text-sm w-full ml-3 text-slate-300 placeholder:text-slate-600 font-medium outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={seedData}
              aria-label="Cargar flota demo"
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-400 px-3 sm:px-5 py-3 rounded-2xl text-xs font-black transition-all border border-white/5"
            >
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">CARGAR DEMO</span>
            </button>
            <button
              onClick={() => {
                setSelectedId(null);
                setView('form');
              }}
              aria-label="Agregar vehículo"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 sm:px-6 py-3 rounded-2xl text-sm font-black transition-all shadow-2xl shadow-blue-900/40"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">NUEVO</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {view === 'grid' && (
          <div className="space-y-8 sm:space-y-12">
            <div className="lg:hidden flex items-center bg-slate-900/50 border border-white/5 rounded-2xl px-5 py-3 focus-within:border-blue-500/50 transition-all">
              <Search className="w-4 h-4 text-slate-600" />
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-transparent border-none focus:ring-0 text-sm w-full ml-3 text-slate-300 placeholder:text-slate-600 font-medium outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <StatItem
                label="Mi Colección"
                value={cars.length}
                sub="Vehículos"
                icon={<Box className="text-blue-500" />}
              />
              <StatItem
                label="Urgencias"
                value={cars.filter((c) => c.needsService).length}
                sub="Mecánica"
                icon={<Wrench className="text-amber-500" />}
              />
              <StatItem
                label="Irregular"
                value={cars.filter((c) => !c.papersOk).length}
                sub="Documentación"
                icon={<FileText className="text-rose-500" />}
              />
              <StatItem
                label="Rodaje Total"
                value={cars
                  .reduce((acc, c) => acc + (Number(c.mileage) || 0), 0)
                  .toLocaleString()}
                sub="Kilómetros"
                icon={<Activity className="text-emerald-500" />}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onClick={() => {
                    setSelectedId(car.id);
                    setView('detail');
                  }}
                />
              ))}
              {filteredCars.length === 0 && (
                <div className="col-span-full py-20 sm:py-40 text-center border-2 border-dashed border-white/5 rounded-3xl sm:rounded-[3rem] bg-slate-900/20 px-6">
                  <Car className="w-16 h-16 sm:w-24 sm:h-24 text-slate-800 mx-auto mb-6 sm:mb-8" />
                  <h3 className="text-xl sm:text-2xl font-black text-slate-600 uppercase tracking-widest">
                    Garage Vacío
                  </h3>
                  <p className="text-slate-500 mt-3 font-medium text-sm sm:text-base">
                    Carga tus autos manualmente o pulsa el botón de demo.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'detail' && selectedCar && (
          <DetailView
            car={selectedCar}
            onBack={() => setView('grid')}
            onEdit={() => setView('form')}
            onUpdate={handleSaveCar}
            onDelete={handleDeleteCar}
          />
        )}

        {view === 'form' && (
          <CarForm
            car={selectedCar}
            onCancel={() => setView(selectedId ? 'detail' : 'grid')}
            onSave={handleSaveCar}
          />
        )}
      </main>
    </div>
  );
}
