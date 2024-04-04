# Build stage
FROM node:12.22.10-alpine AS build

ENV PROJECT_DIR nest-api

ADD . /$PROJECT_DIR
WORKDIR /$PROJECT_DIR
RUN echo $PWD && ls -la
RUN npm i
RUN npm run build

# Final stage
FROM node:12.22.10-alpine
COPY --from=build /app /app
WORKDIR /app

ENTRYPOINT [ "./nest-api" ]