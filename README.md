# Proyecto de aprendizaje: Ecommerce en línea

Monorepo con frontend (React + TypeScript + Vite) y backend (Python + FastAPI + MySQL).

## Estructura

- `backend/`: API FastAPI con SQLAlchemy y datos seed.
- `frontend/`: App React con Tailwind, React Query, Zustand y React Hook Form.
- `docker-compose.yml`: desarrollo local con backend y MySQL.
- `render.yaml`: deploy en Render para frontend y backend.

## Cómo usar

### Backend local

1. Crear la base de datos local con Docker Compose:
   ```sh
docker-compose up -d mysql
```
2. Ejecutar la API desde la carpeta `backend`:
   ```sh
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend local

1. Instalar dependencias:
   ```sh
cd frontend
npm install
```
2. Iniciar el servidor de desarrollo:
   ```sh
npm run dev
```
3. Abrir `http://localhost:5173`.

### Pruebas

- Backend:
  ```sh
cd backend
pytest
```
- Frontend:
  ```sh
cd frontend
npm run test
```

## Deploy

- `backend` y `frontend` se pueden desplegar en Render usando `render.yaml`.
- La app frontend usa `VITE_API_BASE_URL` para conectarse al backend.
- El backend debe usar `DATABASE_URL` con la cadena de conexión externa de Aiven, incluyendo `mysql+pymysql://` y `ssl-mode=REQUIRED`.
