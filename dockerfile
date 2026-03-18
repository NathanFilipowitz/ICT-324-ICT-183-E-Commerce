FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
EXPOSE 3000
CMD ["bun", "run dev"]