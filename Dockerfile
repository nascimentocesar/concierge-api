FROM node:23-alpine
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY ./src ./src
EXPOSE 3000
CMD ["pnpm", "start"]
