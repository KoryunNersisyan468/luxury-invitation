# Luxury Wedding Invitations

A premium React + Vite wedding invitation platform with a public invitation website and admin invite creation page.

## Features

- Public invitation page at `/invitation/:id`
- Create invitation admin page at `/create`
- Axios API layer with environment-based backend URL
- Dynamic invitation form with locations, timeline, dress code, and RSVP settings
- Smooth Lenis scrolling with cinematic animations
- Tailwind CSS luxury design and responsive mobile-first layout
- SEO-friendly drop-in meta tags

## Tech Stack

- React 18
- Vite
- TailwindCSS
- Framer Motion
- React Router DOM
- Axios
- Lenis
- React Hook Form
- Zod
- Lucide React
- clsx
- tailwind-merge

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment example:

```bash
cp .env
```

3. Start the dev server:

```bash
npm dev
```

4. Visit:

- `/` — marketing home page
- `/create` — admin invitation builder
- `/invitation/demo` — sample invitation page

## Environment

Use the following environment variable:

```env
VITE_API_URL=http://localhost:5000/api
```

## Notes

The current frontend uses a mock invitation fallback when the backend is not available, so the experience remains usable during development.
