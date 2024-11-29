# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app



# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with an HTTP server
FROM nginx:1.21-alpine

# Copy the build output to replace the default Nginx contents
COPY --from=build /app/dist /usr/share/nginx/html

# Dockerfile snippet
COPY ./nginx.conf /etc/nginx/nginx.conf
