FROM node:21.5.0
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
CMD ["yarn", "dev"]