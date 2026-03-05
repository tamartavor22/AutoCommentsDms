# Facebook App Setup Guide

To get this automation running, you need to configure a Facebook App:

### 1. Create a Facebook App
- Go to [Facebook Developers](https://developers.facebook.com/) and create a new App.
- Select "Other" -> "Business" or "Consumer".

### 2. Add Products
- Add **Webhooks**.
- Add **Facebook Login for Business** (or standard Facebook Login).

### 3. Configure Webhooks
- In the Webhooks product, select **Page** from the dropdown.
- Click **Subscribe to this object**.
- **Callback URL**: Your server URL (e.g., `https://your-domain.com/webhook` or your Ngrok URL).
- **Verify Token**: Must match the `VERIFY_TOKEN` in your Vercel Environment Variables.
- Under **Page Events**, subscribe to **feed**. (This is the most important one for comments).
- *Note: If 'mentions' is not available in your version, 'feed' is sufficient for catching comments on your posts.*

### 4. Get Page Access Token
- Go to **App Settings** -> **Basic** to get your App Secret.
- Go to the **[Graph API Explorer](https://developers.facebook.com/tools/explorer/)**.
- **APP**: Select your current App.
- **User or Page**: Click the dropdown and select **your Page** (NOT "User Token").
- **Add Permissions**: Ensure these are selected:
  - `pages_manage_metadata`
  - `pages_manage_posts`
  - `pages_manage_engagement`
  - `pages_messaging`
- Click **Generate Token**.
- Copy this token to `PAGE_ACCESS_TOKEN` in your environment variables.
- **Tip**: You can verify the token status by visiting `https://your-domain.com/debug/token` once deployed.

### 5. Deployment
- Install dependencies: `npm install`
- Start the server: `node index.js`
- Use a tool like **Ngrok** if testing locally: `ngrok http 3000`
