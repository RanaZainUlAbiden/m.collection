/**
 * GitHub OAuth Handler for Decap CMS
 *
 * This route handles the GitHub OAuth flow for Decap CMS authentication.
 * It supports two modes:
 *
 * 1. REDIRECT MODE (no `code` query param):
 *    Redirects the user to GitHub's OAuth authorization page.
 *
 * 2. CALLBACK MODE (with `code` query param):
 *    Exchanges the code for an access token and passes it back to the
 *    Decap CMS window via window.opener.postMessage.
 *
 * Required environment variables:
 * - OAUTH_GITHUB_CLIENT_ID
 * - OAUTH_GITHUB_CLIENT_SECRET
 * - OAUTH_REDIRECT_URI
 */

import { NextRequest, NextResponse } from "next/server";

const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  const redirectUri = process.env.OAUTH_REDIRECT_URI || `${origin}/api/decap-auth`;

  // Mode 1: Redirect to GitHub OAuth
  if (!code) {
    if (!clientId) {
      return new NextResponse(
        "OAuth not configured. Set OAUTH_GITHUB_CLIENT_ID, OAUTH_GITHUB_CLIENT_SECRET, and OAUTH_REDIRECT_URI in your environment variables.",
        { status: 500 }
      );
    }

    const authUrl = new URL(GITHUB_AUTH_URL);
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("scope", "repo,user");
    if (state) {
      authUrl.searchParams.set("state", state);
    }

    return NextResponse.redirect(authUrl.toString());
  }

  // Mode 2: Exchange code for access token
  if (!clientId || !clientSecret) {
    return new NextResponse(
      "OAuth not configured. Missing OAUTH_GITHUB_CLIENT_ID or OAUTH_GITHUB_CLIENT_SECRET.",
      { status: 500 }
    );
  }

  try {
    const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return new NextResponse(`OAuth error: ${tokenData.error_description || tokenData.error}`, {
        status: 400,
      });
    }

    const accessToken = tokenData.access_token;

    // Return HTML that passes the token to the Decap CMS window via postMessage
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Authenticating...</title>
</head>
<body>
  <p>Authenticating with GitHub...</p>
  <script>
    (function() {
      var token = ${JSON.stringify(accessToken)};
      var provider = "github";

      function sendMessage(message) {
        window.opener.postMessage(
          "authorization:github:" + JSON.stringify(message),
          message.origin || "*"
        );
      }

      var mainMessage = {
        token: token,
        provider: provider
      };

      sendMessage(mainMessage);
      window.close();
    })();
  </script>
</body>
</html>`;

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(`OAuth token exchange failed: ${message}`, { status: 500 });
  }
}