# Proyecto de aprendizaje: Ecommerce en línea

Monorepo con frontend (React + TypeScript + Vite) y backend (Python + FastAPI + MySQL).

## Estructura

- `backend/`: API FastAPI con SQLAlchemy y datos seed.
- `frontend/`: App React con Tailwind, React Query, Zustand y React Hook Form.
- `docker-compose.yml`: desarrollo local con backend y MySQL.
- `render.yaml`: deploy en Render para frontend y backend.

## Versiones y releases

- El frontend usa `frontend/package.json` para la versión de la app.
- Actualiza automáticamente la versión con `npm version`:
  - `npm version patch`
  - `npm version minor`
  - `npm version major`
- `npm version` también crea un commit y un tag Git automáticamente.
- Si necesitas solo cambiar el número sin crear un tag:
  - `npm version patch --no-git-tag-version`
- El backend no actualiza su `version="0.1.0"` automáticamente; ese valor se gestiona manualmente o con un script adicional.

## Cómo usar

### Backend local

1. Asegúrate de que Docker Desktop esté ejecutándose en Windows antes de iniciar Docker Compose.
2. Crear la base de datos local, phpMyAdmin, backend y frontend con Docker Compose:
   ```sh
docker-compose up -d mysql phpmyadmin backend frontend
```
3. Abrir la aplicación en el navegador:
   - Frontend: http://localhost:5173
   - Registro: http://localhost:5173/register
   - Backend: http://localhost:8000
   - phpMyAdmin: http://localhost:8080
   - Usuario phpMyAdmin: `ecommerce_user`
   - Contraseña phpMyAdmin: `ecommerce_pass`
4. Si prefieres usar los servicios individualmente, también puedes ejecutar solo:
   ```sh
docker-compose up -d mysql phpmyadmin
```
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
