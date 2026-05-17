/**
 * GitHub OAuth 回调接口 (Sveltia CMS)
 *
 * 流程：
 * 1. 无 code → 返回 HTML 页面由 JS 跳转到 GitHub 授权
 * 2. 有 code → 换取 access_token，将 token 写入 localStorage 并重定向回 /admin/
 */
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET env vars');
    return NextResponse.json(
      { error: 'Server OAuth configuration missing' },
      { status: 500 }
    );
  }

  // 场景1：CMS 跳转过来，无 code → 返回 HTML 由 JS 跳转 GitHub
  if (!code) {
    const scope = searchParams.get('scope') || 'repo';
    const redirectUri = `${request.nextUrl.origin}/api/auth`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

    const html = `<!DOCTYPE html>
<html>
<head><title>Redirecting to GitHub...</title></head>
<body>
<p style="font-family:sans-serif;text-align:center;margin-top:40px;color:#666">Redirecting to GitHub...</p>
<script>window.location.href = "${githubAuthUrl}";</script>
</body>
</html>`;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  // 场景2：GitHub 授权回调，有 code → 换取 token
  try {
    const response = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error('GitHub OAuth error:', data.error);
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    const token = data.access_token;

    // 将 token 存入 localStorage 并重定向回 /admin/
    // Sveltia CMS 会从 localStorage 中读取已有的认证信息
    const html = `<!DOCTYPE html>
<html>
<head><title>Logging in...</title></head>
<body>
<p id="msg" style="font-family:sans-serif;text-align:center;margin-top:40px;color:#666">Logging in, please wait...</p>
<script>
(function() {
  var token = "${token}";
  var origin = "${request.nextUrl.origin}";

  // 方式1: postMessage 给 opener
  if (window.opener && !window.opener.closed) {
    try {
      window.opener.postMessage({ type: "login", token: token }, origin);
      window.opener.postMessage({ type: "login", token: token }, "*");
    } catch(e) {
      console.error("postMessage failed:", e);
    }
  }

  // 方式2: 通过 localStorage + hash 传递 token
  // 先存入 localStorage，然后重定向回 admin 页面
  try {
    localStorage.setItem("sveltia-cms-user", JSON.stringify({token: token}));
    localStorage.setItem("netlify-cms-user", JSON.stringify({token: token}));
  } catch(e) {}

  // 延迟后重定向到 admin 页面（带 token hash，作为备用传递方式）
  setTimeout(function() {
    window.location.href = origin + "/cms/#token=" + encodeURIComponent(token);
  }, 500);
})();
</script>
</body>
</html>`;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err) {
    console.error('OAuth exchange failed:', err);
    return NextResponse.json(
      { error: 'OAuth exchange failed' },
      { status: 500 }
    );
  }
}
