<?php
// SECURE Contact Form Handler for Hostinger
// Upload this file to your Hostinger hosting root directory

// Security: Only allow requests from your domain
$allowedOrigins = [
   // 'http://localhost:5173/',           // CHANGE TO YOUR DOMAIN
    'https://prismaticnomad.ilocosscript.live',       // CHANGE TO YOUR DOMAIN
    'http://localhost:5173',            // For local development
   // 'http://localhost:3000'             // For local development
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (!in_array($origin, $allowedOrigins)) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Access denied']);
    exit;
}

// Security headers
header('Access-Control-Allow-Origin: ' . $origin);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

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

// Rate limiting (basic implementation)
session_start();
$currentTime = time();
$timeWindow = 300; // 5 minutes
$maxRequests = 3; // Max 3 requests per 5 minutes

if (isset($_SESSION['email_requests'])) {
    $requests = array_filter($_SESSION['email_requests'], function($time) use ($currentTime, $timeWindow) {
        return $time > ($currentTime - $timeWindow);
    });
    
    if (count($requests) >= $maxRequests) {
        http_response_code(429);
        echo json_encode(['success' => false, 'message' => 'Too many requests. Please try again later.']);
        exit;
    }
}

$_SESSION['email_requests'][] = $currentTime;

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit;
}

// Extract and sanitize form data
$name = trim(htmlspecialchars($input['name'] ?? '', ENT_QUOTES, 'UTF-8'));
$email = trim(filter_var($input['email'] ?? '', FILTER_SANITIZE_EMAIL));
$phone = trim(htmlspecialchars($input['phone'] ?? '', ENT_QUOTES, 'UTF-8'));
$message = trim(htmlspecialchars($input['message'] ?? '', ENT_QUOTES, 'UTF-8'));

// Enhanced validation
if (empty($name) || empty($email) || empty($phone) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

// Length validation
if (strlen($name) > 100 || strlen($email) > 100 || strlen($phone) > 20 || strlen($message) > 2000) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Input too long']);
    exit;
}

// Email validation
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid email address']);
    exit;
}

// Phone validation (basic)
if (!preg_match('/^[\+]?[0-9\s\-\(\)]{7,20}$/', $phone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid phone number']);
    exit;
}

// Spam protection: Check for suspicious content
$spamKeywords = ['viagra', 'casino', 'loan', 'credit', 'debt', 'free money', 'make money fast'];
$messageLower = strtolower($message);
foreach ($spamKeywords as $keyword) {
    if (strpos($messageLower, $keyword) !== false) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Message contains inappropriate content']);
        exit;
    }
}

// Email configuration
$to = "servicestpn@gmail.com"; // CHANGE THIS TO YOUR HOSTINGER EMAIL
$bcc = "ilocosscript@gmail.com"; // CHANGE THIS TO YOUR BCC EMAIL (optional)

$subject = "New Contact Form Submission from $name";

