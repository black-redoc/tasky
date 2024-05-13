#!/usr/bin/env bash
doctl compute ssh treyo --ssh-user app --ssh-command \
'
cd frontend
pnpm i
pnpm build
cd ..
rm -rf venv
virtualenv venv
source venv/bin/activate
cd backend
pip install -re requirements.txt
cd ..
./start.sh
'
