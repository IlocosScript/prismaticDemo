<?php
// Contact Form Handler for Hostinger
// Upload this file to your Hostinger hosting root directory

// Allow CORS for your React app
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit;
}

// Extract form data
$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$message = trim($input['message'] ?? '');

// Validation
if (empty($name) || empty($email) || empty($phone) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

// Email validation
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid email address']);
    exit;
}

// Email configuration
$to = "siedg14gmail.com"; // CHANGE THIS TO YOUR HOSTINGER EMAIL
$bcc = ""; // CHANGE THIS TO YOUR BCC EMAIL (optional)

$subject = "New Contact Form Submission from $name";

// HTML Email Template
$htmlMessage = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #1e3a8a, #1e40af); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #1e3a8a; }
        .value { color: #374151; }
        .message-box { background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #f59e0b; margin-top: 10px; }
        .footer { background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-top: 20px; }
        .footer-text { color: #92400e; font-size: 14px; margin: 0; }
    </style>
</head>
<body>
    <div class='header'>
        <h2 style='margin: 0;'>New Contact Form Submission</h2>
    </div>
    
    <div class='content'>
        <h3 style='color: #374151; margin-top: 0;'>Contact Details:</h3>
        
        <div class='field'>
            <span class='label'>Name:</span>
            <span class='value'>$name</span>
        </div>
        
        <div class='field'>
            <span class='label'>Email:</span>
            <span class='value'>$email</span>
        </div>
        
        <div class='field'>
            <span class='label'>Phone:</span>
            <span class='value'>$phone</span>
        </div>
        
        <div class='field'>
            <span class='label'>Message:</span>
            <div class='message-box'>" . nl2br(htmlspecialchars($message)) . "</div>
        </div>
        
        <div class='footer'>
            <p class='footer-text'>
                <strong>Submission Time:</strong> " . date('Y-m-d H:i:s') . "<br>
                <strong>Source:</strong> The Prismatic Nomad Website
            </p>
        </div>
    </div>
</body>
</html>
";

// Plain text version
$textMessage = "
New Contact Form Submission

Name: $name
Email: $email
Phone: $phone
Message: $message

Submission Time: " . date('Y-m-d H:i:s') . "
Source: The Prismatic Nomad Website
";

// Email headers
$headers = array();
$headers[] = "From: $name <$email>";
$headers[] = "Reply-To: $email";
$headers[] = "Content-Type: text/html; charset=UTF-8";

// Add BCC if specified
if (!empty($bcc)) {
    $headers[] = "Bcc: $bcc";
}

// Send email
$mailSent = mail($to, $subject, $htmlMessage, implode("\r\n", $headers));

if ($mailSent) {
    // Send auto-reply to customer (optional)
    $autoReplySubject = "Thank you for contacting The Prismatic Nomad";
    $autoReplyHtml = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 30px; }
            .content { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; }
            .footer-text { color: #92400e; margin: 0; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h2 style='color: #1e3a8a; margin-bottom: 10px;'>Thank You!</h2>
            <p style='color: #374151; font-size: 16px;'>We've received your message and will get back to you soon.</p>
        </div>
        
        <div class='content'>
            <h3 style='color: #1e3a8a; margin-top: 0;'>Your Message:</h3>
            <p style='color: #374151;'>" . htmlspecialchars($message) . "</p>
        </div>
        
        <div class='footer'>
            <h4 style='color: #92400e; margin-top: 0;'>What happens next?</h4>
            <ul style='color: #92400e; margin: 0; padding-left: 20px;'>
                <li>We'll review your inquiry within 24 hours</li>
                <li>Our team will contact you to discuss your needs</li>
                <li>We'll provide a customized solution for your business</li>
            </ul>
        </div>
        
        <div style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;'>
            <p style='color: #6b7280; font-size: 14px;'>
                Best regards,<br>
                The Prismatic Nomad Team<br>
                <a href='mailto:$to' style='color: #1e3a8a;'>$to</a>
            </p>
        </div>
    </body>
    </html>
    ";
    
    $autoReplyHeaders = array();
    $autoReplyHeaders[] = "From: The Prismatic Nomad <$to>";
    $autoReplyHeaders[] = "Content-Type: text/html; charset=UTF-8";
    
    mail($email, $autoReplySubject, $autoReplyHtml, implode("\r\n", $autoReplyHeaders));
    
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message! We will get back to you soon.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email. Please try again later.'
    ]);
}
?>
