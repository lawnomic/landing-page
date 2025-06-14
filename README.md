# Lawnomic Landing Page

Professional landing page for Lawnomic EU Privacy Compliance Audit Tool.

## 🚀 Deployment Instructions

This landing page is configured to deploy to **lawnomic.com** via GitHub Pages.

### Setup for github.com/lawnomic Organization

1. **Create Repository:**
   ```bash
   # Repository should be named 'lawnomic.github.io' for organization pages
   # Or 'lawnomic-website' with custom domain configuration
   ```

2. **Push Files:**
   ```bash
   cd /Users/angus/lawnomic/landing-page
   git init
   git add .
   git commit -m "Initial landing page deployment"
   git branch -M main
   git remote add origin https://github.com/lawnomic/lawnomic.github.io.git
   git push -u origin main
   ```

3. **Configure GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "main" / root
   - Custom domain: "lawnomic.com"

4. **DNS Configuration:**
   Configure DNS records for lawnomic.com:
   ```
   Type: CNAME
   Name: www
   Value: lawnomic.github.io
   
   Type: A (for apex domain)
   Name: @
   Values: 
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
   ```

## 📁 File Structure

```
landing-page/
├── index.html          # Main landing page
├── styles.css          # Responsive CSS styling
├── script.js           # Interactive JavaScript
├── favicon.svg         # Brand favicon
├── CNAME              # Custom domain configuration
├── _config.yml        # Jekyll configuration
├── .github/
│   └── workflows/
│       └── pages.yml  # GitHub Actions deployment
└── README.md          # This file
```

## 🔧 Configuration

- **Domain:** lawnomic.com
- **SSL:** Automatically enabled by GitHub Pages
- **CDN:** GitHub's global CDN
- **Analytics:** Ready for Google Analytics integration

## 🎨 Features

- **Responsive Design:** Mobile-first approach
- **Interactive Demo:** Live audit simulation
- **SEO Optimized:** Meta tags and structured data
- **Performance:** Optimized loading and caching
- **Accessibility:** WCAG compliant markup

## 🚀 Development

To make changes:

1. Edit files locally
2. Test in browser
3. Commit and push to main branch
4. GitHub Actions automatically deploys

## 📊 Analytics & Monitoring

- Update Google Analytics ID in `_config.yml`
- Monitor performance via GitHub Pages insights
- Track user engagement and conversion rates

---

**Domain:** https://lawnomic.com  
**Repository:** https://github.com/lawnomic/lawnomic.github.io  
**Status:** Ready for deployment