// HTML Email Template
$htmlMessage = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; }
        .container { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #1e3a8a, #1e40af); color: white; padding: 30px 20px; text-align: center; }
        .logo { width: 60px; height: 60px; margin: 0 auto 15px; display: block; border-radius: 8px; }
        .content { padding: 30px 20px; }
        .field { margin-bottom: 20px; padding: 15px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #f59e0b; }
        .label { font-weight: bold; color: #1e3a8a; display: block; margin-bottom: 5px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
        .value { color: #374151; font-size: 16px; }
        .message-box { background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 10px; color: #374151; line-height: 1.6; }
        .footer { background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 20px; border-radius: 8px; margin-top: 25px; }
        .footer-text { color: #92400e; font-size: 14px; margin: 0; line-height: 1.5; }
        .company-info { text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
        .company-name { color: #1e3a8a; font-weight: bold; font-size: 18px; margin-bottom: 5px; }
        .company-tagline { color: #6b7280; font-size: 14px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <img src='https://ilocosscript.com/002c95a3-5b00-4fe9-8fb4-d9f743e9ea2e.png' alt='The Prismatic Nomad Logo' class='logo'>
            <h2 style='margin: 0; font-size: 24px; font-weight: 600;'>New Contact Form Submission</h2>
            <p style='margin: 10px 0 0; opacity: 0.9; font-size: 16px;'>The Prismatic Nomad</p>
        </div>
        
        <div class='content'>
            <h3 style='color: #1e3a8a; margin-top: 0; margin-bottom: 25px; font-size: 20px; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;'>Contact Details</h3>
            
            <div class='field'>
                <span class='label'>Name</span>
                <span class='value'>$name</span>
            </div>
            
            <div class='field'>
                <span class='label'>Email</span>
                <span class='value'>$email</span>
            </div>
            
            <div class='field'>
                <span class='label'>Phone</span>
                <span class='value'>$phone</span>
            </div>
            
            <div class='field'>
                <span class='label'>Message</span>
                <div class='message-box'>" . nl2br($message) . "</div>
            </div>
            
            <div class='footer'>
                <p class='footer-text'>
                    <strong>📅 Submission Time:</strong> " . date('Y-m-d H:i:s') . "<br>
                    <strong>🌐 Source:</strong> The Prismatic Nomad Website<br>
                    <strong>📍 IP Address:</strong> " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "
                </p>
            </div>
            
            <div class='company-info'>
                <div class='company-name'>The Prismatic Nomad</div>
                <div class='company-tagline'>Your Partner in Growth Across Sectors & Brands</div>
            </div>
        </div>
    </div>
</body>
</html>
";

// Email headers with security
$headers = array();
$headers[] = "From: $name <$email>";
$headers[] = "Reply-To: $email";
$headers[] = "Content-Type: text/html; charset=UTF-8";
$headers[] = "X-Mailer: PHP/" . phpversion();

// Add BCC if specified
if (!empty($bcc)) {
    $headers[] = "Bcc: $bcc";
}

// Send email with exception handling
try {
    $mailSent = mail($to, $subject, $htmlMessage, implode("\r\n", $headers));
    
    if ($mailSent) {
        // Send auto-reply to customer (optional)
        try {
            $autoReplySubject = "Thank you for contacting The Prismatic Nomad";
            $autoReplyHtml = "
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset='UTF-8'>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; }
                    .container { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
                    .header { background: linear-gradient(135deg, #1e3a8a, #1e40af); color: white; padding: 30px 20px; text-align: center; }
                    .logo { width: 60px; height: 60px; margin: 0 auto 15px; display: block; border-radius: 8px; }
                    .content { padding: 30px 20px; }
                    .thank-you { text-align: center; margin-bottom: 30px; }
                    .message-box { background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0; }
                    .next-steps { background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 20px; border-radius: 8px; margin: 25px 0; }
                    .next-steps h4 { color: #92400e; margin-top: 0; margin-bottom: 15px; }
                    .next-steps ul { color: #92400e; margin: 0; padding-left: 20px; line-height: 1.6; }
                    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
                    .company-name { color: #1e3a8a; font-weight: bold; font-size: 18px; margin-bottom: 5px; }
                    .company-tagline { color: #6b7280; font-size: 14px; margin-bottom: 15px; }
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='header'>
                        <img src='https://ilocosscript.com/002c95a3-5b00-4fe9-8fb4-d9f743e9ea2e.png' alt='The Prismatic Nomad Logo' class='logo'>
                        <h2 style='margin: 0; font-size: 24px; font-weight: 600;'>Thank You!</h2>
                        <p style='margin: 10px 0 0; opacity: 0.9; font-size: 16px;'>We've received your message and will get back to you soon.</p>
                    </div>
                    
                    <div class='content'>
                        <div class='thank-you'>
                            <h3 style='color: #1e3a8a; margin-top: 0; margin-bottom: 15px; font-size: 20px;'>Your Message</h3>
                            <div class='message-box'>
                                <p style='color: #374151; margin: 0; line-height: 1.6;'>$message</p>
                            </div>
                        </div>
                        
                        <div class='next-steps'>
                            <h4>What happens next?</h4>
                            <ul>
                                <li>We'll review your inquiry within 24 hours</li>
                                <li>Our team will contact you to discuss your needs</li>
                                <li>We'll provide a customized solution for your business</li>
                            </ul>
                        </div>
                        
                        <div class='footer'>
                            <div class='company-name'>The Prismatic Nomad</div>
                            <div class='company-tagline'>Your Partner in Growth Across Sectors & Brands</div>
                            <p style='color: #6b7280; font-size: 14px; margin: 15px 0 0;'>
                                Best regards,<br>
                                The Prismatic Nomad Team<br>
                                <a href='mailto:$to' style='color: #1e3a8a; text-decoration: none;'>$to</a>
                            </p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            ";
            
            $autoReplyHeaders = array();
            $autoReplyHeaders[] = "From: The Prismatic Nomad <$to>";
            $autoReplyHeaders[] = "Content-Type: text/html; charset=UTF-8";
            
            mail($email, $autoReplySubject, $autoReplyHtml, implode("\r\n", $autoReplyHeaders));
        } catch (Exception $autoReplyError) {
            // Log auto-reply error but don't fail the main request
            error_log("Auto-reply failed: " . $autoReplyError->getMessage());
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you soon.'
        ]);
    } else {
        throw new Exception('Failed to send main email');
    }
    
} catch (Exception $e) {
    // Log the error for debugging
    error_log("Email sending failed: " . $e->getMessage());
    error_log("Form data: " . json_encode([
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'to' => $to,
        'subject' => $subject
    ]));
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email. Please try again later.',
        'error' => $e->getMessage(),
        'error_code' => $e->getCode()
    ]);
}
?>
