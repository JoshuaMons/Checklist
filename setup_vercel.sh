#!/bin/bash

# Quick Tasks - Vercel Deployment Setup Script

echo "=========================================="
echo "Quick Tasks - Vercel Deployment Setup"
echo "=========================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI not found. Installing..."
    npm install -g vercel
    echo "✅ Vercel CLI installed!"
else
    echo "✅ Vercel CLI already installed"
fi

echo ""
echo "=========================================="
echo "Deployment Options:"
echo "=========================================="
echo ""
echo "🌐 Option 1: Deploy via Vercel Dashboard (Recommended)"
echo "   1. Push code to GitHub"
echo "   2. Go to https://vercel.com/dashboard"
echo "   3. Click 'Add New' → 'Project'"
echo "   4. Import your repository"
echo "   5. Configure:"
echo "      - Root Directory: frontend"
echo "      - Build Command: yarn build"
echo "      - Output Directory: build"
echo "   6. Click Deploy!"
echo ""
echo "⚡ Option 2: Deploy via CLI (Quick)"
echo "   Run: vercel"
echo "   Then: vercel --prod (for production)"
echo ""
echo "=========================================="
echo "Files Ready:"
echo "=========================================="
echo "✅ vercel.json - Configuration file created"
echo "✅ VERCEL_DEPLOYMENT.md - Full deployment guide"
echo ""
echo "🚀 Ready to deploy!"
echo ""
echo "Quick CLI deployment:"
echo "  1. vercel login"
echo "  2. vercel (creates preview)"
echo "  3. vercel --prod (deploys to production)"
echo ""
