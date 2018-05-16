FROM node:8

COPY ./foo /app

COPY ./helper /app/helper

WORKDIR /app

RUN npm install

CMD ["node", "index"]
