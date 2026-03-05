# Testing Guide: Facebook Automation

Since your Meta App is currently in **Development Mode**, only people with "Roles" in your app can trigger the bot. Here is how to test it safely.

## 1. Simulating a Webhook (The Easiest Way)
Before testing with a real Facebook account, you can simulate a comment to see if your server reacts correctly.
1.  Go to your **Meta App Dashboard**.
2.  Go to **Webhooks** -> **Page**.
3.  Find the `feed` field and click **Test**.
4.  In the "Sample Payload", change the message to something like "Test comment" and click **Send to My Server**.
5.  Check your **Vercel Logs**. You should see "Processing comment...".

---

## 2. Testing with a Real Account
To test with a real comment on a real post, the person commenting **must have a role** in your App.

### Step A: Add a Tester
1.  Go to **App Roles** -> **Roles**.
2.  Click **Add Testers**.
3.  Enter the Facebook Name or ID of the person who will be testing (this could be your own personal account or a friend's).
4.  That person will receive a notification on Facebook and **must accept the invite** at [developers.facebook.com/requests](https://developers.facebook.com/requests).

### Step B: Comment on the Page
1.  Using the account you just added as a Tester, go to your Facebook Page.
2.  Comment on a post.
3.  The bot should now:
    - Like the comment.
    - Post a public reply.
    - Send the 3 DMs.

---

## 3. Creating "Test Users" (Advanced)
If you don't want to use real accounts, Meta allows you to create fake "Test Users".
1.  Go to **App Roles** -> **Test Users**.
2.  Click **Create**.
3.  Select "Installed this app" and "Give permissions" (select `pages_messaging`, etc.).
4.  You can then "Login as" these users to comment and see the DMs.

---

## 4. How to Check if it's Working
If nothing happens, check these three things:
1.  **Vercel Logs**: Go to your Vercel Dashboard -> Logs. If you see an error like `403 Forbidden`, it means your `PAGE_ACCESS_TOKEN` is wrong or missing.
2.  **Webhook Subscriptions**: Make sure you didn't just "Verify" the URL, but also clicked the **Subscribe** button next to the `feed` field in the Meta Webhooks dashboard.
3.  **App Permissions**: Ensure the token you generated has `pages_messaging` and `pages_manage_engagement`.

---

## 5. Token Expiration Tip
The tokens you get from the "Graph API Explorer" usually expire after 1-2 hours. 
- For a long-term bot, you need a **Long-Lived Page Access Token**.
- Go to the [Access Token Tool](https://developers.facebook.com/tools/accesstoken/) to see how to extend it.
