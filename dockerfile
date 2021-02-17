FROM node:10-alpine as builder
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
RUN node_modules/.bin/ng build --prod
# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=builder /app/dist/pfe_ruche /usr/share/nginx/html
EXPOSE 80