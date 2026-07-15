// GitHub OAuth proxy for Decap CMS (public/admin at casamalacitano.com/admin).
// Implements the same handshake as netlify-cms-github-oauth-provider, just
// as a small Cloudflare Worker instead of a Netlify Function.
//
// Flow: Decap opens a popup to /auth -> we redirect to GitHub's authorize
// page -> GitHub redirects back to /callback?code=... -> we exchange the
// code for a token and postMessage it back to the Decap popup's opener.

const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize'
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token'

function randomState() {
  return crypto.randomUUID()
}

async function handleAuth(request, env) {
  const url = new URL(request.url)
  const redirectUri = `${url.origin}/callback`
  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL)
  authorizeUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID)
  authorizeUrl.searchParams.set('redirect_uri', redirectUri)
  authorizeUrl.searchParams.set('scope', 'repo,user')
  authorizeUrl.searchParams.set('state', randomState())
  return Response.redirect(authorizeUrl.toString(), 302)
}

function renderCallbackPage(status, payload) {
  // Standard Decap/Netlify CMS postMessage handshake. The popup first
  // announces itself, waits for the opener to acknowledge (so it learns
  // the opener's origin), then sends the real result.
  const message = status === 'success'
    ? `authorization:github:success:${JSON.stringify(payload)}`
    : `authorization:github:error:${JSON.stringify(payload)}`

  return `<!doctype html>
<html><body>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(${JSON.stringify(message)}, e.origin)
    window.removeEventListener('message', receiveMessage, false)
  }
  window.addEventListener('message', receiveMessage, false)
  window.opener.postMessage('authorizing:github', '*')
})()
</script>
</body></html>`
}

async function handleCallback(request, env) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const error = url.searchParams.get('error')

  if (error) {
    return new Response(renderCallbackPage('error', { message: error }), {
      headers: { 'Content-Type': 'text/html' },
    })
  }

  const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  })
  const tokenData = await tokenResponse.json()

  if (tokenData.error) {
    return new Response(renderCallbackPage('error', tokenData), {
      headers: { 'Content-Type': 'text/html' },
    })
  }

  return new Response(
    renderCallbackPage('success', { token: tokenData.access_token, provider: 'github' }),
    { headers: { 'Content-Type': 'text/html' } }
  )
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname === '/auth') return handleAuth(request, env)
    if (url.pathname === '/callback') return handleCallback(request, env)
    return new Response('Casa Malacitano CMS auth proxy. Not a page.', { status: 404 })
  },
}
