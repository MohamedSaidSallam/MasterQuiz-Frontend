### STAGE 1: Build ###
FROM node:14.16.1-alpine3.13 as build

WORKDIR /app

ENV NODE_ENV = 'production'


COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --prod

### STAGE 2: Run ###
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/MasterQuiz /usr/share/nginx/html/MasterQuiz
EXPOSE 80