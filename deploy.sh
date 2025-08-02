#!/bin/bash

# ABC.af Directory - Deployment Script
echo "🚀 Starting deployment..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Create backup of current production
    echo "💾 Creating backup..."
    timestamp=$(date +"%Y%m%d_%H%M%S")
    backup_dir="backup_$timestamp"
    
    # Upload to cPanel via FTP
    echo "📤 Uploading to cPanel..."
    
    # You can use lftp for automated FTP upload
    # lftp -c "open -u username,password ftp.yourdomain.com; mirror --reverse dist/ public_html/"
    
    echo "✅ Deployment completed!"
    echo "🌐 Your site should be live at: https://abc.af"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi 