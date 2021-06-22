FROM node:14.17.0

ARG env_file
ENV env_file=$env_file

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm i

RUN npm i -g webpack-cli webpack

COPY . .

EXPOSE 3000

CMD ["npm", "start"]