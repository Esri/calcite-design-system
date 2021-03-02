# Travis Webhook Instructions

## Make sure travis is installed with Homebrew

`brew install travis`

## Login to travis

Create a personal access token on github.

`travis login --pro -g <github token>`

## Encrypt the webhook url

`travis encrypt --pro <Webhook URL>`

## Copy secured variable

`secure: "<generated key>"`

## Update `.travis.yml` file

It should look like:

```yml
notifications:
  webhooks:
    secure: "<generated key>"
```
