FROM node:14.15.4

EXPOSE 6001

WORKDIR /spa

COPY package*.json ./

RUN npm install

COPY spa-src spa-src

CMD ["npm", "run", "start"]