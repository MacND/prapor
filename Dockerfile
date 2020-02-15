FROM node:latest

RUN mkdir -p /var/git/prapor
WORKDIR /var/git/prapor

COPY package.json /var/git/prapor
RUN npm install
COPY . /var/git/prapor
CMD ["node", "index.js"]