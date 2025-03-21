FROM node:20

WORKDIR /app

COPY frontend/app/package.json frontend/app/yarn.lock ./
RUN yarn install --frozen-lockfile

COPY frontend/app ./

CMD ["yarn", "dev"]
