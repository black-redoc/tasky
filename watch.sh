#!/bin/bash

cd backend
export ENVIRONMENT=development
uvicorn app:app --reload --use-colors
