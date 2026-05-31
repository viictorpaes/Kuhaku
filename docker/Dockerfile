FROM node:22-bookworm-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia os arquivos de configuração de workspaces e pacotes
COPY package.json package-lock.json tsconfig.base.json ./
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json

# Instala as dependências de todos os workspaces
RUN npm install

# Copia todo o código-fonte para o container
COPY . .

# Exponha as portas que serão utilizadas
EXPOSE 3001
EXPOSE 5173

CMD ["npm", "start"]