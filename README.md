## Initial Setup

Before running the application, you need to configure your hosts file with the add-on's hostname. You'll also need to create an SSL key pair for this domain.

It's also recommended to install [Volta](https://volta.sh/) in order to use the correct versions of node.js and npm.

1. Add `127.0.0.1       {hostname from .env}` (replace everything including the {})  to `/etc/hosts`
2. `npm ci`
3. **Make sure you have `openssl` installed on your computer for this step**. Generate ssl certificates with `npm run generate:ssl`. The domain name (aka hostname) is retrieved from `CONFIG_SERVER_HOST` in `.env`. 

## Scripts

Build the production app:
`npm run build`

Build the hot-reloading app:
`npm run dev`

Run unit tests: `npm run unit`

Check types: `npm run typecheck`

## Built With

[Tailwindcss](https://tailwindcss.com/)
[Vue 3](https://vuejs.org/)
[Vite](https://vitejs.dev/)
[Vitest](https://vitest.dev/)
[TypeScript](https://www.typescriptlang.org/)

## Shadow DOM

To inject addon in it's own isolated container we can use [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). To enable it you must set in .env `PANEL_USE_SHADOW_DOM=true`.
