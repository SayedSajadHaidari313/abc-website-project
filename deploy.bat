@echo off
echo 🚀 Starting ABC.af Directory Deployment...

echo 📦 Building project...
call npm run build

if %ERRORLEVEL% EQU 0 (
    echo ✅ Build successful!
    echo 📤 Ready to upload to cPanel...
    echo.
    echo 📋 Next steps:
    echo 1. Upload the 'dist' folder contents to your cPanel public_html directory
    echo 2. Or push to GitHub if you have cPanel Git Version Control set up
    echo.
    echo 🌐 Your site will be live at: https://yourdomain.com
) else (
    echo ❌ Build failed! Please check the errors above.
    pause
    exit /b 1
)

pause 