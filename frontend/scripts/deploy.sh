#!/usr/bin/env sh

set -x
echo 'Generating Static Build'
npm run build
echo 'App Built Successfully'
npm start &
set +x
echo 'Served successfully. Access app from http://localhost:3000'