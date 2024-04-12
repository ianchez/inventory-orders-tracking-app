FROM node:lts-iron

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source inside the docker image
COPY . .

# Start the json-server and export the 5000 port
EXPOSE 5000
CMD [ "npm", "start" ]