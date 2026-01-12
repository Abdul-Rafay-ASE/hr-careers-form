# 3L Group Careers Application Form

A standalone, self-hostable job application form that integrates with the 3L Group HR System.

## Overview

This is an independent frontend application for public job applications. It can be deployed on any static hosting platform and communicates with the HR System API.

## Features

- Clean, modern UI design
- Responsive (mobile-friendly)
- Drag & drop CV upload
- Form validation
- LinkedIn redirect after submission
- No build step required - pure HTML/CSS/JS

## Quick Start

1. Clone this repository
2. Edit `js/config.js` with your settings
3. Replace `images/logo.jpg` with your company logo
4. Deploy to any static hosting

## File Structure

```
hr-careers-form/
├── index.html          # Main application page
├── css/
│   └── styles.css      # All styles
├── js/
│   ├── config.js       # Configuration (EDIT THIS)
│   └── app.js          # Application logic
├── images/
│   └── logo.jpg        # Company logo
└── README.md
```

## Configuration

Edit `js/config.js`:

```javascript
const CONFIG = {
    // Your HR system API URL
    API_BASE_URL: 'https://hr.ai3lines.com',

    // Company info
    COMPANY_NAME: '3L Group',
    COMPANY_WEBSITE: 'https://ai3lines.com',

    // LinkedIn redirect
    REDIRECT_TO_LINKEDIN: true,
    REDIRECT_DELAY_SECONDS: 5,

    // File upload
    MAX_FILE_SIZE: 10 * 1024 * 1024,  // 10MB
};
```

## URL Usage

Access the form with a job ID:

```
https://careers.yourcompany.com/?job_id=abc123
https://careers.yourcompany.com/?job=abc123
https://careers.yourcompany.com/index.html?job_id=abc123
```

## Deployment Options

### Cloudflare Pages (Recommended - Free)

1. Push to GitHub
2. Connect to Cloudflare Pages
3. Deploy (no build command needed)
4. Set custom domain

### Netlify (Free)

1. Push to GitHub
2. Connect to Netlify
3. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `/`

### Vercel (Free)

1. Push to GitHub
2. Import to Vercel
3. Framework: Other
4. Deploy

### GitHub Pages (Free)

1. Push to GitHub
2. Settings > Pages > Source: main branch
3. Custom domain (optional)

### Self-Hosted (nginx)

```nginx
server {
    listen 80;
    server_name careers.yourcompany.com;
    root /var/www/hr-careers-form;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## CORS Configuration

Make sure your HR System API allows requests from your careers domain.

In your HR system `.env`:
```
CORS_ORIGINS=https://careers.yourcompany.com,https://hr.yourcompany.com
```

## Customization

### Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
    --brand-primary: #1e3a5f;    /* Header background */
    --brand-secondary: #2d5a87;  /* Gradient end */
    --brand-accent: #667eea;     /* Buttons, accents */
}
```

### Logo

Replace `images/logo.jpg` with your company logo.
Recommended size: 180px width, transparent background.

### Text

Edit `index.html` to change:
- Page title
- Form labels
- Success messages
- Footer text

## API Endpoints

The form uses these API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/jobs/{id}/apply-info` | Get job details |
| POST | `/api/v1/apply/{id}` | Submit application |

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Dependencies

All loaded from CDN (no npm required):

- [Tabler CSS](https://tabler.io/) - UI framework
- [Tabler Icons](https://tabler-icons.io/) - Icons
- [Alpine.js](https://alpinejs.dev/) - Reactivity
- [Inter Font](https://fonts.google.com/specimen/Inter) - Typography

## License

Proprietary - 3L Group

## Support

Contact: hr-support@ai3lines.com
