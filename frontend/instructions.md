# Instrucciones para el frontend

## Instalación

```sh
cd frontend
npm install
```

## Ejecutar en modo desarrollo

```sh
npm run dev
```

Abrir `http://localhost:5173` en el navegador.

## Ejecutar pruebas

```sh
npm run test
```

## Build para producción

```sh
npm run build
```

## Notas
- La aplicación usa `VITE_API_BASE_URL` para conectarse al backend.
- Cambia la URL en `vite.config.ts` o en el entorno si usas otro host.
