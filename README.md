![scayle-logo-cr](https://cdn-prod.scayle.com/public/media/general/SCAYLE-Commerce-Engine-header.png)

<h1 align="center">
  SCAYLE Panel Demo Add-On
</h1>

<h4 align="center">
  <a href="https://scayle.dev">Documentation</a> |
  <a href="https://www.scayle.com/">Website</a>
</h4>

<p align="center">
  The SCAYLE <strong>Panel Demo Add-On</strong> is showcasing how to write an Add-On in combination with the SCAYLE Component Library.
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="SCAYLE's *Component Library* is released under the MIT license." /></a>
</p>


## Getting Started

Visit the [Add-On Developer Guide](https://scayle.dev/en/dev/add-on/introduction) to learn more on how to use the Panel icons.

Visit the [Docs](https://scayle.dev) to learn more about our system requirements.

## What is Scayle ?

[SCAYLE](https://scayle.com) is a full-featured e-commerce software solution that comes with flexible APIs. Within SCAYLE, you can manage all aspects of your shop, such as products, stocks, customers, and transactions.

Learn more about [Scayles’s architecture](https://scayle.dev/en/dev/getting-started/introduction) and [commerce modules](https://scayle.dev/en/dev/getting-started/introduction) in the Docs.


## Installation

Before running the application, you need to configure your hosts file with the add-on's hostname. You'll also need to create an SSL key pair for this domain.

It's also recommended to install [Volta](https://volta.sh/) in order to use the correct versions of node.js and npm.

```shell
# Add 
127.0.0.1       {hostname from .env}` (replace everything including the {})  to `/etc/hosts`

# Execute
npm ci

# !! Make sure you have openssl installed on your computer for this step. !! 
# Generate a ssl certificates with the following command. The domain name (aka hostname) is retrieved from `CONFIG_SERVER_HOST` in `.env`. 
npm run generate:ssl
```

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

## Other channels

- [LinkedIn](https://www.linkedin.com/company/scaylecommerce/)
- [Jobs](https://careers.smartrecruiters.com/ABOUTYOUGmbH/scayle)
- [AboutYou Tech Blog](https://aboutyou.tech/)

## License
Licensed under the [MIT](https://opensource.org/license/mit/)
