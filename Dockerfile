# base image
FROM node:12.2.0
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV PORT 4200
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9
COPY . /app

# start app
CMD ng serve --host 0.0.0.0
