FROM node:16 AS builder
WORKDIR /app
COPY ./package.json ./
RUN yarn
COPY . .
RUN npm cache clean --force
RUN npm run build
RUN ls -la

FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 8200
RUN ls -la
CMD ["npm", "run", "start:prod"]