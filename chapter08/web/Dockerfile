FROM node:16.8.0
COPY package-lock.json .
COPY package.json .
RUN npm install
COPY . .
CMD npm start