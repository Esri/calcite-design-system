# syntax=docker/dockerfile:1

# Container for running StencilJS demos or e2e tests (Puppeteer and Jest)
# This is mostly a workaround for:
# https://github.com/ionic-team/stencil/issues/3853

# Resources:
# https://docs.docker.com/language/nodejs/build-images/
# https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-in-docker

FROM node:16-bullseye-slim
WORKDIR /app
# Copy source code, node_modules and dist should be in .dockerignore
COPY . .

RUN apt-get update \
  && apt-get install -y \
    git \
    gnupg \
    wget \
  # Install Chrome and related Puppeteer system dependencies
  && wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y --no-install-recommends \
    google-chrome-stable \
    libxshmfence1 \
  && rm -rf /var/lib/apt/lists/* \
  # Install project's npm dependencies,
  # the legacy-peer-deps flag is only needed for stencil-eslint
  && npm install --legacy-peer-deps \
  # Add Puppeteer args to Stencil's config
  # Pretty sus, potentially add a `stencil.docker.config.ts` file instead
  && perl -pi -e '$_ .= qq(    browserArgs: ["--no-sandbox", "--disable-setuid-sandbox" ],\n) if /^\s+testing\:\s\{\n/' ./stencil.config.ts

# build/test/start/serve the components here:
# CMD [ "npm", "run", "build" ]

# Or call the npm script afterwards, e.g.
# $ docker build --tag components .
# $ docker run -i --init --rm --cap-add=SYS_ADMIN -p 3333:3333 --name components-demos components npm start
