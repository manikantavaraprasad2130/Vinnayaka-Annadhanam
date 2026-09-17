# Thorrur Annadanam — MERN

Colorful, clean community website for Vinayaka Chavithi Annadanam events in Thorrur and nearby villages.

## No login / no approval
Anyone can add an event and it appears immediately.

## Run locally
### Backend
cd server
npm install
copy .env.example .env
# Put your MongoDB Atlas URI in .env
npm run dev

### Frontend
Open another terminal:
cd client
npm install
npm run dev

Frontend: http://localhost:5173
Backend: http://localhost:5000

## Deploy to Vercel
This project is structured as a frontend + backend pair, so deploy them as two separate Vercel projects:

### 1) Frontend project
- Import the client folder into Vercel
- Set environment variable:
  - VITE_API_URL = https://your-backend-project.vercel.app/api
- Build command: npm run build
- Output directory: dist

### 2) Backend project
- Import the server folder into Vercel as a Node/Express service
- Set environment variables:
  - MONGODB_URI = your MongoDB Atlas connection string
  - FRONTEND_URL = https://your-frontend-project.vercel.app
  - PORT = 5000 (optional for local, Vercel sets this automatically)

### Important
- The frontend now falls back to same-origin /api when VITE_API_URL is not set.
- The backend accepts requests from localhost and Vercel domains, so it works in preview and production deployments.

## Expiry
Each event stores `expiresAt`. MongoDB TTL automatically deletes the event after the Annadanam end time.
