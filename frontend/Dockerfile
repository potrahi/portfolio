FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG VITE_REACT_APP_BACKEND_URL
ENV VITE_REACT_APP_BACKEND_URL=$VITE_REACT_APP_BACKEND_URL

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/custom-nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]