# Mini Pastebin Service

This project is a minimal Pastebin-like backend service built as part of a technical assignment.  
The goal of the project is to demonstrate correct backend design, persistence, deterministic behavior, and strict adherence to specifications.

Users can create text pastes, receive a shareable link, and access the paste until it expires by time, view count, or both.

---

## Project Overview

The system allows users to create text pastes and retrieve them using a unique identifier.  
Each paste can optionally expire based on time (`ttl_seconds`), view count (`max_views`), or whichever condition is met first.

Once a paste expires, it becomes permanently unavailable and the service always responds with a 404 status code.

The application is designed to work correctly in a serverless environment and under automated testing.

---

## Core Functionality

- Create a paste with text content
- Optionally expire pastes using time-based limits
- Optionally expire pastes using view-count limits
- Retrieve pastes via API (JSON)
- View pastes in the browser (HTML)
- Return consistent 404 responses for expired or unavailable pastes

---

## Routes

The backend exposes two types of routes: API routes and HTML routes.

### API Routes (JSON)

These routes are intended for programmatic access and automated tests.

POST /api/pastes  
Creates a new paste. Accepts paste content and optional `ttl_seconds` and `max_views`.  
Returns a paste ID and a shareable URL.

GET /api/pastes/:id  
Fetches a paste in JSON format if it exists and is valid.  
Returns 404 if the paste is expired or unavailable.

GET /api/healthz  
Health check endpoint used to verify that the service is running.

---

### HTML Route

GET /p/:id  
Returns an HTML page displaying the paste content.  
The content is safely escaped to prevent script execution.  
Returns a 404 page if the paste is expired or unavailable.

---

## Expiration Logic

A paste becomes unavailable when any of the following conditions are met:

- The current time is greater than or equal to the stored expiration time
- The remaining view count reaches zero

Once unavailable:

- The service always returns a 404 response
- No custom error messages are returned
- The paste is not deleted from the database

Expired pastes are treated as soft-expired.

---

## Deterministic Time Handling

The backend supports deterministic time to enable reliable automated testing.

If the environment variable TEST_MODE is set to 1 and the request includes the x-test-now-ms header, the backend uses the provided timestamp (milliseconds since epoch) as the current time for expiry checks.

If the header is not present, real system time is used.

This allows automated tests to simulate time passing without waiting in real time.

---

## Persistence Layer

The project uses PostgreSQL hosted on Supabase as its persistence layer.

- All pastes are stored in a PostgreSQL database
- No in-memory storage is used
- Data persists across requests, restarts, and deployments
- The backend connects using the pg npm package

---

## Database Schema

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE pastes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NULL,
  remaining_views INTEGER NULL,
  CONSTRAINT remaining_views_non_negative
    CHECK (remaining_views IS NULL OR remaining_views >= 0)
);

- expires_at set to NULL means no time-based expiration
- remaining_views set to NULL means unlimited views

---

## Design Decisions

- Paste content is stored as TEXT to avoid artificial length limits
- Expiry is stored as an absolute timestamp instead of a duration
- Expiry is checked at read time rather than using background jobs
- View count updates are atomic and database-protected
- Database constraints prevent invalid states
- API routes and HTML routes are strictly separated

---

## UI Scope

The UI is intentionally minimal.

- A simple interface is provided for creating pastes
- A plain HTML page is used for viewing pastes
- No styling, authentication, or user accounts are implemented

---

## Out of Scope

The following features are intentionally not implemented:

- Authentication or user management
- Editing or deleting pastes
- Syntax highlighting
- Styling or animations
- Rate limiting
- Background cleanup jobs or cron tasks

---

## Summary

This project demonstrates the ability to:

- Follow strict technical specifications
- Design a correct persistence layer
- Handle time-based logic deterministically
- Build clean and predictable backend APIs
- Separate concerns between API and UI routes
- Handle edge cases and concurrency safely
