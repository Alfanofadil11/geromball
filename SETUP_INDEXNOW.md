# IndexNow Setup Guide

## What is IndexNow?

IndexNow is a protocol that allows you to instantly notify search engines (Bing, Yandex, Naver, Seznam, DuckDuckGo) when your website content changes. This helps faster indexing of your pages.

**Note:** Google does NOT support IndexNow. For Google, use the Google Indexing API workflow.

## One-Time Setup

### Step 1: Generate an IndexNow API Key

You can use any random string as your key. Here are options:

#### Option A: Use OpenSSL (Recommended)
```bash
openssl rand -hex 32
```

#### Option B: Use Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Option C: Use Python
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

#### Option D: Use an Online Generator
Go to any random string generator and create a 64-character hex string.

### Step 2: Place the Key File on Your Website

Create a text file at the root of your website:

```
https://geromball.com/{your-key}.txt
```

Example: If your key is `abc123...`, create a file at:
```
https://geromball.com/abc123.txt
```

The file should contain ONLY the key string (no quotes, no newlines).

**For Vercel:** Place the file in your `public/` directory:
```
public/{your-key}.txt
```

### Step 3: Add the Key to GitHub Secrets

1. Go to: https://github.com/Alfanofadil11/geromball/settings/secrets/actions
2. Click "New repository secret"
3. Name: `INDEXNOW_KEY`
4. Value: Your generated key (the same string you placed in the .txt file)
5. Click "Add secret"

### Step 4: Verify the Setup

1. Push your changes to GitHub
2. The workflow will run automatically on the next push to main
3. Check the Actions tab to see the submission results

## How It Works

1. On every push to `main` branch, the workflow runs
2. It fetches your sitemap.xml
3. It submits all URLs to IndexNow
4. IndexNow notifies Bing, Yandex, Naver, Seznam, and DuckDuckGo
5. Search engines crawl your pages within hours

## Manual Trigger

You can also trigger the workflow manually:

1. Go to: https://github.com/Alfanofadil11/geromball/actions/workflows/seo-indexnow.yml
2. Click "Run workflow"
3. Click the green "Run workflow" button

## Troubleshooting

### "Key verification failed"
- Make sure the key file is accessible at `https://geromball.com/{key}.txt`
- Make sure the file contains ONLY the key string
- No quotes, no newlines, no extra characters

### "No URLs found"
- Check that your sitemap.xml is accessible at `https://geromball.com/sitemap.xml`
- Make sure the sitemap is valid XML

### URLs not being indexed
- IndexNow is a notification system, not a guarantee
- Search engines may take time to crawl your pages
- Focus on high-quality content and proper SEO
