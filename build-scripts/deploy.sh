#!/usr/bin/env sh

set -x
echo 'Generating Static Build Frontend'
cd ./frontend
npm install
npm run relocate
echo 'Frontend App Built Successfully'
cd ../backend/insta_backend
whoami
source ps-jenkins-env/bin/activate
eb deploy
set +x
echo 'Served successfully.'