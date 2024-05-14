#!/usr/bin/env bash

cd frontend
pnpm i
pnpm build
cd ..
cd backend
rm -rf venv
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..
pnpm i
