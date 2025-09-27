FROM node:22-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Configuração para ambiente de produção
ARG API_URL
ENV VITE_NOFAKE_PNG_API_URL=${API_URL}

RUN npm run build

FROM node:22-slim

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package-lock.json ./

RUN npm install --production

EXPOSE 3000

CMD ["npm", "run", "preview"]
