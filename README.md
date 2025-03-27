## About the solution

Application stack:

- express
- docker
- postgres
- nginx

## Setting up the environment

1. Create a `.env` file inside the root directory. You can use the `.env.example` file as a template by simply duplicating and renaming it to `.env` and adjusting the environment variables values accordingly.
2. Run the command `docker compose up -d --build` to create the application containers.
3. Use http://localhost/ to access the API.
