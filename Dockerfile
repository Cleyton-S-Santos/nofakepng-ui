FROM node:22-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ARG API_URL
ENV VITE_NOFAKE_PNG_API_URL=${API_URL}
ARG RYBBIT_SITE_ID
ENV VITE_RYBBIT_SITE_ID={RYBBIT_SITE_ID}

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]
