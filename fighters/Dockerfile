FROM node:8

COPY ./fighters /app

COPY ./helper /app/helper

WORKDIR /app

RUN npm install

CMD ["node", "index"]
