const PrivacyContent = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Last updated: March 15, 2024
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">
          At GaBong, we take your privacy seriously. This Privacy Policy
          explains how we collect, use, and protect your personal information.
          Your trust is important to us.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          1. Information We Collect
        </h2>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">Personal Information</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Name and contact details</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Profile information</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Payment information</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Communication preferences</span>
              </li>
            </ul>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">Usage Information</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Device and browser data</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>IP address and location</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Usage patterns and preferences</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Interaction history</span>
              </li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">
          2. How We Use Your Information
        </h2>
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg my-4">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                1
              </span>
              <span>
                Provide and improve our services, including personalized
                recommendations
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                2
              </span>
              <span>Process payments and maintain financial records</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                3
              </span>
              <span>
                Send important notifications and updates about our services
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                4
              </span>
              <span>Prevent fraud and ensure platform security</span>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">3. Information Sharing</h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 my-4">
          <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-2">
            Important Notice:
          </p>
          <p className="text-yellow-800 dark:text-yellow-200">
            We do not sell your personal information. We may share your
            information only in the following circumstances:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 my-6">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">Service Providers</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Trusted partners who assist in operating our platform and serving
              users
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">Legal Requirements</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              When required by law or to protect our rights and safety
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">Platform Users</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Information shared as part of normal platform functionality
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">4. Your Privacy Rights</h2>
        <p>
          You have certain rights regarding your personal information,
          including:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Right to access your personal information</li>
          <li>Right to correct inaccurate information</li>
          <li>Right to request deletion of your information</li>
          <li>Right to opt-out of marketing communications</li>
        </ul>

        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            Contact Our Privacy Team
          </h3>
          <p>
            If you have questions about our Privacy Policy or want to exercise
            your rights, please contact us:
          </p>
          <ul className="mt-4 space-y-2">
            <li>Email: privacy@gabong.com</li>
            <li>Privacy Hotline: +1 (555) 123-4567</li>
            <li>Data Protection Officer: dpo@gabong.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyContent;
