# VJ Car Rental

Next.js static site configured for GitHub Pages.

## Deploy to GitHub Pages

1. Push this project to a GitHub repository.
2. In GitHub, open repository **Settings** > **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main`, or open **Actions** > **Deploy to GitHub Pages** > **Run workflow**.
5. After workflow finishes, site is live at:

```text
https://<your-github-username>.github.io/<repository-name>/
```

## Local Checks

Run normal dev server:

```bash
npm run dev
```

Test same static export locally:

```powershell
$env:GITHUB_PAGES="true"
$env:NEXT_PUBLIC_BASE_PATH="/VJ-car-rental"
npm run build
```

Generated static files appear in `out/`.
