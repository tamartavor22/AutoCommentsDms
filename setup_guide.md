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
- Go to the **Graph API Explorer**.
- Select your App.
- Under **User or Page**, select your Page.
- Add permissions: `pages_manage_metadata`, `pages_manage_posts`, `pages_manage_engagement`, `pages_messaging`.
- Generate the Token and copy it to `PAGE_ACCESS_TOKEN` in `.env`.

### 5. Deployment
- Install dependencies: `npm install`
- Start the server: `node index.js`
- Use a tool like **Ngrok** if testing locally: `ngrok http 3000`
