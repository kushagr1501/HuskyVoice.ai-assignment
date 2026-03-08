# LeaveTracker (HuskyVoice.ai Assignment)

Simple leave management app with two roles:

- Employee: submit leave requests and track status
- Employer: review incoming requests and approve/reject

The repo contains a Vue 3 + Vite frontend and an Express + MongoDB backend secured with JWT.

## Tech

- Frontend: Vue 3, Vite, Vue Router, Tailwind, Axios
- Backend: Express, Mongoose, bcryptjs, jsonwebtoken
- Auth: JWT stored in `localStorage` (multi-tab stays in sync)

## Project Structure

- `frontend/`: Vue application
- `backend/`: Express API server

## Setup (Local)

Prereqs:

- Node.js (npm)
- MongoDB (local or hosted)

### Backend

1) Install deps

```bash
npm -C backend install
```

2) Create `backend/.env`

```env
JWT_SECRET=replace-with-a-long-random-string
MONGO_URI=mongodb://127.0.0.1:27017/leave-management
PORT=5000
```

3) Run the API

```bash
npm -C backend start
```

The API will be available at `http://127.0.0.1:5000/api`.

### Frontend

1) Install deps

```bash
npm -C frontend install
```

2) Start the dev server

```bash
npm -C frontend run dev
```

Open the printed Vite URL in your browser.

Note: the frontend API base URL is currently hardcoded in `frontend/src/axios.js`. If you want the frontend to use your local backend, change it to `http://127.0.0.1:5000/api`.

## Scripts

Frontend:

- `npm -C frontend run dev`
- `npm -C frontend run build`
- `npm -C frontend run preview`

Backend:

- `npm -C backend start`

## API Overview

- `POST /api/auth/signup` -> create user, returns `{ token, role, name, ... }`
- `POST /api/auth/login` -> login, returns `{ token, role, name, ... }`
- `GET /api/leaves` -> employee: own requests; employer: all requests
- `POST /api/leaves` -> employee only (create request)
- `PUT /api/leaves/:id` -> employer only (set `status` to `Approved` or `Rejected`)


## Note

- Auth is enforced server-side via `Authorization: Bearer <token>`.
- Route access is enforced client-side via route guards (role-based).
