#!/bin/bash

cd "$(dirname "$0")" || return
npm --prefix ../.. install
npm start
