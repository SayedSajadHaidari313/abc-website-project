# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for your React job portal application.

## Prerequisites

- Google Cloud Console account
- React application running on localhost:5173 (for development)

## Step 1: Google Cloud Console Setup

### 1.1 Create a New Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter a project name (e.g., "Job Portal OAuth")
5. Click "Create"

### 1.2 Enable Required APIs
1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for and enable these APIs:
   - Google+ API
   - Google OAuth2 API

### 1.3 Configure OAuth Consent Screen
1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: "Job Portal"
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
5. Add test users (your email addresses)
6. Click "Save and Continue"

### 1.4 Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Name: "Job Portal Web Client"
5. Authorized JavaScript origins:
   - `http://localhost:5173` (for development)
   - `https://yourdomain.com` (for production)
6. Authorized redirect URIs:
   - `http://localhost:5173/auth/google/callback` (for development)
   - `https://yourdomain.com/auth/google/callback` (for production)
7. Click "Create"
8. **Copy the Client ID and Client Secret**

## Step 2: Environment Configuration

### 2.1 Create Environment File
Create a `.env` file in your project root:

```env
# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Backend API URL
VITE_API_URL=http://localhost:8000/api
```

### 2.2 Update Configuration
Replace the placeholder values in `src/configs/EnvironmentConfig.js`:

```javascript
GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_ACTUAL_CLIENT_ID',
GOOGLE_CLIENT_SECRET: import.meta.env.VITE_GOOGLE_CLIENT_SECRET || 'YOUR_ACTUAL_CLIENT_SECRET',
```

## Step 3: Backend Integration

### 3.1 Create Backend Endpoint
Your backend should have an endpoint to handle Google OAuth:

```javascript
// POST /api/auth/google
app.post('/api/auth/google', async (req, res) => {
  try {
    const { googleUserInfo, googleAccessToken } = req.body;
    
    // Verify the Google access token
    const googleResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${googleAccessToken}`);
    const tokenInfo = await googleResponse.json();
    
    if (!tokenInfo.email) {
      return res.status(401).json({ error: 'Invalid Google token' });
    }
    
    // Find or create user in your database
    let user = await User.findOne({ email: googleUserInfo.email });
    
    if (!user) {
      // Create new user
      user = new User({
        name: googleUserInfo.name,
        email: googleUserInfo.email,
        google_id: googleUserInfo.id,
        profile_picture: googleUserInfo.picture,
        // Add other required fields
      });
      await user.save();
    }
    
    // Generate your app's JWT token
    const token = generateJWT(user);
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role_id: user.role_id,
        // Add other user fields
      }
    });
    
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});
```

## Step 4: Testing

### 4.1 Test the Integration
1. Start your React application: `npm start`
2. Go to the login/register page
3. Click "Log In via Gmail"
4. You should be redirected to Google's OAuth consent screen
5. After authorization, you should be redirected back to your app
6. Check the browser console for any errors

### 4.2 Common Issues and Solutions

#### Issue: "Invalid redirect_uri"
- Solution: Make sure the redirect URI in Google Cloud Console exactly matches your callback URL

#### Issue: "Invalid client_id"
- Solution: Check that your Client ID is correctly set in the environment variables

#### Issue: CORS errors
- Solution: Ensure your backend allows requests from your frontend domain

#### Issue: "access_denied"
- Solution: Check that your OAuth consent screen is properly configured and you're using a test user

## Step 5: Production Deployment

### 5.1 Update Google Cloud Console
1. Add your production domain to authorized origins
2. Add your production callback URL to authorized redirect URIs
3. Publish your OAuth consent screen (if needed)

### 5.2 Environment Variables
Set production environment variables:
```env
VITE_GOOGLE_CLIENT_ID=your_production_client_id
VITE_GOOGLE_CLIENT_SECRET=your_production_client_secret
VITE_API_URL=https://yourdomain.com/api
```

## Security Considerations

1. **Never expose Client Secret in frontend code**
2. **Always verify Google tokens on the backend**
3. **Use HTTPS in production**
4. **Implement proper session management**
5. **Add rate limiting to your auth endpoints**

## Additional Features

### Logout Functionality
The Google OAuth service includes logout functionality that clears all stored tokens and user data.

### Error Handling
The implementation includes comprehensive error handling for various OAuth scenarios.

### State Parameter
The implementation uses a state parameter to prevent CSRF attacks.

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify your Google Cloud Console configuration
3. Ensure your environment variables are set correctly
4. Check that your backend endpoint is working properly 