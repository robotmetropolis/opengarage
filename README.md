# OpenCars

Gestor de colección de autos clásicos construido como app híbrida **Capacitor + React + Vite + Tailwind**. La persistencia se resuelve con un único archivo JSON: en el navegador usa `localStorage`, en Android se guarda en el directorio de datos de la app mediante `@capacitor/filesystem`.

## Requisitos

- Node.js 18+
- Para Android: JDK 17 y Android Studio (incluye el SDK y un emulador).

## Instalación

```bash
npm install
```

## Desarrollo web

```bash
npm run dev
```

Abre http://localhost:5173. Los datos se persisten en `localStorage` bajo la clave `opencars.cars`.

## Build de producción (web)

```bash
npm run build
npm run preview
```

## Android con Capacitor

Primer setup (una sola vez, después de `npm install`):

```bash
npm run build
npm run android:add      # crea la carpeta android/
```

Ciclo habitual:

```bash
npm run android:sync     # build + copia de assets al proyecto nativo
npm run android:open     # abre Android Studio
# o bien
npm run android:run      # compila, sincroniza y lanza en emulador/dispositivo
```

Los cambios en `src/` requieren volver a correr `npm run android:sync` para que lleguen al APK.

## Capa de datos

- El seed inicial (12 autos de colección) vive en [`src/data/seed.json`](src/data/seed.json).
- [`src/data/carsRepo.js`](src/data/carsRepo.js) expone `listCars`, `saveCar`, `deleteCar`, `seedFleet` y `resetFleet`.
- En Android escribe `cars.json` dentro de `Directory.Data`. En navegador guarda el mismo contenido en `localStorage`.
- Los IDs se generan con `crypto.randomUUID()`.

## Deploy a GitHub Pages

La app funciona como PWA estática (sin backend) gracias al fallback de `carsRepo.js` a `localStorage`, así que se publica directo en GitHub Pages.

Setup único (una vez por repo):

1. Crea el repo en GitHub y subí el proyecto:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/robotmetropolis/opengarage.git
   git push -u origin main
   ```
2. En GitHub → **Settings → Pages** → *Build and deployment* → *Source*: **GitHub Actions**.
3. Listo. Cada `git push` a `main` dispara [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) y publica `dist/` en `https://robotmetropolis.github.io/opengarage/`.

También podés correr el workflow manualmente desde la pestaña **Actions → Deploy to GitHub Pages → Run workflow**.

Notas:

- [`vite.config.js`](vite.config.js) usa `base: './'` (rutas relativas), por lo que funciona tanto en subpath (`/opencars/`) como en dominio raíz sin tocar nada.
- Los datos viven en el `localStorage` del navegador de cada visitante: no hay sincronización entre dispositivos.
- Las imágenes de Unsplash se cargan online. Para modo offline total, reemplazalas por archivos en `public/`.

## Estructura

```
src/
  App.jsx
  main.jsx
  index.css
  components/
    ui.jsx
    Car3DViewer.jsx
    CarCard.jsx
    CarForm.jsx
    DetailView.jsx
  data/
    carsRepo.js
    seed.json
.github/
  workflows/
    deploy.yml
```
