# Use the Node.js official alpine image for a smaller footprint
FROM node:22.14.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json into the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the frontend port
EXPOSE 5173

# Start the React app
CMD ["npm", "run", "dev"]