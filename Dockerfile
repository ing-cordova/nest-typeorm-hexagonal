# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# RUN npm run typeorm:generate -- ./src/migrations/migrations

RUN npm run typeorm:run

# RUN npm run seed

# Compila el proyecto
RUN npm run build

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 8090

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:dev"] 