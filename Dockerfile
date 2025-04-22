FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install
RUN npm install --save-dev @types/react @types/react-dom @types/node

# Copy project files
COPY . .

# Build the Next.js application with type checking disabled
ENV NODE_ENV=production
ENV NEXT_TYPECHECK=false
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 