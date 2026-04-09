# Deploying Quick Tasks to Render

This guide will help you deploy the Quick Tasks checklist app to Render.

## Prerequisites

1. A [Render account](https://render.com) (free tier available)
2. A GitHub/GitLab account (to connect your repository)
3. MongoDB Atlas account (for database) - Optional since app uses localStorage

## Deployment Options

### Option 1: Frontend Only (Recommended for this app)

Since Quick Tasks primarily uses browser localStorage, you can deploy just the frontend:

1. **Create a new Static Site on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Static Site"
   - Connect your GitHub/GitLab repository

2. **Configure the Static Site:**
   ```
   Name: quick-tasks
   Root Directory: frontend
   Build Command: yarn install && yarn build
   Publish Directory: frontend/build
   ```

3. **Environment Variables:**
   - Not required for frontend-only deployment (uses localStorage)

4. **Deploy:**
   - Click "Create Static Site"
   - Render will build and deploy automatically

---

### Option 2: Full Stack Deployment (Frontend + Backend)

If you want to deploy both services:

#### Step 1: Set Up MongoDB

**Option A: Use MongoDB Atlas (Recommended)**
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

**Option B: Use Render Managed MongoDB** (if available on your plan)
- Render will create and manage the database for you

#### Step 2: Deploy Using Blueprint (render.yaml)

1. **Push code to Git repository** with the `render.yaml` file

2. **Create New Blueprint on Render:**
   - Go to Render Dashboard
   - Click "New +" → "Blueprint"
   - Connect your repository
   - Render will detect `render.yaml` automatically

3. **Configure Environment Variables:**

   **Backend Service:**
   - `MONGO_URL`: Your MongoDB connection string
     - Atlas: `mongodb+srv://username:password@cluster.mongodb.net/`
     - Local: `mongodb://localhost:27017` (not recommended for production)
   - `DB_NAME`: `quick_tasks_db`
   - `CORS_ORIGINS`: `*` (or your specific frontend URL)

   **Frontend Service:**
   - `REACT_APP_BACKEND_URL`: Your backend service URL
     - Format: `https://quick-tasks-backend.onrender.com`

4. **Deploy:**
   - Click "Apply" to create all services
   - Wait for builds to complete (5-10 minutes)

#### Step 3: Manual Service Creation (Alternative)

If you prefer manual setup:

**Backend:**
1. New Web Service
2. Settings:
   ```
   Name: quick-tasks-backend
   Runtime: Python 3
   Build Command: cd backend && pip install -r requirements.txt
   Start Command: cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT
   ```
3. Add environment variables (see above)

**Frontend:**
1. New Web Service
2. Settings:
   ```
   Name: quick-tasks-frontend
   Runtime: Node
   Build Command: cd frontend && yarn install && yarn build
   Start Command: cd frontend && npx serve -s build -l $PORT
   ```
3. Add environment variables:
   - `REACT_APP_BACKEND_URL`: `https://your-backend-name.onrender.com`

---

## Post-Deployment

### Update Frontend Environment Variable

After backend deploys:
1. Copy backend URL (e.g., `https://quick-tasks-backend.onrender.com`)
2. Update frontend service:
   - Go to frontend service → Environment
   - Set `REACT_APP_BACKEND_URL` to backend URL
   - Click "Save Changes"
   - Frontend will automatically redeploy

### Test Your Deployment

1. Visit your frontend URL: `https://your-app-name.onrender.com`
2. Try adding tasks
3. Test all features:
   - Create multiple checklists
   - Add tasks with priorities and due dates
   - Drag and drop to reorder
   - Swipe gestures
   - Complete and delete tasks

---

## Render Free Tier Limitations

- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free
- Consider upgrading for production use

---

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Verify all dependencies in `requirements.txt` and `package.json`

### Frontend Can't Connect to Backend
- Verify `REACT_APP_BACKEND_URL` is set correctly
- Check CORS settings in backend
- Ensure backend service is running

### Database Connection Issues
- Verify `MONGO_URL` is correct
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for Render)
- Ensure database user has proper permissions

### App Works Locally But Not on Render
- Check environment variables are set in Render
- Review service logs for errors
- Verify ports are using `$PORT` environment variable

---

## Custom Domain (Optional)

1. Go to your service → Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed
4. SSL certificate automatically provisioned

---

## Continuous Deployment

Render automatically deploys when you push to your connected branch:
1. Make changes locally
2. Commit and push to Git
3. Render detects changes and rebuilds

---

## Cost Optimization

- Use **Static Site** for frontend (free)
- Use **Web Service** on free tier for backend (with limitations)
- Use **MongoDB Atlas** free tier (512MB storage)
- Upgrade services individually as needed

---

## Support

- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com/)
- Check service logs for detailed error messages
