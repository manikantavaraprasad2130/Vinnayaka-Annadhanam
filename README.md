# Thorrur Annadanam — MERN

Colorful, clean community website for Vinayaka Chavithi Annadanam events in Thorrur and nearby villages.

## No login / no approval
Anyone can add an event and it appears immediately.

## Run
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

## Expiry
Each event stores `expiresAt`. MongoDB TTL automatically deletes the event after the Annadanam end time.
