# Imagem base com Node.js
FROM node:18

# Criar diretório da aplicação
WORKDIR /app

# Copiar arquivos
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta da API
EXPOSE 5000

# Iniciar a aplicação
CMD ["npm", "run", "dev"]
