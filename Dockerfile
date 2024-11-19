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

# Compila el proyecto
RUN npm run build

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3010

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:dev"] 