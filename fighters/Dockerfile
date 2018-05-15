FROM node:8

COPY ./fighters /app

COPY ./helper /app/helper

WORKDIR /app

RUN ls -lh

RUN npm install

CMD node index
