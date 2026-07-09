# Quick Reference Guide - Create Invitation Feature

## 🚀 Quick Start

### Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

Then open: http://localhost:3000

---

## 🔐 Authentication Flow

### Scenario 1: Unauthenticated User Tries to Create Invitation
1. User clicks "Create" in navigation
2. Redirected to `/login` (automatic by ProtectedRoute)
3. Toast message: "Please log in to access this page."
4. User logs in or registers
5. **Automatically redirected back to `/create`**
6. User can now create invitation

### Scenario 2: User Signs In with Google
1. Click "Google" button on login page
2. Google popup opens
3. User completes sign-in
4. **Automatically sent back to the page they came from**
5. Session stored with "Remember me" enabled by default

### Scenario 3: User Signs In with Facebook
1. Make sure `VITE_FACEBOOK_APP_ID` is set in `.env`
2. Click "Continue with Facebook" button
3. Facebook dialog opens
4. User completes sign-in
5. **Automatically sent back to the page they came from**
6. Session stored with "Remember me" enabled by default

---

## 🛠️ Configuration

### Google Sign-In (Already Configured)
✅ No action needed. Already set up with credentials.

### Facebook Sign-In (Optional)

**Step 1: Create Facebook App**
1. Go to https://developers.facebook.com/
2. Click "My Apps" → "Create App"
3. Choose "Business" type
4. Fill in app name, email, app purpose
5. Create app

**Step 2: Add Facebook Login Product**
1. In app dashboard, click "Add Product"
2. Find "Facebook Login"
3. Choose "Web"
4. Set redirect URL to: `http://localhost:3000`

**Step 3: Get App ID**
1. Go to Settings → Basic
2. Copy "App ID"

**Step 4: Configure Environment**
```bash
# In client/.env
VITE_FACEBOOK_APP_ID=YOUR_APP_ID_HERE
```

**Step 5: Restart client**
```bash
cd client
npm run dev
```

---

## 📝 Form Validation

### Required Fields
- **Category** - Must select event type (Wedding, Birthday, etc.)
- **Style** - Must select design style (Elegant, Modern, etc.)
- **Groom/Partner Name (Armenian)** - Required
- **Bride/Partner Name (Armenian)** - Required
- **Hero Image** - Must upload or select image
- **Wedding Date** - Must select date
- **Calendar Month** - Must enter month name
- **Calendar Year** - Must enter year
- **Location Name** - At least one location required
- **Timeline Events** - At least one event required
- **Timeline Event Time** - Required for each event
- **Timeline Event Title** - Required for each event

### Optional Fields
- English names
- Story content
- Dress code images
- Color palette
- RSVP subtitle
- Final section details
- And more...

### Error Display
All validation errors appear in red box at top of form with:
- Field name/path
- Error message
- First 5 errors shown (if more, shows count)

---

## 🔍 Common Issues & Solutions

### Issue: "Please log in" message appears repeatedly
**Solution:** 
- Check if token is stored in localStorage
- Open DevTools → Application → Local Storage
- Look for `auth_token` or similar key
- If missing, login again

### Issue: Google sign-in button not showing
**Solution:**
1. Check if Google Client ID is set in `.env`:
   ```
   VITE_GOOGLE_CLIENT_ID=52899129134-8588kmkojsm12g0qt76puo7utocu857u.apps.googleusercontent.com
   ```
2. Verify `https://accounts.google.com/gsi/client` script loads in HTML head
3. Clear browser cache and reload

### Issue: Facebook sign-in button not showing
**Solution:**
1. Set `VITE_FACEBOOK_APP_ID` in client `.env`
2. Must be valid app ID (not placeholder text)
3. Verify Facebook SDK loads in HTML head
4. Clear browser cache and reload

### Issue: Form submission fails silently
**Solution:**
1. Check browser console for errors (F12 → Console)
2. Check network tab for API failures
3. Verify backend is running on correct port (5000)
4. Ensure all required fields are filled (see validation above)

