# Lawnomic Landing Page Deployment Guide

Complete guide to deploy the Lawnomic landing page to **lawnomic.com** via GitHub organization.

## 🎯 Deployment Overview

- **Target Domain:** https://lawnomic.com
- **GitHub Organization:** github.com/lawnomic
- **Repository Name:** lawnomic.github.io (recommended for org pages)
- **Hosting:** GitHub Pages with custom domain

## 📋 Prerequisites

1. Access to github.com/lawnomic organization
2. Domain registrar access for lawnomic.com
3. Git installed locally
4. Repository creation permissions

## 🚀 Step-by-Step Deployment

### Step 1: Setup Local Repository

```bash
# Navigate to the landing page directory
cd /Users/angus/lawnomic/landing-page

# Run the setup script
./setup-repo.sh
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/lawnomic
2. Click "New repository"
3. Repository name: **lawnomic.github.io**
4. Description: "Official Lawnomic landing page and website"
5. Public repository
6. **Do not** initialize with README (we have files ready)
7. Click "Create repository"

### Step 3: Connect and Push

```bash
# Add GitHub remote
git remote add origin https://github.com/lawnomic/lawnomic.github.io.git

# Push to GitHub
git push -u origin main
```

### Step 4: Configure GitHub Pages

1. Go to repository Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: **main**
4. Folder: **/ (root)**
5. Custom domain: **lawnomic.com**
6. Enforce HTTPS: ✅ (enable after DNS propagation)

### Step 5: DNS Configuration

Configure these DNS records with your domain registrar:

#### A Records (for apex domain)
```
Type: A
Name: @
Value: 185.199.108.153

Type: A  
Name: @
Value: 185.199.109.153

Type: A
Name: @  
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

#### CNAME Record (for www subdomain)
```
Type: CNAME
Name: www
Value: lawnomic.github.io
```

### Step 6: Verification

1. Wait 10-15 minutes for DNS propagation
2. Visit https://lawnomic.com
3. Verify SSL certificate is active
4. Test all interactive features
5. Check mobile responsiveness

## 🔧 Configuration Files

### Key Files for Deployment

- **`CNAME`** - Custom domain configuration
- **`_config.yml`** - Jekyll settings for lawnomic.com
- **`.github/workflows/pages.yml`** - Automated deployment
- **`index.html`** - Main landing page
- **`styles.css`** - Responsive styling
- **`script.js`** - Interactive features

### Domain Configuration

The `CNAME` file contains:
```
lawnomic.com
```

The `_config.yml` is configured for:
```yaml
url: "https://lawnomic.com"
baseurl: ""
```

## 🎨 Features Deployed

✅ **Professional Design** - Modern, responsive layout  
✅ **Interactive Demo** - Live audit simulation  
✅ **Sample Reports** - Tabbed compliance results  
✅ **Pricing Tiers** - Feature comparison table  
✅ **Contact Forms** - Lead generation ready  
✅ **SEO Optimized** - Meta tags and structured data  
✅ **Mobile First** - Responsive across all devices  
✅ **Performance** - Optimized loading and caching  

## 📊 Analytics & Monitoring

### Google Analytics Setup
1. Update tracking ID in `_config.yml`:
   ```yaml
   google_analytics: G-YOUR-TRACKING-ID
   ```
2. Commit and push changes

### Performance Monitoring
- GitHub Pages provides basic traffic insights
- Use Google Search Console for SEO monitoring
- Monitor Core Web Vitals via PageSpeed Insights

## 🛠 Maintenance

### Making Updates
1. Edit files locally in `/Users/angus/lawnomic/landing-page/`
2. Test changes locally
3. Commit and push to main branch
4. GitHub Actions automatically deploys

### Content Updates
- **Pricing:** Update pricing cards in `index.html`
- **Features:** Modify feature grid sections
- **Demo Data:** Adjust sample results in `script.js`
- **Contact Info:** Update footer and contact sections

## 🔒 Security & SSL

- SSL automatically provided by GitHub Pages
- HTTPS enforced for lawnomic.com
- Secure headers configured
- No sensitive data in public repository

## 🆘 Troubleshooting

### Common Issues

**DNS not resolving:**
- Check DNS propagation: https://dnschecker.org
- Verify A records point to GitHub IPs
- Ensure CNAME record is correct

**GitHub Pages not building:**
- Check Actions tab for build errors
- Verify Jekyll configuration
- Ensure all files are properly committed

**Custom domain not working:**
- Verify CNAME file contains correct domain
- Check GitHub Pages settings
- Wait for DNS propagation (up to 24 hours)

### Support Contacts

- GitHub Pages: https://docs.github.com/pages
- DNS Issues: Contact domain registrar
- Technical Issues: GitHub support

## 📈 Success Metrics

After deployment, monitor:
- ✅ Site loads at https://lawnomic.com
- ✅ SSL certificate active (green lock)
- ✅ Mobile responsiveness works
- ✅ Demo audit functionality works
- ✅ Contact forms submit properly
- ✅ Analytics tracking active

## 🎯 Post-Deployment

1. **Test Everything:** Verify all features work
2. **SEO Setup:** Submit sitemap to Google Search Console
3. **Analytics:** Configure goal tracking
4. **Marketing:** Share on social media
5. **Monitoring:** Set up uptime monitoring

---

**🌐 Target URL:** https://lawnomic.com  
**📁 Repository:** https://github.com/lawnomic/lawnomic.github.io  
**🚀 Status:** Ready for deployment