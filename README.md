# My Burger

Can create a Burger with different ingredients. There is a checkout functionality also.

Developed using React.js

## Set up development environment

### Prerequisite

- Node.js version 10.15.3
- Docker
- GCP account
- Create API key from GCP Identity Platform
- Create Realtime Database in firebase

### Note

I recommend to run project using docker because of Node version is bit older.

- Create `.env.development.local` in root directory.
  - `NEXT_PUBLIC_FEATURE_WEB_ANALYTICS` is to enable/disable analytics `enabled/disabled`
- In realtime database, add `ingredients` key with following value:
  ```json
  {
    "bacon": 0,
    "cheese": 0,
    "meat": 0,
    "salad": 0
  }
  ```
- Run app from root directory with command `docker-compose up -d`.

## Authors

- **Fraddy Oliveira**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
