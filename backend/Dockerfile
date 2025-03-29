# Use the Node.js official alpine image for a smaller footprint
FROM node:22.14.0-alpine

# Set a non-root user
RUN addgroup -S appgroup && adduser -S -G appgroup appuser

# Set the working directory inside the container
WORKDIR /app

# Change ownership of the working directory to the non-root user
RUN chown -R appuser:appgroup /app

# Copy only package.json and package-lock.json first (better layer caching)
COPY package.json package-lock.json ./

# Install dependencies as root, then clean up cache
RUN npm install && npm cache clean --force

# Copy the rest of the application files after dependencies are installed
COPY . .

# Ensure proper permissions for the non-root user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Expose the backend port
EXPOSE 4000

# Start the backend server
CMD ["npm", "run", "dev"]