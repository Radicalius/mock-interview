FROM node

WORKDIR /srv/app
COPY package.json ./
COPY srv.js ./
RUN npm install

CMD node srv.js
