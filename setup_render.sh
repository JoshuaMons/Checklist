#!/bin/bash

# Quick Tasks - Render Deployment Setup Script

echo "=================================="
echo "Quick Tasks - Render Setup"
echo "=================================="
echo ""

echo "📦 Step 1: Installing serve for production"
cd frontend
if ! command -v yarn &> /dev/null; then
    npm install -g yarn
fi
yarn add serve
cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "=================================="
echo "Next Steps for Render Deployment:"
echo "=================================="
echo ""
echo "🔹 Option 1: Frontend Only (Recommended)"
echo "   1. Push this code to GitHub/GitLab"
echo "   2. Go to https://dashboard.render.com"
echo "   3. Create new 'Static Site'"
echo "   4. Configure:"
echo "      Root Directory: frontend"
echo "      Build Command: yarn install && yarn build"
echo "      Publish Directory: frontend/build"
echo ""
echo "🔹 Option 2: Full Stack (Frontend + Backend)"
echo "   1. Set up MongoDB Atlas (free tier)"
echo "   2. Push code to GitHub/GitLab"
echo "   3. Create 'Blueprint' on Render"
echo "   4. Use render.yaml for configuration"
echo "   5. Set environment variables:"
echo "      - MONGO_URL (from MongoDB Atlas)"
echo "      - REACT_APP_BACKEND_URL (your backend URL)"
echo ""
echo "📖 Full deployment guide: See RENDER_DEPLOYMENT.md"
echo ""
