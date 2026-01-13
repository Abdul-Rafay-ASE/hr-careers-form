/**
 * 3L Group Careers Application Form
 * Alpine.js component for job applications
 */

function careerForm() {
    return {
        // State
        loading: true,
        job: null,
        jobId: null,
        submitted: false,
        submitting: false,
        error: null,
        isDragging: false,
        applicationRef: null,
        redirectCountdown: CONFIG.REDIRECT_DELAY_SECONDS,
        redirectTimer: null,

        // Form data
        form: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            experience_years: '',
            current_company: '',
            linkedin_url: '',
            cv_file: null,
            cover_letter: ''
        },

        /**
         * Initialize the form - fetch job details
         */
        async init() {
            this.jobId = this.getJobIdFromUrl();

            if (!this.jobId) {
                this.loading = false;
                return;
            }

            try {
                const response = await fetch(`${CONFIG.API_BASE_URL}/api/v1/jobs/${this.jobId}/apply-info`);
                if (response.ok) {
                    this.job = await response.json();
                }
            } catch (e) {
                console.error('Failed to load job:', e);
            }

            this.loading = false;
        },

        /**
         * Extract job ID from URL
         * Supports: ?job_id=xxx, ?job=xxx, /apply/xxx, /xxx
         */
        getJobIdFromUrl() {
            // Check query parameters first
            const urlParams = new URLSearchParams(window.location.search);
            let jobId = urlParams.get('job_id') || urlParams.get('job');

            if (jobId) {
                return jobId;
            }

            // Check path segments
            const pathParts = window.location.pathname.split('/').filter(p => p);
            const lastPart = pathParts[pathParts.length - 1];

            // Ignore common file names
            if (lastPart && !['index.html', 'apply', 'careers', ''].includes(lastPart.toLowerCase())) {
                return lastPart.replace('.html', '');
            }

            return null;
        },

        /**
         * Format employment type for display
         */
        formatEmploymentType(type) {
            if (!type) return '';
            return type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        },

        /**
         * Format file size for display
         */
        formatFileSize(bytes) {
            if (!bytes) return '';
            if (bytes < 1024) return bytes + ' B';
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
            return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
        },

        /**
         * Handle file selection from input
         */
        handleFileSelect(event) {
            const file = event.target.files[0];
            if (file) this.validateAndSetFile(file);
        },

        /**
         * Handle file drop
         */
        handleDrop(event) {
            this.isDragging = false;
            const file = event.dataTransfer.files[0];
            if (file) this.validateAndSetFile(file);
        },

        /**
         * Validate file and set it
         */
        validateAndSetFile(file) {
            // Check file type
            const isValidType = CONFIG.ALLOWED_FILE_TYPES.includes(file.type) ||
                               file.name.match(/\.(pdf|doc|docx)$/i);

            if (!isValidType) {
                this.error = 'Please upload a PDF, DOC, or DOCX file';
                return;
            }

            // Check file size
            if (file.size > CONFIG.MAX_FILE_SIZE) {
                const maxMB = CONFIG.MAX_FILE_SIZE / (1024 * 1024);
                this.error = `File size must be less than ${maxMB}MB`;
                return;
            }

            this.error = null;
            this.form.cv_file = file;
        },

        /**
         * Check if form is valid
         */
        isFormValid() {
            return this.form.first_name &&
                   this.form.last_name &&
                   this.form.email &&
                   this.form.phone &&
                   this.form.cv_file;
        },

        /**
         * Submit the application
         */
        async submitApplication() {
            if (!this.isFormValid()) return;

            this.submitting = true;
            this.error = null;

            try {
                const formData = new FormData();
                formData.append('first_name', this.form.first_name);
                formData.append('last_name', this.form.last_name);
                formData.append('email', this.form.email);
                formData.append('phone', this.form.phone);
                formData.append('experience_years', this.form.experience_years || '');
                formData.append('current_company', this.form.current_company || '');
                formData.append('linkedin_url', this.form.linkedin_url || '');
                formData.append('cover_letter', this.form.cover_letter || '');
                formData.append('cv_file', this.form.cv_file);

                const response = await fetch(`${CONFIG.API_BASE_URL}/api/v1/apply/${this.jobId}`, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.detail || 'Failed to submit application');
                }

                // Success!
                this.applicationRef = data.candidate_id || data.id || 'APP-' + Date.now();
                this.submitted = true;

                // Start redirect countdown
                if (CONFIG.REDIRECT_TO_LINKEDIN) {
                    this.startRedirectCountdown();
                }

            } catch (e) {
                this.error = e.message || 'Failed to submit application. Please try again.';
            }

            this.submitting = false;
        },

        /**
         * Start countdown to LinkedIn redirect
         */
        startRedirectCountdown() {
            this.redirectCountdown = CONFIG.REDIRECT_DELAY_SECONDS;
            this.redirectTimer = setInterval(() => {
                this.redirectCountdown--;
                if (this.redirectCountdown <= 0) {
                    this.redirectToLinkedIn();
                }
            }, 1000);
        },

        /**
         * Redirect to LinkedIn
         */
        redirectToLinkedIn() {
            if (this.redirectTimer) {
                clearInterval(this.redirectTimer);
                this.redirectTimer = null;
            }

            // Use candidate's LinkedIn if provided, otherwise default
            if (this.form.linkedin_url && this.form.linkedin_url.includes('linkedin.com')) {
                window.location.href = this.form.linkedin_url;
            } else {
                window.location.href = CONFIG.DEFAULT_LINKEDIN_URL;
            }
        },

        /**
         * Cancel the redirect
         */
        cancelRedirect() {
            if (this.redirectTimer) {
                clearInterval(this.redirectTimer);
                this.redirectTimer = null;
            }
            this.redirectCountdown = -1;
        }
    };
}
