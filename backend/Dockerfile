FROM python:3.11-slim

# setting working directory
WORKDIR /app

# cpoty requirements.txt
COPY requirements.txt .

# install dependency
RUN pip install --no-cache-dir -r requirements.txt

# copy original code
COPY . .

# default FastAPI port 8000
EXPOSE 8000

# start FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]