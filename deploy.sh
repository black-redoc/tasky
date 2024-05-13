#!/usr/bin/env bash

cd frontend
pnpm i
pnpm build
cd ..
rm -rf venv
virtualenv venv
source venv/bin/activate
cd backend
pip install -r requirements.txt
cd ..
./start.sh
