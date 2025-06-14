#!/bin/bash

# Setup script for Lawnomic landing page repository
# Run this from the landing-page directory

echo "🚀 Setting up Lawnomic landing page repository..."

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the landing-page directory"
    echo "Usage: cd /Users/angus/lawnomic/landing-page && ./setup-repo.sh"
    exit 1
fi

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git branch -M main
fi

# Create .gitignore for the landing page
cat > .gitignore << 'EOF'
# OS files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Editor files
.vscode/
.idea/
*.swp
*.swo

# Temporary files
*.tmp
*.bak
*.log

# Jekyll
_site/
.sass-cache/
.jekyll-cache/
.jekyll-metadata

# Node modules (if using npm tools)
node_modules/
EOF

# Add all files
echo "📁 Adding files to git..."
git add .

# Initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Lawnomic landing page

- Professional landing page for GDPR compliance audit tool
- Responsive design with mobile-first approach  
- Interactive demo audit functionality
- Configured for lawnomic.com custom domain
- GitHub Pages deployment ready"

echo ""
echo "✅ Repository setup complete!"
echo ""
echo "🔗 Next steps:"
echo "1. Create repository at github.com/lawnomic/lawnomic.github.io"
echo "2. Add remote: git remote add origin https://github.com/lawnomic/lawnomic.github.io.git"
echo "3. Push: git push -u origin main"
echo "4. Configure GitHub Pages in repository settings"
echo "5. Set up DNS records for lawnomic.com"
echo ""
echo "📋 DNS Records needed:"
echo "   A     @     185.199.108.153"
echo "   A     @     185.199.109.153"
echo "   A     @     185.199.110.153" 
echo "   A     @     185.199.111.153"
echo "   CNAME www   lawnomic.github.io"