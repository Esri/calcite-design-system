# Travis Webhook Instructions

## Make sure travis is installed with gem or Homebrew

`gem install travis` or `brew install travis`

## Login to travis

Create a [personal access token on GitHub](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

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
