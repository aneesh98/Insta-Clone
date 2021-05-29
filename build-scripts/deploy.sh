#!/usr/bin/env sh

set -x
echo 'Generating Static Build Frontend'
cd ./frontend
npm install
npm run relocate
echo 'Frontend App Built Successfully'
cd ../
heroku create
git subtree push --prefix backend/insta_backend heroku master
set +x
echo 'Served successfully.'