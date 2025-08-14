# PHP Email Setup for Hostinger

This guide will help you set up email functionality using PHP and your Hostinger hosting.

## Files Created

1. **`contact-form.php`** - PHP file to upload to your Hostinger hosting
2. **Updated `src/components/Footer.tsx`** - React component with email integration

## Step 1: Configure the PHP File

1. **Open `contact-form.php`** in your project
2. **Change the email addresses** on lines 47-48:

```php
$to = "your-email@yourdomain.com"; // CHANGE THIS TO YOUR HOSTINGER EMAIL
$bcc = "bcc-email@yourdomain.com"; // CHANGE THIS TO YOUR BCC EMAIL (optional)
```

Replace with your actual Hostinger email addresses.

## Step 2: Upload to Hostinger

1. **Log into your Hostinger control panel**
2. **Go to File Manager**
3. **Navigate to your website root directory** (usually `public_html`)
4. **Upload `contact-form.php`** to the root directory

## Step 3: Update the React Component

1. **Open `src/components/Footer.tsx`**
2. **Find line 35** and change the domain:

```typescript
const phpUrl = window.location.hostname === 'localhost' 
  ? 'http://localhost/contact-form.php'       // For local testing
  : 'https://yourdomain.com/contact-form.php'; // CHANGE THIS TO YOUR DOMAIN
```

Replace `yourdomain.com` with your actual domain.

## Step 4: Test the Setup

1. **Deploy your React app** to your hosting
2. **Fill out the contact form** on your website
3. **Check your email inbox** for the submission
4. **Check the customer's email** for the auto-reply

## Features Included

✅ **Professional HTML email templates** with your branding
✅ **Auto-reply to customers** with thank you message
✅ **BCC functionality** for additional recipients
✅ **Form validation** (client and server-side)
✅ **Loading states** and user feedback
✅ **Error handling** with helpful messages
✅ **CORS support** for cross-origin requests
✅ **Security features** (input sanitization, validation)

## Email Template Features

- **Branded design** matching your website colors
- **Responsive layout** that works on all devices
- **Professional formatting** with proper HTML structure
- **Auto-reply template** with next steps information
- **Submission timestamp** and source tracking

## Troubleshooting

### Common Issues:

1. **"Failed to send email" error:**
   - Check your Hostinger email credentials
   - Verify the email addresses in the PHP file
   - Check Hostinger's email sending limits

2. **"Network error" in browser:**
   - Ensure the PHP file is uploaded to the correct location
   - Check the domain URL in the React component
   - Verify CORS settings in the PHP file

3. **Emails going to spam:**
   - Check your Hostinger email configuration
   - Verify SPF and DKIM records
   - Consider using a professional email service

### Testing Locally:

For local testing, you can:
1. **Set up a local PHP server** (XAMPP, MAMP, etc.)
2. **Place the PHP file** in your local web server directory
3. **Update the URL** in the React component to point to localhost

## Security Notes

- The PHP file includes input validation and sanitization
- CORS headers are configured for security
- Email addresses are validated before sending
- No sensitive data is logged or stored

## Production Deployment

1. **Upload the PHP file** to your Hostinger hosting root directory
2. **Update the domain URL** in your React component
3. **Test the contact form** thoroughly
4. **Monitor email delivery** and spam folders

Your email system is now ready to use with your Hostinger hosting!
