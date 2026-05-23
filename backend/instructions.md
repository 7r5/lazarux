# Instrucciones para el backend

## Requisitos
- Docker y Docker Compose
- Python 3.12

## Levantar MySQL local

```sh
docker-compose up -d mysql
```

## Crear base de datos y datos iniciales

```sh
mysql -u root -prootpass -h 127.0.0.1 -P 3306 ecommerce < backend/seed.sql
```

## Ejecutar API

```sh
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Ejecutar pruebas

```sh
cd backend
pytest
```

## Nota
- La variable `DATABASE_URL` puede apuntar a un MySQL local o externo.
- Para Render, la conexión usa `DATABASE_URL` con SSL.
- En Aiven, la URL completa para el servicio es:
  `mysql+pymysql://avnadmin:<PASSWORD>@lazarus-mysql-lazarus-mysql.e.aivencloud.com:19674/defaultdb?ssl-mode=REQUIRED`
