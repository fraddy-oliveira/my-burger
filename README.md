# My Burger

Can create a Burger with different ingredients. There is a checkout functionality also.

Developed using React.js

## How to set up development environment

### Prerequisite

- GCP account
- Create API key from GCP Identity Platform
- Create Realtime Database in firebase
- In realtime database, add `ingredients` key with following value:
  ```json
  {
    "bacon": 0,
    "cheese": 0,
    "meat": 0,
    "salad": 0
  }
  ```

### Run the burger app using docker

#### Note

- Install Docker and Docker Compose

#### Steps

- Clone the repository using git clone `git clone https://github.com/fraddy-oliveira/my-burger.git my-burger`.
- Navigate to the project's root directory.
- Create env file `.env.development.local` with following content.

```sh
NODE_ENV=development
WEB_ANALYTICS_TOKEN="dummy_token_dev"
FIREBASE_BASE_URL=https://my-burger-app.firebaseio.com  # dummy URL. Get this value from Firebase
FIREBASE_API_KEY=a6oGYtjE4Wvidb42twkEYFtWdGe3afPLI5XOxkS  # dummy API key. Get this value from GCP Identity Platform
```

- Run the command `docker-compose up -d` to start the entire application.
- Access the frontend at `http://localhost:3000`.
- Access the backend API at `http://localhost:3000/api/health`.

### Run app from terminal

#### Note

- Install Node.js version greater than 18.20

#### Steps

- Clone the repository using git clone `git clone https://github.com/fraddy-oliveira/my-burger.git my-burger`.
- Create env file `.env.development.local` with following content.

```sh
NODE_ENV=development
WEB_ANALYTICS_TOKEN="dummy_token_dev"
FIREBASE_BASE_URL=https://my-burger-app.firebaseio.com  # dummy URL. Get this value from Firebase
FIREBASE_API_KEY=a6oGYtjE4Wvidb42twkEYFtWdGe3afPLI5XOxkS  # dummy API key. Get this value from GCP Identity Platform
```

- Run the command `npm install` to install.
- Run the command `npm run dev` to start the entire application.
- Access the frontend at `http://localhost:3000`.
- Access the backend API at `http://localhost:3000/api/health`.

## Authors

- **Fraddy Oliveira**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
