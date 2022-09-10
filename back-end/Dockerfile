FROM node:alpine
COPY . .
RUN  yarn install
WORKDIR /app
RUN yarn install --production
CMD yarn start
EXPOSE 3000