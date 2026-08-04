# Google Indexing API Setup Guide

## Important Limitations

**Google Indexing API ONLY works for pages with:**
- `JobPosting` schema, OR
- `BroadcastEvent` embedded in `VideoObject` schema

**For regular pages (like blog posts, landing pages), you must use:**
- Google Search Console URL Inspection tool (manual)
- Or wait for Google to crawl your sitemap

## One-Time Setup

### Step 1: Create a Google Cloud Project

1. Go to: https://console.cloud.google.com/projectcreate
2. Project name: `seo-indexing-agent`
3. Click "Create"
4. Wait for the project to be created

### Step 2: Enable the Indexing API

1. Go to: https://console.cloud.google.com/apis/library/indexing.googleapis.com
2. Click "Enable"
3. Wait for the API to be enabled

### Step 3: Create a Service Account

1. Go to: https://console.cloud.google.com/iam-admin/serviceaccounts
2. Click "Create Service Account"
3. Service account name: `seo-indexing-agent`
4. Click "Create and Continue"
5. Role: (leave empty, no role needed)
6. Click "Done"

### Step 4: Create a JSON Key

1. Click on the service account you just created
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Click "Create"
6. The JSON file will be downloaded to your computer
7. **DO NOT lose this file - you can only download it once!**

### Step 5: Add Service Account to Google Search Console

1. Go to: https://search.google.com/search-console
2. Select your property: `www.geromball.com`
3. Go to Settings > Users and permissions
4. Click "Add user"
5. Enter the service account email (from the JSON file):
   ```
   seo-indexing-agent@your-project-id.iam.gserviceaccount.com
   ```
6. Set permission to "Owner"
7. Click "Add"

### Step 6: Store the JSON Key in GitHub Secrets

1. Open the downloaded JSON file in a text editor
2. Copy the ENTIRE contents
3. Go to: https://github.com/Alfanofadil11/geromball/settings/secrets/actions
4. Click "New repository secret"
5. Name: `GOOGLE_SA_KEY`
6. Value: Paste the entire JSON file contents
7. Click "Add secret"

## How It Works

1. On every push to `main` branch, the workflow runs
2. It reads your sitemap.xml
3. It prioritizes homepage and blog URLs
4. It submits up to 50 URLs (configurable) to Google Indexing API
5. Google schedules the pages for crawling

## Daily Quota

- Google Indexing API allows **200 URL submissions per day**
- The workflow defaults to 50 URLs to leave room for manual submissions
- You can increase this by triggering the workflow manually with a higher limit

## Manual Trigger

1. Go to: https://github.com/Alfanofadil11/geromball/actions/workflows/seo-google-indexing.yml
2. Click "Run workflow"
3. Set "Max URLs to submit" (default: 50)
4. Click the green "Run workflow" button

## Alternative: Manual GSC URL Submission

For regular pages that don't have JobPosting or BroadcastEvent schema:

1. Go to: https://search.google.com/search-console
2. Select property: `www.geromball.com`
3. Use the URL Inspection tool
4. Enter the URL you want to index
5. Click "Request Indexing"
6. Repeat for each URL

## URLs to Submit

```
https://www.geromball.com/
https://www.geromball.com/services
https://www.geromball.com/portfolio
https://www.geromball.com/about
https://www.geromball.com/contact
https://www.geromball.com/faq
https://www.geromball.com/media-kit
https://www.geromball.com/football-kol
https://www.geromball.com/top-football-kol
https://www.geromball.com/kol-sepakbola
https://www.geromball.com/blog
https://www.geromball.com/blog/panduan-jadi-kol-sepakbola
https://www.geromball.com/blog/rate-card-kol-football-indonesia
https://www.geromball.com/blog/10-program-football-terbaik-indonesia
https://www.geromball.com/blog/kenapa-live-reaction-bola-viral
```

## Troubleshooting

### "Request had insufficient authentication scopes"
- Make sure the service account email is added as Owner in GSC
- Make sure the JSON key is correctly stored in GitHub Secrets

### "The service account does not have permission to index the URL"
- Make sure the service account is added as Owner (not just Viewer)
- Make sure you're indexing the correct property (www.geromball.com)

### "Quota exceeded"
- Wait until tomorrow (quota resets daily at midnight Pacific Time)
- Reduce the number of URLs in the workflow

### URLs not being indexed
- Google Indexing API is a hint, not a guarantee
- Google may ignore URLs that don't have JobPosting/BroadcastEvent schema
- Focus on high-quality content and proper SEO
- Use the manual GSC URL Inspection tool for important pages
