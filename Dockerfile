FROM node:current-alpine3.16
WORKDIR /app
COPY public ./public
COPY .next/standalone .
COPY .next/static .next/static
EXPOSE 8080
CMD ["node", "server.js"]