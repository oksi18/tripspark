 # TripSpark — Personalized Tourist Route Planner

TripSpark is a web application for creating personalized tourist routes.

The user selects:
- city
- number of days
- budget
- interests
- travel intensity

The system recommends tourist places and creates a day-by-day route.

## Features

- Personalized place recommendations
- Multi-day route generation
- Budget and travel intensity matching
- Geographic clustering of places
- AI-generated trip description
- Lviv and Krakow destinations

## Tech Stack

- React
- TypeScript
- Vite
- Node.js
- Express
- PostgreSQL
- OpenRouter API

## How it works

The recommendation system calculates a score for every place using:

- interest match
- budget fit
- popularity
- travel intensity

The places with the highest scores are selected for the route.

The route is then divided into days using geographic coordinates so that nearby places can be grouped together.

AI is used only to generate a short description of the final route. It does not choose the places or calculate their scores.

## Project Structure

```text
tripspark/
├── client/    React frontend
└── server/    Node.js/Express backend
Setup
1. Database
Create the PostgreSQL database:
createdb tripspark
psql tripspark -f server/src/db/schema.sql
psql tripspark -f server/src/db/seed.sql
2. Backend
cd server
npm install
cp .env.example .env
npm run dev
Add your OpenRouter API key to .env:
PORT=4000
OPENROUTER_API_KEY=your-key-here
3. Frontend
In another terminal:
cd client
npm install
npm run dev
Open:
http://localhost:5173
Recommendation Algorithm
The recommendation score is calculated using:
score =
0.5 × interestMatch +
0.25 × budgetFit +
0.15 × popularityNorm +
0.10 × intensityFit
When no interests are selected, interestMatch receives a neutral value of 0.5.
AI
The OpenRouter API is used only for generating a short natural-language description of the already generated route.
If the AI API is unavailable, the application uses a fallback description and continues working.
Limitations
Small dataset of 25 places
Only Lviv and Krakow
No user accounts
No saved trips
No real walking or driving routes
Recommendation weights are fixed
Author
Oksana Klymchuk
Lviv Polytechnic National University
2026 — 2-week internship


