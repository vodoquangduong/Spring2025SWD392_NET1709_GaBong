const SafetyContent = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Safety & Security
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Last updated: March 15, 2024
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">
          Your safety and security are our top priorities. We implement robust
          measures to protect our users and maintain a secure platform
          environment.
        </p>

        <h2 className="text-2xl font-semibold mt-8">1. Account Security</h2>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">Authentication</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Strong password requirements</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Two-factor authentication (2FA)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Biometric login options</span>
              </li>
            </ul>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">Monitoring</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>24/7 activity monitoring</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Fraud detection systems</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Suspicious activity alerts</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 my-6">
          <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-2">
            Security Alert:
          </p>
          <p className="text-yellow-800 dark:text-yellow-200">
            Never share your login credentials or verification codes with
            anyone. Our team will never ask for your password.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">2. Data Protection</h2>
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg my-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                Encryption
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                End-to-end encryption for all sensitive data and communications
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                Storage
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Secure cloud storage with regular backups and redundancy
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                Access
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Strict access controls and regular security audits
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">3. Platform Safety</h2>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">User Verification</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></span>
                <span>Identity verification process</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></span>
                <span>Professional credential validation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></span>
                <span>Background checks for certain services</span>
              </li>
            </ul>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">Content Moderation</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></span>
                <span>AI-powered content filtering</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></span>
                <span>Human review team</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></span>
                <span>Community reporting system</span>
              </li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">4. Emergency Response</h2>
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 my-4">
          <p className="text-red-800 dark:text-red-200 font-medium">
            For immediate assistance in case of:
          </p>
          <ul className="mt-2 space-y-1 text-red-800 dark:text-red-200">
            <li>• Security breaches</li>
            <li>• Suspicious activities</li>
            <li>• Account compromise</li>
            <li>• Safety threats</li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Security Support</h3>
          <p>
            Contact our security team immediately if you notice any suspicious
            activity:
          </p>
          <ul className="mt-4 space-y-2">
            <li>Security Hotline: +1 (555) 911-0000</li>
            <li>Emergency Email: security@gabong.com</li>
            <li>Available: 24/7 Emergency Response</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SafetyContent;
