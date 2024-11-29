@echo off

REM Build the Docker image
docker build --no-cache -t electronicfrontenddev .
docker tag electronicfrontenddev gcr.io/electronicswebsitedev/electronicfrontenddev:latest



pause
