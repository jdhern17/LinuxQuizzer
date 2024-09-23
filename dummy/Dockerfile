# Use the Node.js official alpine image for a smaller footprint
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json into the container first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files after dependencies are installed
COPY . .

# Expose the API port (3001 in this case)
EXPOSE 3001

# Start the Express API server
CMD ["node", "server.js"]