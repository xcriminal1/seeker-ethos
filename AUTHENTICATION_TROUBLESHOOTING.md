# Authentication Troubleshooting Guide

## Common Issues & Solutions

### "An error occurred during registration. Please try again later."

This error typically occurs due to backend connectivity issues. Here are the steps to resolve:

#### 1. Backend Server Status
- **Ensure your backend server is running on port 3000**
- Check if you can access `http://localhost:3000` in your browser
- Look for any error messages in your backend console

#### 2. Check Backend Health
The application now includes automatic health checks that will:
- Test connectivity to `http://localhost:3000/health`
- Try alternative endpoints (`127.0.0.1:3000`)
- Provide specific error messages

#### 3. Network Connectivity
- Verify no firewall is blocking port 3000
- Ensure no other application is using port 3000
- Try accessing `http://localhost:3000/auth/register` directly

#### 4. Backend API Requirements
Your backend should accept:

**Registration Endpoint:** `POST /auth/register`
```json
{
  "firstName": "string",
  "lastName": "string", 
  "email": "string",
  "password": "string"
}
```

**Login Endpoint:** `POST /auth/login`
```json
{
  "username": "string", // (email)
  "password": "string"
}
```

#### 5. CORS Configuration
Ensure your backend allows requests from your frontend:
```javascript
// Example CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

## User Flow Issues

### New Users Should Sign Up First

The application has been updated to guide new users properly:

#### Changes Made:
1. **Homepage CTA** now directs to `/signup` (Join CyberDetect)
2. **Navbar** shows "Join Now" instead of "Start Learning"
3. **Login page** automatically redirects to signup if user not found
4. **Better error messages** guide users to appropriate actions

#### User Journey:
1. New user visits site
2. Clicks "Join CyberDetect" or "Join Now"
3. Completes signup form
4. Redirected to login page
5. Logs in successfully
6. Profile popup appears in navbar

## Enhanced Error Handling

### What's New:
- **Backend health checks** before attempting auth
- **Alternative endpoint testing** (localhost/127.0.0.1)
- **Specific error messages** for different failure types
- **Automatic redirect** to signup for non-existent users
- **JSON validation** to catch server errors

### Error Types:
1. **Connection Error**: "Cannot connect to server..."
2. **User Not Found**: "Account not found. Please sign up first."
3. **Invalid Credentials**: "Login failed. Invalid credentials."
4. **Server Error**: "Server error: Invalid response format..."

## Testing Steps

### 1. Backend Running
```bash
# In your backend directory
npm start
# or
node server.js
```

### 2. Test Registration
- Go to `/signup`
- Fill out form with valid data
- Check browser console for logs
- Should see "Registration response status: 200"

### 3. Test Login
- Go to `/login` 
- Use credentials from registration
- Check browser console for logs
- Should redirect to `/search` on success

### 4. Test User Flow
- Start as new user
- Follow signup → login → profile flow
- Verify profile popup appears in navbar

## Backend Development Tips

### Required Endpoints:
1. `GET /health` - Health check endpoint
2. `POST /auth/register` - User registration
3. `POST /auth/login` - User authentication
4. `GET /auth/profile/:userId` - User profile (optional)

### Expected Responses:

**Success Registration:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

**Success Login:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "userId": "user_id",
  "user": {
    "firstName": "John",
    "lastName": "Doe", 
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

**Error Response:**
```json
{
  "error": "Descriptive error message"
}
```

## Quick Fixes

### If Backend Won't Start:
```bash
# Check if port 3000 is in use
netstat -an | findstr :3000

# Kill process using port 3000
npx kill-port 3000
```

### If Registration Still Fails:
1. Check backend logs for errors
2. Verify database connection
3. Test API endpoints with Postman
4. Check CORS configuration
5. Verify request body parsing (express.json())

### If Frontend Shows Errors:
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests
4. Look for specific error messages

## Contact Information

If issues persist:
1. Check browser console logs
2. Check backend server logs  
3. Test individual API endpoints
4. Verify network connectivity
5. Review backend API documentation

The enhanced error handling will provide specific guidance for most common issues.
