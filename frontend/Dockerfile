# Stage 1
FROM node:16 as build-stage

WORKDIR /app
# COPY package.json .
COPY . .

RUN npm install --legacy-peer-deps

RUN npm run build

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# Stage 2
FROM nginx:1.17.0-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]