# Use the official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

COPY yarn.lock ./

# Install application dependencies
RUN yarn

# Copy application source code to the container
COPY . .

# Build TypeScript code (assuming your TypeScript code is in src/ and output is in dist/)
RUN yarn build

# Expose the port your application will run on
EXPOSE 3000

# Command to start the application
CMD ["node", "dist/server.js"]
