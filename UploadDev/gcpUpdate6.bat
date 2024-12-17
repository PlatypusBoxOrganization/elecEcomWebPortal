@echo off

REM Build the Docker image
docker build --no-cache -t electronicfrontenddev .
docker tag electronicfrontenddev gcr.io/electronicswebsite/electronicfrontenddev:latest



pause
