FROM node:22-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Configuração para ambiente de produção
ARG API_URL
ENV VITE_NOFAKE_PNG_API_URL=${API_URL}

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]
