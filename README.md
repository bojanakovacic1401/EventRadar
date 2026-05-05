# BeoLife

BeoLife is a web application for discovering events in a selected city using the Ticketmaster Discovery API.

Guests can browse and filter events, while authenticated users can save events to their personal list. Future versions will include calendar export and Google Calendar integration.

---

## Features

- Search events by city
- Filter by category, keyword, and date range
- User registration and login
- JWT authentication
- Save and remove favorite events
- View personal saved events

---

## Tech Stack

- Node.js
- Express
- TypeScript
- MySQL
- Ticketmaster Discovery API
- JWT
- bcrypt
- dotenv

Frontend planned with React, TypeScript, and Vite.

---

## Project Structure

```txt
BeoLife/
├── db/
│   └── schema.sql
├── server/
│   ├── app.ts
│   ├── server.ts
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── config/
│       ├── Database/
│       ├── Domain/
│       ├── middleware/
│       ├── Services/
│       ├── types/
│       └── WebAPI/
└── README.md
```

---

## Setup

Install backend dependencies:

```bash
cd server
npm install
```

Create the database:

```bash
mysql -u root -p < ../db/schema.sql
```

Start the development server:

```bash
npm run dev
```

Server runs on:

```txt
http://localhost:3000
```

---

## API Endpoints

### Health

```txt
GET /api/health
```

### Events

```txt
GET /api/events/search
```

Example:

```txt
GET /api/events/search?city=London&countryCode=GB&category=music
```

Supported query parameters:

```txt
city, countryCode, keyword, category, startDate, endDate, page, size, sort
```

### Auth

```txt
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Saved Events

```txt
POST   /api/saved-events
GET    /api/saved-events/me
DELETE /api/saved-events/:eventExternalId
```

Saved event routes require:

```txt
Authorization: Bearer <token>
```

---

## Architecture

Ticketmaster is the main source of event data.

The local database stores only:

- users
- saved events

Events are fetched from Ticketmaster on demand and normalized before being returned to the frontend.

---

## Roadmap

- React frontend
- Event cards and filters
- Saved events page
- Event details page
- `.ics` calendar export
- Google Calendar integration
- Input validation
- Tests
- Deployment setup

---

## Status

Backend MVP in progress.