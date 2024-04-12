FROM node:lts-iron

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source inside the docker image
COPY . .

# Build the app
RUN npm run build

# Install serve and serve the production build
RUN npm install -g serve
CMD ["serve", "-s", "./build/", "-l", "3000"]