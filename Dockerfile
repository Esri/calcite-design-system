# syntax=docker/dockerfile:1

# Container for running StencilJS demos or e2e tests (Puppeteer and Jest)
# This is mostly a workaround for:
# https://github.com/ionic-team/stencil/issues/3853

# Resources:
# https://docs.docker.com/language/nodejs/build-images/
# https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-in-docker

FROM node:16-bullseye
WORKDIR /app

# Install Chrome for Puppeteer
RUN apt-get update \
  && apt-get install -y wget gnupg \
  && wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 libxshmfence1 libglu1 --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Copy source code, node_modules and dist should be included in .dockerignore
COPY . .

# Install project's npm dependencies
# legacy-peer-deps is only needed for stencil-eslint
RUN npm install --legacy-peer-deps \
  # same layer as npm install to keep re-chowned files from using up several hundred MBs more space
  && groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
  && mkdir -p /home/pptruser/Downloads \
  && chown -R pptruser:pptruser /home/pptruser \
  && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user
USER pptruser

# Add Puppeteer args to Stencil's config
# Pretty sus, potentially add a `stencil.docker.config.ts` file instead
RUN perl -pi -e '$_ .= qq(    browserArgs: ["--no-sandbox", "--disable-setuid-sandbox" ],\n) if /^\s+testing\:\s\{\n/' ./stencil.config.ts

# Build the components
CMD [ "npm", "run", "build" ]
