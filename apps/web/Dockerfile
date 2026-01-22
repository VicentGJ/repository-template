FROM node:25-alpine

WORKDIR /repo
ENV HUSKY=0
ENV CI=true

RUN npm install -g pnpm

COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm --filter web build

EXPOSE 3000

CMD ["pnpm", "--filter", "web", "start"]
