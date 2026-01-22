FROM node:25-alpine

WORKDIR /repo
ENV HUSKY=0
ENV CI=true

RUN npm install -g pnpm

COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm --filter api build

WORKDIR /repo/apps/api
EXPOSE 8000

CMD ["node", "dist/main"]
