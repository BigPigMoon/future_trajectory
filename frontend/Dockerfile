# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:19
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
ENV PORT 80
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 80
# Start the app
CMD [ "npx", "serve", "-s", "build", "-p", "80"]