
# 🛒 Gumroad Setup Guide

Follow these steps to generate your **Product ID** / Link for the payment integration.

## 1. Create an Account
- Go to [gumroad.com](https://gumroad.com/) and sign up.
- You can skip most of the onboarding questions or select "Just starting out".

## 2. Create Your Product
1.  Go to **Products** on the dashboard.
2.  Click **"New Product"**.
3.  **Name**: "Valentine Surprise" (or whatever you like).
4.  **Type**: Select **"Digital Product"**.
5.  **Price**: Enter **₹1** (change currency to INR if needed in settings, or just use $1).
6.  Click **"Next: Customize"**.

## 3. Content & Checkout
1.  **Description**: "Unlock your special Valentine surprise! 💖".
2.  **Thumbnail**: Upload a cute image (optional).
3.  **Content**:
    - In the "Content" tab, you can just write: "Thank you! You are being redirected..."
    - *Note: Our code handles the redirection/unlocking automatically, so this part doesn't matter much.*
4.  **Checkout**:
    - You can leave fields as default.
    - Make sure "Call to Action" is "Pay".

## 4. Publish & Get Link
1.  Click **"Publish"** at the top right.
2.  Once published, you will see a **"Copy URL"** button or a link like:
    `https://gumroad.com/l/yourproductid`
    
    > **THIS IS THE IMPORTANT PART!**
    >
    > If your link is `https://gumroad.com/l/coolheart`, then your Product ID/Permalink is `coolheart`.

## 5. Update Your Code
1.  Open `public/Data_Collection/index.html`.
2.  Go to line **452** (approx).
3.  Look for:
    ```javascript
    const gumroadUrl = `https://gumroad.com/l/PRODUCT_ID?redirect_url=${encodeURIComponent(unlockUrl)}`;
    ```
4.  Replace `PRODUCT_ID` with your actual id (e.g., `coolheart`).

    **Example:**
    ```javascript
    const gumroadUrl = `https://gumroad.com/l/coolheart?redirect_url=${encodeURIComponent(unlockUrl)}`;
    ```

## 6. Testing
- Go to your Form (`Data_Collection/index.html`).
- Submit a new entry.
- Click the **Unlock** button.
- It should open your Gumroad page.
- **After payment**, Gumroad should redirect you back to `yoursite.com/unlock?token=...`.
