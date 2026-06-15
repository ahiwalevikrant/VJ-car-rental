# VJ Car Rental

Next.js static site configured for GitHub Pages with a custom domain.

## Deploy to GitHub Pages

1. Push this project to a GitHub repository.
2. In GitHub, open repository **Settings** > **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main`, or open **Actions** > **Deploy to GitHub Pages** > **Run workflow**.
5. After workflow finishes, site is live at:

```text
https://vjcarsrental.in/
```

This custom-domain deployment builds assets from the domain root. If you deploy
to a GitHub project URL such as `https://<user>.github.io/<repo>/`, set
`NEXT_PUBLIC_BASE_PATH` to `/<repo>` in the GitHub Actions build environment.

## Local Checks

Run normal dev server:

```bash
npm run dev
```

Test same static export locally:

```powershell
$env:GITHUB_PAGES="true"
npm run build
```

Generated static files appear in `out/`.
