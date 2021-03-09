FROM node:alpine

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5005

CMD [ "npm", "start" ]
