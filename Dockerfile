# Stage 1: Build
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# COPY ca.pem /app/ca.pem
RUN npm run build

# # Stage 2: Serve
# FROM nginx:alpine
# COPY --from=build app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3000 
CMD ["npm", "run", "start"]