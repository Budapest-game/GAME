FROM node:14

WORKDIR /app/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD npm run webpack && npm run start-heroku