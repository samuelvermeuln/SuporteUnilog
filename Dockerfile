FROM node:12.8.1-slim

# create root application folder
WORKDIR /app

# copy source code to /app/src folder
COPY . /app

# check files list
RUN ls

RUN npm --version

RUN npm install

RUN npm run build

CMD [ "npm", "run", "start" ]
