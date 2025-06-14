#!/bin/bash

# Lawnomic Landing Page Deployment Script
# Deploys to github.com/lawnomic organization

set -e

echo "🚀 Deploying Lawnomic Landing Page..."

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Make sure you're in the landing-page directory."
    exit 1
fi

# Initialize git repository if not already done
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "📁 Adding files..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy Lawnomic landing page to lawnomic.com - $(date)"

# Add remote if not exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Adding GitHub remote..."
    echo "Please set up the remote manually:"
    echo "git remote add origin https://github.com/lawnomic/lawnomic.github.io.git"
    echo ""
    echo "Or for SSH:"
    echo "git remote add origin git@github.com:lawnomic/lawnomic.github.io.git"
    echo ""
    echo "Then run: git push -u origin main"
else
    echo "🚀 Pushing to GitHub..."
    git push origin main
fi

echo ""
echo "✅ Deployment complete!"
echo "🌐 Site will be available at: https://lawnomic.com"
echo "⚙️  Configure DNS records as described in README.md"
echo "🔧 Enable GitHub Pages in repository settings"

# Display DNS configuration reminder
echo ""
echo "📋 DNS Configuration Required:"
echo "   Type: A     Name: @       Value: 185.199.108.153"
echo "   Type: A     Name: @       Value: 185.199.109.153" 
echo "   Type: A     Name: @       Value: 185.199.110.153"
echo "   Type: A     Name: @       Value: 185.199.111.153"
echo "   Type: CNAME Name: www     Value: lawnomic.github.io"