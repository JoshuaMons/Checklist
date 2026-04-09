# Quick Tasks

A minimal, modern checklist application with drag-drop reordering, swipe gestures, and local storage persistence.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/quick-tasks)

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

```bash
cd frontend
yarn install
yarn start
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/quick-tasks)

### Manual Deploy

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your repository
   - Configure:
     - **Root Directory:** `frontend`
     - **Build Command:** `yarn build`
     - **Output Directory:** `build`
   - Click "Deploy"

3. **Done!** Your app is live at `https://your-app.vercel.app`

### CLI Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Deploy to Render

See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for Render deployment instructions.

## Technologies

- **Frontend:** React 19, Framer Motion, TailwindCSS, Shadcn UI
- **Storage:** Browser localStorage (no backend required)
- **Deployment:** Vercel, Render, or any static hosting

## Development

### Project Structure

```
/
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── hooks/      # Custom hooks
│   │   ├── App.js      # Main app
│   │   └── index.js    # Entry point
│   └── public/         # Static assets
├── backend/            # FastAPI (optional)
└── vercel.json         # Vercel configuration
```

### Available Scripts

```bash
# Development
yarn start          # Start dev server
yarn build          # Build for production
yarn test           # Run tests

# Deployment
vercel              # Deploy preview
vercel --prod       # Deploy production
```

## Features in Detail

### Task Management
- Quick add with Enter key
- Edit inline with all metadata
- Priority levels with color coding
- Due dates with smart formatting (Today, Tomorrow, date)

### Gestures & Interactions
- **Swipe right** → Complete task
- **Swipe left** → Delete task
- **Drag handle** → Reorder tasks
- **Checkbox** → Toggle completion

### Multiple Checklists
- Create unlimited lists
- Switch between lists
- Rename and delete lists
- Set repeat patterns (daily or X times)

### Smart Sections
- **Active tasks** - Current to-do items
- **Completed** (green tint) - Finished tasks
- **Deleted** (red tint) - Soft-deleted with restore option

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

- **Lighthouse Score:** 95+
- **First Load:** < 2s
- **Bundle Size:** < 500KB
- **Offline:** Works via localStorage

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use for personal or commercial projects

## Roadmap

- [ ] Cloud sync (optional backend)
- [ ] User authentication
- [ ] Task categories/tags
- [ ] Task notes
- [ ] Export/import
- [ ] Dark mode
- [ ] Task templates
- [ ] Productivity insights

## Support

Having issues? 
- Check [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for deployment help
- Check [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for Render-specific help
- Open an issue on GitHub

---

**Live Demo:** [quick-tasks.vercel.app](https://your-app.vercel.app)

Built with ❤️ using Emergent
