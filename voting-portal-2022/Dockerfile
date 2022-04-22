FROM node:16-alpine AS builder

# Set working directory
WORKDIR /app
RUN npm install -g serve
# Copy our node module specification
COPY package* ./


# install node modules and build assets
RUN npm ci --production
# Copy all files from current directory to working dir in image
# Except the one defined in '.dockerignore'
COPY . .

# Create production build of React App
RUN npm run build
RUN mv ./build/static ./build/voting_portal
