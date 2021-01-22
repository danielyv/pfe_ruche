FROM node:alpine3.12

# create a directory in your docker image
WORKDIR /app

# install dependencies
COPY ./package*.json ./

# run npm install. you just need the runtime dependencies here
RUN npm ci --only-production

# Copy the rest of the code
COPY ./ ./

# Expose the port, on which your application is running
EXPOSE 4000

# Run the code
CMD [ "node", "./bin/www" ]