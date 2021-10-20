FROM node:12-alpine as base

########## building webpack stage ##########
FROM base as webpack-builder

# set working directory
WORKDIR /usr/src/app

# copy and install node modules
COPY package*.json ./
RUN npm install

# copy src code
COPY . .

# runs webpack-builder
# The build's output will be use
# on next stage
RUN npm run build

########## production stage ##########
FROM base

# set working directory
WORKDIR /usr/src/app

# copy and install node modules
COPY --from=webpack-builder /usr/src/app/package*.json ./
RUN npm install --only=production

# copy distribution from webpack-builder
COPY --from=webpack-builder /usr/src/app/dist/* ./

# run production service
ENTRYPOINT [ "node", "index.js" ]