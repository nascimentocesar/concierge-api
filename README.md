## About the solution

Application stack:

- Node.js
- Express
- Docker
- MongoDB
- RabbitMQ
- ChatGPT

## Setting up the environment

> [!Note]
>
> There is no need to install Node.js in order to run the application. All required dependencies are already configured in `compose.yaml` file.

1. Make sure you have `docker` installed in your machine.
2. Create a `.env` file inside the root directory. You can use the `.env.example` file as a template by simply duplicating and renaming it to `.env` and adjusting the environment variables values accordingly.
3. Run the command `docker compose up -d --build` to create the application containers.
4. Use http://localhost:3000 to access the API.

## Known issues

- Estimate prices might not be accurate, specially because of currency differences;
- Requests might crash because of poorly structured prompts or ChatGPT eventual hallucinations;
