#!/usr/bin/env bash
doctl compute ssh treyo --ssh-user app --ssh-command \
'
rm -rf treyo
git clone https://github.com/black-redoc/treyo.git
cd ~/treyo/frontend
pnpm i
pnpm build
cd ~/treyo/backend
virtualenv venv
source venv/bin/activate
pip install -re requirements.txt
cd ~/treyo
./start.sh
'
