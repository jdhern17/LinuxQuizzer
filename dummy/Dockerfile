# Use the official Debian image for a more complete set of Unix utilities
FROM ubuntu:22.04

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json into the container first
COPY package.json package-lock.json ./

# Install Node.js and npm
RUN apt-get update && apt-get install -y nodejs npm

# Install dependencies
RUN npm install

# Copy the rest of the application files after dependencies are installed
COPY . .

# Expose the API port (3001 in this case)
EXPOSE 3001

# Start the Express API server
CMD ["node", "server.js"]