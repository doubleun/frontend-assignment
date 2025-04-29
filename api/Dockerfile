# 1) Generate types and build the app
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm i -g pnpm

COPY src/ ./src/
COPY pnpm-lock.yaml tsconfig.json package.json buf.gen.yaml buf.yaml ./

# install & build only the api package
RUN pnpm install --frozen-lockfile -F api...

# generate & build
RUN pnpm -F api... run generate
RUN pnpm -F api... run build

# 2) Runtime image
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

RUN npm i -g pnpm

COPY pnpm-lock.yaml tsconfig.json package.json buf.gen.yaml buf.yaml ./

COPY --from=builder /app/dist ./

# install again only non-dev dependencies, to reduce the final image size
RUN pnpm install --frozen-lockfile --prod --filter api...

RUN ls

# expose gRPC
EXPOSE 50052

RUN ls

# start server
CMD ["node", "server.js"]
