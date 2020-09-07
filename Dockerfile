#############################
#           Build           #
#############################
FROM node:12.8-alpine as build

ENV NODE_ENV=development
ENV PATH $PATH:/usr/src/app/node_modules/.bin

WORKDIR /usr/src/app

# Copy "package.json" and "yarn.lock" before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy all files
COPY ./ ./

# Build app
RUN yarn build && yarn --production


#############################
#          Release          #
#############################
FROM node:12.8-alpine

# Set working directory
WORKDIR /usr/app

# Install PM2 globally
RUN yarn global add pm2

# Include only the release build and production packages.
COPY --from=build /usr/src/app/public public
COPY --from=build /usr/src/app/package.json package.json
COPY --from=build /usr/src/app/node_modules node_modules
COPY --from=build /usr/src/app/.next .next

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image
USER node

# Launch app with PM2
CMD [ "pm2-runtime", "start", "npm", "--", "start" ]