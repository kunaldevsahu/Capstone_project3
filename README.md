## FitQuest

FitQuest is a full‑stack gym management web app with:

- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT auth.
- **Frontend**: React, React Router, Axios, Recharts.

### 1. Prerequisites

- Node.js and npm installed.
- A running MongoDB instance (local or cloud).

### 2. Backend Setup

1. Go to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in `backend` with at least:

```bash
MONGO_URI=mongodb://localhost:27017/fitquest
JWT_SECRET=your_jwt_secret_here
PORT=4000
```

4. Start the backend (Express API on `http://localhost:4000`):

```bash
npm run dev   # or: npm start
```

### 3. Frontend Setup

1. Open a new terminal and go to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React app (on `http://localhost:3000`):

```bash
npm start
```

The frontend is already configured to call the backend at `http://localhost:4000` via `src/services/api.js`.

### 4. Login & Roles

- Use the **Signup** page to create a user, then log in.
- The app uses `localStorage` to store:
  - `token` – JWT token
  - `role` – `"admin"` or `"member"`
  - `userId` – logged‑in user id
- Routes and dashboard content change automatically based on the `role`.


