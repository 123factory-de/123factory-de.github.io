# 123factory-de.github.io

The 123 Factory company website: https://123factory-de.github.io/

A single-page app built with React, React Router, and Vite, hosted on GitHub Pages.

## Getting started

Requires Node.js 20.

```bash
npm ci
npm run dev
```

The dev server runs at http://localhost:5175.

## Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Serve the production build at http://localhost:4173 |

## Project structure

| Path | Purpose |
| :--- | :--- |
| `src/App.jsx` | Route definitions |
| `src/views/` | Page-level components, one per route |
| `src/components/` | Shared UI components and page sections |
| `src/data/` | Feed articles and portfolio companies |
| `src/index.css` | Global styles and font declarations |
| `public/` | Static assets served from the site root |
| `docs/` | Git workflow and worklogs |

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and deploys `dist/` to GitHub Pages. In the repository settings, **Pages → Source** must be set to **GitHub Actions**.

GitHub Pages only serves static files, so the build copies `index.html` to `404.html`. This lets React Router handle direct visits to routes such as `/about`.

## Contributing

Work on a branch and open a Pull Request; do not commit directly to `main`. See [`docs/git-workflow/`](docs/git-workflow/) for the branching, commit, and PR conventions, and [`AGENTS.md`](AGENTS.md) for the rules that apply to AI coding agents.
