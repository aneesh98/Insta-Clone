#!/usr/bin/env sh

set -x
echo 'Generating Static Build Frontend'
cd ./frontend
npm install
npm run relocate
echo 'Frontend App Built Successfully'
cd ../backend/insta_backend
source ps-jenkins-env/bin/activate
eb deploy
eb ssh --command "./replace_static_file.sh"
set +x
echo 'Served successfully.'