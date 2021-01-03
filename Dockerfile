FROM node:14.4.0-alpine3.10

# Create app directory
RUN mkdir -p /usr/src/test-project
WORKDIR /usr/src/test-project

# Install app dependencies
# ADD package.json /usr/src/test-project
# ADD package-lock.json /usr/src/test-project
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json /usr/src/test-project/

RUN npm ci

COPY . /usr/src/test-project/

EXPOSE 3000

# Build arguments
ARG NODE_VERSION=14

# Environment
ENV NODE_VERSION $NODE_VERSION

CMD ["npm", "run", "start"]