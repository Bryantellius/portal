FROM node:14.17.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./client/package.json ./

RUN npm install --silent

COPY ./client ./

CMD ["npm", "start"]