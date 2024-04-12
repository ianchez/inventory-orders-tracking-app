# Inventory and order management system using React.js

## Installation
1. Clone the repository
2. Check you have installed Node.js in your machine, **nvm** is recommended to manage the Node.js versions
  2.1 Check the [official documentation](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) for more information
  2.2 Once installed, run `nvm install` to install the Node.js version specified in the `.nvmrc` file
3. Create a new `db.json` file in the **./server** folder with the following structure:
    ```json
    {
      "products": [],
      "orders": []
    }
    ```

### Local Development
4. On the terminal, open 2 tabs, one for the client and one for the server
5. On the client tab, go to the **./client** folder and run `npm install` to install the dependencies
6. On the server tab, go to the **./server** folder and run `npm install` to install the dependencies
7. On the client tab, run `npm start` to start the client
8. On the server tab, run `npm start` to start the server
9. Open a browser and go to `http://localhost:3000` to view the app

### Production Build
You need to have installed docker in your machine, check the [official documentation](https://docs.docker.com/get-docker/) for more information

4. On the terminal, go to the root folder and run `docker-compose build` to build the images
    You need to have installed docker in your machine, check the [official documentation](https://docs.docker.com/get-docker/) for more information
5. Run `docker-compose up` to start the containers
6. Open a browser and go to `http://localhost:3000` to view the app