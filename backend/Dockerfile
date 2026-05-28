FROM python:3.12-slim

WORKDIR /app

# Evita que Python escriba archivos .pyc en el contenedor y asegura que los logs salgan de inmediato
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 1. Copiar primero únicamente el archivo de dependencias
COPY backend/requirements.txt ./

# 2. Instalar dependencias (Esta capa se queda en caché a menos que modifiques el requirements.txt)
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# 3. Copiar todo el código fuente del backend hacia la raíz de trabajo (/app)
COPY backend/ .

# 4. Exponer e iniciar en el puerto 10000 (el estándar obligatorio para el Plan Free de Render)
EXPOSE 10000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "10000"]