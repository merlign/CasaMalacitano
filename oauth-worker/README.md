# CMS auth proxy

Tiny Cloudflare Worker that lets Decap CMS (`/admin` on the main site) log
editors in with GitHub. Decap needs an OAuth handshake server; this is that
server, running as its own Worker, separate from the Cloudflare Pages site.

## Deploy

```
cd oauth-worker
npx wrangler deploy
```

Then set the two secrets (values come from the GitHub OAuth App, see the
main repo's setup notes):

```
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

Copy the deployed `*.workers.dev` URL into `public/admin/config.yml`
(`backend.base_url`), and use `<that url>/callback` as the GitHub OAuth
App's "Authorization callback URL".
