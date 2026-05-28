FROM python:3.12-slim

WORKDIR /app

# When Render builds using repo root as the Docker context, paths must be
# relative to the repo root. Copy the requirements and backend sources from
# the `backend/` folder explicitly.
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source into the image
COPY backend/ .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
