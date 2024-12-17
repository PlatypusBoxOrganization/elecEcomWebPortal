@echo off

REM Deploy the image to Google Cloud Run
gcloud run deploy electronicfrontenddev --image gcr.io/electronicswebsite/electronicfrontenddev --platform managed --region asia-east1 --allow-unauthenticated


pause
