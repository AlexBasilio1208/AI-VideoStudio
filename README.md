# AI Video Studio OS

A personal, static-first AI video production workspace.

## Requirements
- Node.js 20 or newer
- npm
- A GitHub account

## Run locally
1. Open this folder in VS Code.
2. Open Terminal > New Terminal.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the localhost URL printed in the terminal.

## Build check
Run `npm run build`. The production site is created in `dist/`.

## Publish with GitHub Pages
1. Create a GitHub repository named `ai-video-studio-os`.
2. Upload/push the project files to the repository's main branch.
3. Open repository Settings > Pages.
4. Under Build and deployment, choose **GitHub Actions**.
5. Add the workflow file from `.github/workflows/deploy.yml` (already included).
6. Push to `main`. Open the Pages URL shown in Settings > Pages after deployment finishes.

## Data and privacy
This starter saves projects, prompts and theme in the current browser using localStorage. It does not sync between browsers/devices and does not provide authentication. GitHub Pages sites are public-facing; do not put secrets or sensitive personal information here. Export/backup and private data architecture are planned for later phases.

## Customize
- `src/data.js`: starter projects, prompts and workflow steps.
- `src/App.jsx`: page structure and interactions.
- `src/styles.css`: visual design and responsive behavior.
