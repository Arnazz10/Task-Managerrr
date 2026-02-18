import os
from backend.app import create_app

# Vercel Read-Only Filesystem Fix
# If running on Vercel and no DATABASE_URL is set, use /tmp for SQLite
if os.environ.get('VERCEL') and not os.environ.get('DATABASE_URL'):
    os.environ['DATABASE_URL'] = 'sqlite:////tmp/tasks.db'

app = create_app()
