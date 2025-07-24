FROM node:22-alpine

WORKDIR /app

# Instala dependências de compilação
RUN apk add --no-cache python3 make g++

# Copia arquivos de dependência primeiro
COPY package*.json ./
COPY vite.config.js ./

# Instala dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# Configuração do Web Crypto
RUN echo "import { webcrypto } from 'node:crypto'; globalThis.crypto = webcrypto;" > crypto-setup.mjs

EXPOSE 5173

CMD ["sh", "-c", "node crypto-setup.mjs && npm run dev"]