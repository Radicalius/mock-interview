FROM node

WORKDIR /srv/app
COPY package.json ./
RUN npm install
COPY * ./

CMD node srv.js
