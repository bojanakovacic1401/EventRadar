# EventRadar

EventRadar is a full-stack event discovery web application built for exploring real events by city, category, keyword and date. The application uses the Ticketmaster Discovery API as an external event data source and allows registered users to save events to their personal collection.

The project was developed as a portfolio application with focus on full-stack architecture, API integration, authentication, protected routes, database persistence and a clean user experience.

## Live Preview

[Open EventRadar](https://event-radar-sable.vercel.app/)

---

## Overview

EventRadar helps users discover events happening in a selected city. Visitors can search and browse events without an account, while authenticated users can create a personal list of saved events.

The application combines real-time external event data with a local MySQL database. Events are fetched from Ticketmaster on demand, while user accounts and saved events are stored locally.

This approach keeps the application lightweight while still providing personalized functionality.

---

## Main Features

- Search events by city and country
- Filter events by keyword, category and date range
- Browse real event data from the Ticketmaster Discovery API
- View event cards with title, image, date, venue, city, price and ticket link
- Register and log in as a user
- JWT-based authentication
- Protected saved-events page
- Save events to a personal list
- Remove events from saved events
- Persistent user data stored in MySQL
- Clean React interface with reusable components
- Backend structure separated into routes, controllers, services, repositories and domain models

---

## User Flow

1. A visitor opens the homepage and searches for events.
2. The application sends search filters to the backend.
3. The backend calls the Ticketmaster API and normalizes the response.
4. Events are displayed as modern event cards on the frontend.
5. A user can register or log in.
6. After authentication, the user can save events.
7. Saved events are stored in the MySQL database and displayed on a protected page.
8. The user can remove saved events from their personal list.

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Context API
- CSS

### Backend

- Node.js
- Express
- TypeScript
- MySQL
- JWT authentication
- bcryptjs
- dotenv
- CORS

### External API

- Ticketmaster Discovery API

### Database

- MySQL

---

## Architecture

EventRadar uses a client-server architecture.

The frontend is responsible for the user interface, routing, forms, event display and authentication state. It communicates with the backend through a centralized API client.

The backend exposes REST API endpoints for authentication, event search and saved events. It also handles communication with the Ticketmaster API, authentication middleware, validation logic and database operations.

The local database does not store all Ticketmaster events. Instead, it stores only the data that belongs to the application itself:

- registered users
- saved events selected by users

This keeps the database focused, avoids unnecessary duplication of external data and makes the application easier to maintain.

---

## Key Implementation Details

### Event Search

Events are fetched from the Ticketmaster Discovery API through the backend. Search filters include city, country code, keyword, category and date range.

The backend normalizes Ticketmaster data before sending it to the frontend, so the React application works with a clean and predictable event structure.

### Authentication

The application supports user registration, login and persistent authentication using JWT tokens.

After login, the token is stored on the client and used for protected requests, such as saving or removing events.

### Saved Events

Authenticated users can save events from the search results. Saved events are stored in the MySQL database together with important event information such as title, date, venue, location, image, price and ticket link.

Each user has their own saved-events list.

### Protected Routes

The saved-events page is protected on the frontend. If a user is not logged in, they are redirected to the login page.

Protected backend routes also require a valid authorization token.

---

## Application Pages

### Home Page

The homepage contains the main event search experience. Users can search by city, country, keyword, category and date range. Results are displayed as event cards with pagination.

### Login Page

The login page allows existing users to access their account and continue using personalized features.

### Register Page

The register page allows new users to create an account.

### Saved Events Page

The saved-events page displays all events saved by the authenticated user. Users can also remove events from this list.

---

## API Overview

### Authentication

```txt
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
