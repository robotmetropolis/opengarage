import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import seed from './seed.json';

const FILE = 'cars.json';
const STORAGE_KEY = 'opencars.cars';

const isNative = () => Capacitor.isNativePlatform();

const genId = () =>
  (globalThis.crypto?.randomUUID?.()) ||
  `car_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;

const withIds = (cars) =>
  cars.map((c) => ({
    ...c,
    id: c.id || genId(),
    createdAt: c.createdAt || new Date().toISOString(),
  }));

async function readNative() {
  try {
    const { data } = await Filesystem.readFile({
      path: FILE,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
    return JSON.parse(data);
  } catch {
    return null;
  }
}

async function writeNative(cars) {
  await Filesystem.writeFile({
    path: FILE,
    directory: Directory.Data,
    encoding: Encoding.UTF8,
    data: JSON.stringify(cars, null, 2),
    recursive: true,
  });
}

function readWeb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeWeb(cars) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

async function readAll() {
  const cars = isNative() ? await readNative() : readWeb();
  return Array.isArray(cars) ? cars : null;
}

async function writeAll(cars) {
  if (isNative()) {
    await writeNative(cars);
  } else {
    writeWeb(cars);
  }
}

export async function listCars() {
  const existing = await readAll();
  if (existing) return existing;
  // Primera apertura: no hay archivo aún, arrancamos vacíos.
  await writeAll([]);
  return [];
}

export async function saveCar(carData) {
  const cars = (await readAll()) || [];
  if (carData.id) {
    const updated = cars.map((c) => (c.id === carData.id ? { ...c, ...carData } : c));
    await writeAll(updated);
    return updated.find((c) => c.id === carData.id);
  }
  const newCar = {
    ...carData,
    id: genId(),
    createdAt: new Date().toISOString(),
  };
  const next = [...cars, newCar];
  await writeAll(next);
  return newCar;
}

export async function deleteCar(id) {
  const cars = (await readAll()) || [];
  const next = cars.filter((c) => c.id !== id);
  await writeAll(next);
  return next;
}

export async function seedFleet() {
  const cars = (await readAll()) || [];
  const next = [...cars, ...withIds(seed)];
  await writeAll(next);
  return next;
}

export async function resetFleet() {
  await writeAll([]);
  return [];
}
