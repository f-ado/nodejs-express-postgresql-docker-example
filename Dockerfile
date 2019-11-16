FROM node:10.16

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
ARG NODE_VERSION=10.16

# Environment
ENV NODE_VERSION $NODE_VERSION

CMD ["npm", "run", "start"]