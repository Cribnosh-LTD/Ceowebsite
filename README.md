# Doyle Omachonu Website

This site is now prepared for low-cost Azure hosting using the same pattern as the Edo Youths Scotland project in `~/Documents`:

- `Azure Static Web Apps` on the `Free` SKU
- static export from Next.js into `out/`
- GitHub Actions deployment from `.github/workflows/deploy-azure.yml`
- cache and security headers from `staticwebapp.config.json`

## Why This Hosting Setup

The site does not need a paid Node server. Next.js now exports a fully static build, which makes Azure Static Web Apps the cheapest and simplest fit.

## Local Run

Install dependencies and start local development:

```bash
bun install
bun run dev
```

Build the static export:

```bash
bun run build
```

Preview the exported site from `out/`:

```bash
bun run serve:static
```

Then open `http://localhost:4173`.

## Azure Provisioning

Create a resource group and deploy the Static Web App infrastructure:

```bash
az group create --name rg-doyle-prod --location westeurope
az deployment group create \
  --resource-group rg-doyle-prod \
  --template-file infra/main.bicep \
  --parameters @infra/main.parameters.json
```

If you want Azure to link the app to a GitHub repository during provisioning, set `repositoryUrl` in `infra/main.parameters.json` before running the deployment.

## GitHub Deployment

Add this repository secret:

- `AZURE_STATIC_WEB_APPS_API_TOKEN`

The workflow in `.github/workflows/deploy-azure.yml` will:

1. install dependencies with Bun
2. build the static export into `out/`
3. copy `staticwebapp.config.json` into the export output
4. upload the generated files to Azure Static Web Apps

## Notes

- `next.config.ts` uses `output: "export"` so Azure only needs to serve static files.
- `next/image` is configured as unoptimized so image delivery works without a Next server.
- `staticwebapp.config.json` adds basic security headers and conservative cache rules to keep the free tier efficient.
