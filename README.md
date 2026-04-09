# Quick Tasks - Checklist App

A minimal, modern checklist application with drag-drop reordering, swipe gestures, and local storage persistence.

## Features

- ✅ Multiple checklists with easy management
- ✅ Drag & drop to reorder tasks
- ✅ Swipe left to delete, swipe right to complete
- ✅ Task priorities (high/medium/low) and due dates
- ✅ Completed section with greenish tint
- ✅ Deleted section with reddish tint (restore or permanently delete)
- ✅ Repeatable checklists (daily or custom count)
- ✅ Local storage - works offline
- ✅ Mobile-first responsive design

## Quick Start

### Run Locally

**Frontend:**
```bash
cd frontend
yarn install
yarn start
```

**Backend (optional):**
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload
```

## Deploy to Render

### Simple Deployment (Frontend Only - Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Configure:
     - **Name:** quick-tasks
     - **Root Directory:** `frontend`
     - **Build Command:** `yarn install && yarn build`
     - **Publish Directory:** `frontend/build`
   - Click "Create Static Site"

3. **Done!** Your app will be live at `https://your-app-name.onrender.com`

### Full Stack Deployment

For deploying both frontend and backend, see detailed instructions in [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)

## Technologies

- **Frontend:** React 19, Framer Motion, TailwindCSS, Shadcn UI
- **Backend:** FastAPI, MongoDB (optional)
- **Storage:** Browser localStorage

## License

MIT

---

Built with ❤️ using Emergent
