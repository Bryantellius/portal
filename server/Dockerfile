FROM node:14.17.0

WORKDIR /app/server

COPY ["package.json", "package-lock.json", "./"]
RUN npm install
RUN npm install -g @babel/cli @babel/core @babel/node sequelize-cli nodemon
COPY . .
RUN npm run build
COPY dist .
EXPOSE 3001

CMD ["node", "dist/server.js"]