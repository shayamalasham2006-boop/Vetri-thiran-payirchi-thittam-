# AI FitTrack

AI-powered fitness tracking backend — Node.js, Express, MongoDB (Mongoose), MVC pattern.

## Epic: Project Architecture

**Roles:** User (logs workouts, progress), Admin (manages users).
**User Flow:** Register/Login → JWT issued → Get AI workout suggestion or create custom workout → Log progress → View progress history.

**ER Diagram (entities):**
```
User (1) ──< Workout (many)
User (1) ──< Progress (many)
```
- **User**: name, email, password, age, height_cm, weight_kg, fitnessGoal, role
- **Workout**: user (ref), title, type, exercises[], date, aiGenerated
- **Progress**: user (ref), weight_kg, bodyFatPercent, caloriesBurned, stepsCount, recordedAt

**MVC Pattern:**
- `models/` — Mongoose schemas (User, Workout, Progress)
- `controllers/` — business logic
- `routes/` — Express route definitions
- `middleware/` — JWT auth guard
- `server.js` — app entry point

## Project Structure
```
ai-fittrack/
├── server.js
├── package.json
├── .env.example
├── config/db.js
├── models/{User,Workout,Progress}.js
├── controllers/{user,workout,progress}Controller.js
├── routes/{user,workout,progress}Routes.js
└── middleware/authMiddleware.js
```

## Setup (VS Code)

1. Open this folder in VS Code.
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your MongoDB URI and JWT secret:
   ```
   cp .env.example .env
   ```
4. Start MongoDB locally, or use MongoDB Atlas and paste its connection string into `MONGO_URI`.
5. Run the server:
   ```
   npm run dev
   ```
6. API runs at `http://localhost:5000`.

## API Endpoints

| Method | Route | Description |
|---|---|---|
| POST | /api/users/register | Register user |
| POST | /api/users/login | Login, get JWT |
| GET | /api/users/profile | Get profile (auth) |
| PUT | /api/users/profile | Update profile (auth) |
| GET | /api/workouts/ai-suggestion | AI-suggested workout plan (auth) |
| POST | /api/workouts | Create workout (auth) |
| GET | /api/workouts | List workouts (auth) |
| GET/PUT/DELETE | /api/workouts/:id | Manage one workout (auth) |
| POST | /api/progress | Log progress entry (auth) |
| GET | /api/progress | List progress (auth) |
| DELETE | /api/progress/:id | Delete progress entry (auth) |

## Push to GitHub

```bash
cd ai-fittrack
git init
git add .
git commit -m "Initial commit: AI FitTrack backend (MVC, Express, MongoDB)"
git branch -M main
git remote add origin https://github.com/<your-username>/ai-fittrack.git
git push -u origin main
```

Create the empty repo first at `https://github.com/new` (name it `ai-fittrack`, no README/gitignore so it stays empty), then run the commands above.
