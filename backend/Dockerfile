FROM node:20-alpine

LABEL key=MyImage

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./package-lock.json /app/
RUN npm install

#COPY . .
#
#EXPOSE 5000
#
#CMD ["node", "server.js"]
