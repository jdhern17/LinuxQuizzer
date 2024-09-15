# Use the Node.js official alpine image for a smaller footprint
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Check if package.json exists, and if not, create one
RUN [ ! -f "package.json" ] && npm init -y || echo "package.json exists"

# Copy the rest of the application files
COPY . .

# Install dependencies only if package.json exists
RUN if [ -f "package.json" ]; then npm install; fi

# Expose the frontend port
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]