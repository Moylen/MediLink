FROM node:20-alpine3.18

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

COPY ./uploads ./uploads

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

