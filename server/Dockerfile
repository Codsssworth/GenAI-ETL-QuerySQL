FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

COPY . .

COPY ca.pem /app/ca.pem
EXPOSE 5000
ENV JWT_SECRET=your_secret_key_here
CMD ["node", "server.js"]




