/**
 * =====================================================
 * CONFIGURATION FILE - EDIT THIS FOR YOUR DEPLOYMENT
 * =====================================================
 *
 * Update these values to match your HR system setup.
 */

const CONFIG = {
    // ==========================================
    // API CONFIGURATION
    // ==========================================

    // Base URL of your HR system API (without trailing slash)
    // Example: 'https://hr.ai3lines.com' or 'https://api.yourcompany.com'
    API_BASE_URL: 'https://hr.ai3lines.com',

    // ==========================================
    // COMPANY INFORMATION
    // ==========================================

    // Company name displayed in the form
    COMPANY_NAME: '3L Group',

    // Company website URL (for "Go to Homepage" links)
    COMPANY_WEBSITE: 'https://ai3lines.com',

    // ==========================================
    // REDIRECT SETTINGS
    // ==========================================

    // Whether to redirect to LinkedIn after submission
    REDIRECT_TO_LINKEDIN: true,

    // Seconds to wait before redirecting
    REDIRECT_DELAY_SECONDS: 5,

    // Default LinkedIn URL if candidate doesn't provide their profile
    DEFAULT_LINKEDIN_URL: 'https://www.linkedin.com/feed/',

    // ==========================================
    // FILE UPLOAD SETTINGS
    // ==========================================

    // Maximum file size for CV upload (in bytes)
    // Default: 10MB = 10 * 1024 * 1024
    MAX_FILE_SIZE: 10 * 1024 * 1024,

    // Allowed MIME types for CV upload
    ALLOWED_FILE_TYPES: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],

    // Allowed file extensions (for validation)
    ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx']
};

// Make config globally available (do not modify)
window.CONFIG = CONFIG;
