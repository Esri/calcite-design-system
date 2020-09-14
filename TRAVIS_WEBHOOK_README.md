# Travis Webhook Instructions

## Make sure travis is installed with gem

`gem install travis`

## Login to travis

`travis login --pro`

It will prompt you for the following:

- GitHub/Travis Username.
- GitHub/Travis Password.
- GitHub/Travis two factor authentication key.

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
