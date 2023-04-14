# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Create a working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./
# COPY prisma ./prisma/

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port that the app listens on
EXPOSE 5000

RUN npx prisma generate
# Start the application with the "npm run dev" command
CMD ["npm", "run", "dev"]
