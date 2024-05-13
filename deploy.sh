#!/usr/bin/env bash

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
export NODE_PATH=/usr/lib/node_modules
./start.sh
