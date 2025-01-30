const TermsContent = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Terms of Service
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Last updated: March 15, 2024
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">
          Welcome to GaBong. These Terms of Service govern your use of our
          website and services. Please read these terms carefully before using
          our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8">1. Acceptance of Terms</h2>
        <p>
          By accessing and using our services, you agree to be bound by these
          Terms of Service, all applicable laws and regulations, and agree that
          you are responsible for compliance with any applicable local laws.
        </p>

        <h2 className="text-2xl font-semibold mt-8">2. User Accounts</h2>
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg my-4">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                1
              </span>
              <span>You must be at least 18 years old to use our services</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                2
              </span>
              <span>
                You are responsible for maintaining the security of your account
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                3
              </span>
              <span>You must provide accurate and complete information</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                4
              </span>
              <span>
                You must not use another person's account without permission
              </span>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">3. Service Usage</h2>
        <p>
          Our platform connects freelancers with clients. Users must follow
          these guidelines:
        </p>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">For Freelancers</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Maintain professional communication</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Deliver quality work on time</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Be transparent about skills and experience</span>
              </li>
            </ul>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">For Clients</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Provide clear project requirements</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Pay for services as agreed</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Give fair and honest feedback</span>
              </li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">4. Content Guidelines</h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 my-4">
          <p className="text-yellow-800 dark:text-yellow-200">
            Users are responsible for all content they post on the platform.
            Content must not:
          </p>
          <ul className="mt-2 space-y-2">
            <li>Violate any laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Contain harmful or malicious code</li>
            <li>Include inappropriate or offensive material</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">5. Termination</h2>
        <p>
          We reserve the right to terminate or suspend access to our service
          immediately, without prior notice or liability, for any reason
          whatsoever, including without limitation if you breach the Terms of
          Service.
        </p>

        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
          <p>
            If you have any questions about these Terms of Service, please
            contact us:
          </p>
          <ul className="mt-4 space-y-2">
            <li>Email: support@gabong.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Hours: Monday - Friday, 9:00 AM - 5:00 PM EST</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermsContent;
