# Name the node stage "builder"
FROM node:alpine AS builder

# Set working directory
WORKDIR /app
RUN yarn global add serve
# Copy our node module specification
COPY package.json .
COPY yarn.lock .

# install node modules and build assets
RUN yarn install --production

# Copy all files from current directory to working dir in image
# Except the one defined in '.dockerignore'
COPY . .

# Create production build of React App
RUN yarn build

