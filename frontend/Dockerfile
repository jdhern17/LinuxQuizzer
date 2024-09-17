# Use the Node.js official alpine image for a smaller footprint
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the empty package.json file into the container
COPY package.json .

# Install dependencies (none for now since package.json is empty)
RUN npm install || echo "No dependencies to install yet"

# Copy the rest of the application files
COPY . .

# Expose the frontend port
EXPOSE 3000

# Start the React app (this will run once your app is built)
CMD ["npm", "start"]