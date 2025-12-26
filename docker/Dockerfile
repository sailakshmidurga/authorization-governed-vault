FROM node:22-alpine

# Set working directory inside container
WORKDIR /app

# Copy dependency files first (better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy rest of the project
COPY . .

# Make entrypoint executable
RUN chmod +x ./docker/entrypoint.sh

# Run entrypoint script on container start
CMD ["sh", "./docker/entrypoint.sh"]
