# QuickChat – Real-Time Chat App

Minimal full-stack chat application with **JWT auth**, **Socket.IO**, **React + TypeScript**, **MongoDB**, and 



## ✨ Features (v 1.0)

| Feature | Status |
|---------|--------|
| Sign-up / Login (cookie JWT) | ✅ |
| Sidebar with online users | ✅ |
| Real-time messaging (Socket.IO) | ✅ |
| Left / right chat bubbles | ✅ |
| Online / offline indicators | ✅ |
| Typing indicator | ⏳ |
| Message timestamps | ⏳ |
| Infinite-scroll history | ⏳ |

## 🧰 Tech Stack

**Backend**  
Node.js • Express • TypeScript • MongoDB (Atlas) • Mongoose • Socket.IO • JWT cookie auth

**Frontend**  
React • TypeScript • Vite • DaisyUI (Tailwind) • Zustand • Axios • Socket.IO-client

**DevOps**  
Concurrent dev scripts • ESBuild • Nodemon • ts-node • dotenv

## 📁 Project Structure
quickchat/
├─ client/                 # React + Vite
│  ├─ src/
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ pages/
│  │  ├─ zustand/          # global state
│  │  └─ context/          # SocketProvider
│  └─ package.json
├─ server/                 # Express + TypeScript
│  ├─ src/
│  │  ├─ controllers/
│  │  ├─ middleware/
│  │  ├─ models/
│  │  ├─ routes/
│  │  ├─ socket/           # Socket.IO logic
│  │  └─ app.ts
│  └─ package.json
├─ .env.example            # copy to .env
└─ README.md


## ⚙️ 1-line Install & Run (Development)

```bash
# 1. Download & unzip the submitted folder.
Open terminal inside the unzipped folder (quickchat/).

# 2. Add ENV files
cp server/.env.example server/.env
cp client/.env.example client/.env   # optional

# 3. Install & start (concurrently)
npm run dev          # installs deps + runs client + server


#Environment Variables (copy into server/.env)
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pwd>@cluster0.xxxxx.mongodb.net/quickchat?retryWrites=true&w=majority
JWT_SECRET=super-long-random-string
NODE_ENV=development

Generate JWT_SECRET:
PowerShell:
[Convert]::ToBase64String((1..32 | % { [byte](Get-Random -Max 256) }))
macOS / Linux:
openssl rand -base64 32


#🐛 Common Errors
| Symptom               | Fix                                     |
| --------------------- | --------------------------------------- |
| `jwt malformed` / 401 | Delete bad cookie → re-log-in           |
| Atlas timeout         | Whitelist IP (see above)                |
| Cookie not set        | Use normal Chrome (incognito may block) |
