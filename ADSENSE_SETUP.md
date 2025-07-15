# Google AdSense Setup Guide for legaldocs-ai.com

## What You Need

1. **Google AdSense Account**: Apply at https://www.google.com/adsense/
2. **Publisher ID**: Found in your AdSense dashboard (format: pub-XXXXXXXXXXXXXXXXX)

## Step-by-Step Setup

### 1. Get Your Publisher ID
- Log into your Google AdSense account
- Go to Account → Account Information
- Copy your Publisher ID (starts with "pub-")

### 2. Update ads.txt File
Replace `XXXXXXXXXXXXXXXXX` in both files with your actual Publisher ID:
- `client/public/ads.txt`
- `dist-domain/ads.txt`

### 3. Update AdSense Script
In `client/index.html`, replace the AdSense script:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID" crossorigin="anonymous"></script>
```

### 4. Update Ad Components
In `client/src/components/AdBanner.tsx`, update the `data-ad-client` attribute:
```tsx
data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
```

## File Locations

The ads.txt file will be accessible at:
- **Production**: https://legaldocs-ai.com/ads.txt
- **Development**: http://localhost:5000/ads.txt

## Verification

1. Deploy your changes to GitHub
2. Wait 5-10 minutes for deployment
3. Check: https://legaldocs-ai.com/ads.txt
4. Submit your domain for AdSense review

## Important Notes

- ads.txt must be in the root directory of your domain
- Use plain text format (no HTML)
- Keep the Google certification authority ID: f08c47fec0942fa0
- The file is case-sensitive

## Current Status

✓ ads.txt file created in both locations
✓ Ready for your Publisher ID
→ Replace placeholder ID with your actual AdSense Publisher ID
→ Update AdSense script in HTML head
→ Deploy and verify file is accessible