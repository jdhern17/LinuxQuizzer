# Use the official Ubuntu image for a more complete set of Unix utilities
FROM ubuntu:22.04

# Set a non-root user
RUN groupadd --system appgroup && useradd --system --gid appgroup appuser

# Set the working directory inside the container
WORKDIR /app

# Change ownership of the working directory to the non-root user
RUN chown -R appuser:appgroup /app

# Copy only package.json and package-lock.json first (better layer caching)
COPY package.json package-lock.json ./

# Install Node.js, npm, and necessary dependencies
RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*

# Install dependencies
RUN npm install && npm cache clean --force

# Copy the rest of the application files after dependencies are installed
COPY . .

# Ensure proper permissions for the non-root user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Expose the API port (3001 in this case)
EXPOSE 3001

# Start the Express API server
CMD ["node", "server.js"]