export interface SystemSetting {
  key: string;
  name: string;
  value: string | number | boolean;
  description: string;
  type: "text" | "number" | "boolean" | "select" | "textarea" | "upload";
  options?: string[];
  category: string;
}

export const mockSettings: SystemSetting[] = [
  // General Settings
  {
    key: "site_name",
    name: "Site Name",
    value: "FreelancePlatform",
    description: "The name of your site",
    type: "text",
    category: "general",
  },
  {
    key: "site_description",
    name: "Site Description",
    value: "Find the best freelancers for your projects",
    description: "A short description of your site",
    type: "textarea",
    category: "general",
  },
  {
    key: "site_logo",
    name: "Site Logo",
    value: "/logo.png",
    description: "The logo image for your site",
    type: "upload",
    category: "general",
  },
  {
    key: "site_favicon",
    name: "Site Favicon",
    value: "/favicon.ico",
    description: "The favicon for your site",
    type: "upload",
    category: "general",
  },
  {
    key: "contact_email",
    name: "Contact Email",
    value: "contact@freelanceplatform.com",
    description: "Main contact email address",
    type: "text",
    category: "general",
  },
  {
    key: "maintenance_mode",
    name: "Maintenance Mode",
    value: false,
    description: "Enable maintenance mode to block access to the site",
    type: "boolean",
    category: "general",
  },

  // Email Settings
  {
    key: "smtp_host",
    name: "SMTP Host",
    value: "smtp.gmail.com",
    description: "The SMTP server hostname",
    type: "text",
    category: "email",
  },
  {
    key: "smtp_port",
    name: "SMTP Port",
    value: 587,
    description: "The SMTP server port",
    type: "number",
    category: "email",
  },
  {
    key: "smtp_username",
    name: "SMTP Username",
    value: "noreply@freelanceplatform.com",
    description: "SMTP username for authentication",
    type: "text",
    category: "email",
  },
  {
    key: "smtp_password",
    name: "SMTP Password",
    value: "********",
    description: "SMTP password for authentication",
    type: "text",
    category: "email",
  },
  {
    key: "email_sender_name",
    name: "Email Sender Name",
    value: "FreelancePlatform",
    description: "Name that appears as the email sender",
    type: "text",
    category: "email",
  },
  {
    key: "email_verification",
    name: "Email Verification",
    value: true,
    description: "Require email verification for new accounts",
    type: "boolean",
    category: "email",
  },

  // Payment Settings
  {
    key: "platform_fee",
    name: "Platform Fee",
    value: 10,
    description: "Platform fee percentage on all transactions",
    type: "number",
    category: "payment",
  },
  {
    key: "minimum_withdrawal",
    name: "Minimum Withdrawal",
    value: 50,
    description: "Minimum amount for withdrawal requests",
    type: "number",
    category: "payment",
  },
  {
    key: "paypal_enabled",
    name: "PayPal Enabled",
    value: true,
    description: "Enable PayPal as a payment method",
    type: "boolean",
    category: "payment",
  },
  {
    key: "paypal_client_id",
    name: "PayPal Client ID",
    value: "your-paypal-client-id",
    description: "Client ID from PayPal Developer Dashboard",
    type: "text",
    category: "payment",
  },
  {
    key: "stripe_enabled",
    name: "Stripe Enabled",
    value: true,
    description: "Enable Stripe as a payment method",
    type: "boolean",
    category: "payment",
  },
  {
    key: "stripe_key",
    name: "Stripe API Key",
    value: "your-stripe-api-key",
    description: "API Key from Stripe Dashboard",
    type: "text",
    category: "payment",
  },

  // Security Settings
  {
    key: "max_login_attempts",
    name: "Max Login Attempts",
    value: 5,
    description:
      "Maximum number of failed login attempts before account lockout",
    type: "number",
    category: "security",
  },
  {
    key: "account_lockout_duration",
    name: "Account Lockout Duration",
    value: 30,
    description: "Account lockout duration in minutes",
    type: "number",
    category: "security",
  },
  {
    key: "password_expiry_days",
    name: "Password Expiry Days",
    value: 90,
    description: "Number of days after which passwords expire",
    type: "number",
    category: "security",
  },
  {
    key: "two_factor_auth",
    name: "Two-Factor Authentication",
    value: false,
    description: "Require two-factor authentication for admin accounts",
    type: "boolean",
    category: "security",
  },
];
