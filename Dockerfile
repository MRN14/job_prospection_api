FROM node:20.9.0-alpine

# Install bash without cache
RUN apk add --no-cache bash

# Set the working directory
WORKDIR /var/www

# Expose port 3000
EXPOSE 3000

# Copy package.json
COPY package.json ./

# Copy the rest of the application code
COPY . .
