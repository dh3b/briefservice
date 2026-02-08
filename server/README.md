# ProServices Server

## Setup

1. Install PostgreSQL and create a database:
```sql
CREATE DATABASE proservices;
```

2. Run the schema:
```bash
psql -d proservices -f ../schema.sql
```

3. Install dependencies:
```bash
cd server
npm install
```

4. Configure environment (optional — defaults to localhost):
```bash
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=proservices
export DB_USER=postgres
export DB_PASSWORD=postgres
export JWT_SECRET=your-secret-key
```

5. Run:
```bash
npm run dev
```

Server runs on `http://localhost:3001`. Frontend expects this via `VITE_API_URL`.

## Default Admin Credentials
- Username: `admin`
- Password: `admin123`

**Change these in production!**

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/services?category=X&lang=pl | - | List services |
| GET | /api/services/:id | - | Get service |
| POST | /api/services | Admin | Create service |
| PUT | /api/services/:id | Admin | Update service |
| DELETE | /api/services/:id | Admin | Delete service |
| POST | /api/auth/login | - | Admin login |
| POST | /api/auth/logout | - | Clear session |
| GET | /api/auth/me | Admin | Verify session |
| POST | /api/chats | - | Create chat |
| GET | /api/chats | Admin | List all chats |
| GET | /api/chats/:id/messages | - | Get messages |
| POST | /api/chats/:id/messages | - | Send message |
| DELETE | /api/chats/:id | Admin | Delete chat |
| PUT | /api/chats/:id/assign | Admin | Claim chat |
