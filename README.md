# Gym Workout Companion

A modern, mobile-first workout companion website designed for personal use to track daily gym routines. It features a dark mode UI, persistent progress tracking via LocalStorage, and a quick way to view exercise references via Google Images.

## Features

- **Mobile-First Design:** Fully responsive, modern app-like UI.
- **Dark Mode:** Deep dark theme optimized for viewing in the gym.
- **Progress Tracking:** Checkboxes to mark exercises as completed. State is saved using LocalStorage and resets automatically on new days.
- **Streak Counter:** Tracks your consecutive workout days.
- **Exercise Lookup:** One-click "View Exercise" button that opens a Google Images search for quick form reference.
- **No Backend Required:** Runs entirely in the browser using HTML, CSS, and Vanilla JavaScript.

## How to Deploy to GitHub Pages

1. **Create a Repository:** Create a new empty repository on your GitHub account (e.g., `gym-page`).
2. **Push the Code:**
   - Initialize git in this folder: `git init`
   - Add files: `git add .`
   - Commit: `git commit -m "Initial commit"`
   - Link to your repo: `git remote add origin https://github.com/YOUR_USERNAME/gym-page.git`
   - Push: `git push -u origin main` (or `master`)
3. **Enable GitHub Pages:**
   - Go to your repository on GitHub.
   - Click on **Settings** > **Pages** (on the left sidebar).
   - Under "Build and deployment", select **Deploy from a branch**.
   - Choose the `main` (or `master`) branch and the `/ (root)` folder.
   - Click **Save**.
4. **Access your website:**
   - Wait a minute or two for the action to build.
   - Your site will be live at `https://YOUR_USERNAME.github.io/gym-page/`.

## Technologies Used
- HTML5
- CSS3 (Variables, Flexbox, Animations)
- Vanilla JavaScript (DOM manipulation, LocalStorage)
