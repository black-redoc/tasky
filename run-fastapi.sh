cd backend
export ENVIRONMENT=production
export DATABASE_URL="sqlite:///./treyo.db"
uvicorn app:app --workers 2 --access-log --use-colors --interface asgi3
