FROM node:18.20.4
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]