FROM node:8-alpine as builder

COPY package.json package-lock.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN npm i && mkdir /frontend && cp -R ./node_modules ./frontend

WORKDIR /frontend

COPY . .

RUN $(npm bin)/ng build -prod -aot —buildOptimizer

FROM nginx:1.13.3-alpine

COPY nginx/default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /frontend/dist /usr/share/nginx/html