### Issue: "Authorization token missing" error
**Solution:**
1. This means user is not logged in
2. Or token was cleared
3. Try logging in again
4. Check if session was saved: DevTools → Application → Local Storage

### Issue: Can't create invitation after login
**Solution:**
1. Verify you're logged in (check Header for email/logout button)
2. All required fields must be filled
3. Check form validation errors at top
4. Try submitting again
5. Check backend logs for validation errors

### Issue: Logout not working
**Solution:**
1. Clear browser cache
2. Try logout again
3. Check DevTools Console for errors
4. Restart client: `npm run dev`

---

## 📊 Database & API

### Create Invitation Endpoint
```
POST /api/invitations
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "",
  "category": "wedding",
  "style": "elegant",
  "couple": {
    "groom": "Name (Armenian)",
    "bride": "Name (Armenian)",
    "groomEn": "Name (English)",
    "brideEn": "Name (English)"
  },
  "hero": {
    "image": "https://...",
    "subtitle": "Invitation subtitle"
  },
  "weddingDate": "2026-08-17T15:00:00",
  // ... more fields
}
```

### Expected Response
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "slug": "unique-slug",
    "status": "PENDING",
    "createdBy": "user-uuid",
    // ... invitation data
  }
}
```

### Login Endpoint
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Google Auth Endpoint
```
POST /api/auth/google
Content-Type: application/json

{
  "idToken": "google-id-token-from-sdk"
}
```

### Facebook Auth Endpoint
```
POST /api/auth/facebook
Content-Type: application/json

{
  "accessToken": "facebook-access-token-from-sdk"
}
```

---

## 🧪 Testing with cURL

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Test Create Invitation (with auth token)
```bash
curl -X POST http://localhost:5000/api/invitations \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "wedding",
    "style": "elegant",
    "couple": {
      "groom": "John",
      "bride": "Jane"
    },
    "hero": {
      "image": "https://example.com/image.jpg"
    },
    "weddingDate": "2026-08-17T15:00:00",
    "calendar": {
      "monthName": "August",
      "year": 2026
    },
    "locations": [{
      "name": "Church",
      "address": "123 Main St"
    }],
    "timeline": {
      "events": [{
        "time": "15:00",
        "title": "Ceremony"
      }]
    }
  }'
```

---

## 📝 Code Examples

### Check User Authentication Status
```tsx
import { useAuth } from '@/context/AuthContext'

export function MyComponent() {
  const { isAuthenticated, user, login, logout } = useAuth()

  if (isAuthenticated) {
    return (
      <div>
        <p>Logged in as: {user?.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    )
  }

  return <button onClick={() => login('email@example.com', 'password')}>Login</button>
}
```

### Call Protected API
```tsx
import { invitationService } from '@/api'

async function createInvitation() {
  try {
    const invitation = await invitationService.create(formData)
    console.log('Created:', invitation)
  } catch (error) {
    console.error('Error:', error)
  }
}
```

---

## 🚨 Error Messages

### Frontend Validation Errors
- Shown in red box at top of form
- Example: "couple.groom: Փեսայի անունը պարտադիր է"

### API Errors
- 401: "Authorization token missing or invalid" - Need to login
- 400: "Bad request" - Check form data
- 403: "Admin access required" - User doesn't have permission
- 404: "Not found" - Resource doesn't exist
- 500: "Server error" - Backend issue

---

## 🔑 Key Files to Know

### Frontend
- Routes: `client/src/router/index.tsx`
- Create Page: `client/src/pages/CreateInvitationPage.tsx`
- Auth Context: `client/src/context/AuthContext.tsx`
- API: `client/src/api/auth.ts`, `client/src/api/invitation.ts`

### Backend
- Routes: `server/src/routes/authRoutes.js`, `invitationRoutes.js`
- Controllers: `server/src/controllers/authController.js`
- Services: `server/src/services/authService.js`, `invitationService.js`
- Middleware: `server/src/middleware/authMiddleware.js`

---

**Last Updated:** 2026-07-02
**Status:** ✅ All features implemented and tested
