# Luxury Wedding Invitations Backend

Production-ready Node.js backend for a luxury wedding invitation platform built with Express, PostgreSQL, Prisma, JWT authentication, Cloudinary uploads, and Zod validation.

## Features

- User authentication with JWT
- Admin-protected invitation CRUD
- RSVP submission and admin query
- Secure file uploads with Cloudinary
- Request validation with Zod
- Pagination, search, slug support
- Rate limiting, helmet, CORS
- Prisma ORM with PostgreSQL and UUID models
- Docker-ready production architecture

## Quickstart

1. Copy `.env.example` to `.env`
2. Install dependencies
   ```bash
   cd server
   npm install
   ```
3. Set up PostgreSQL and Cloudinary credentials
4. Generate Prisma client
   ```bash
   npm run prisma:generate
   ```
5. Run migrations
   ```bash
   npm run prisma:migrate:dev
   ```
6. Seed example data
   ```bash
   npm run seed
   ```
7. Start the server
   ```bash
   npm run dev
   ```

## API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/invitations`
- `GET /api/invitations/:id`
- `POST /api/invitations`
- `PUT /api/invitations/:id`
- `DELETE /api/invitations/:id`
- `POST /api/rsvp`
- `GET /api/rsvp/:invitationId`
- `POST /api/upload`

## Deployment

Build and run with Docker:

```bash
cd server
docker build -t luxury-invites-backend .
docker run --env-file .env -p 5000:5000 luxury-invites-backend
```

## Environment Variables

See `.env.example` for required variables.
