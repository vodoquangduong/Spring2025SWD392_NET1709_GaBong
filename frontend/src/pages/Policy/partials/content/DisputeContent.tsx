const DisputeContent = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Dispute Resolution
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Last updated: March 15, 2024
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">
          We provide a structured process for resolving disputes between users.
          Our goal is to ensure fair and efficient resolution of all conflicts
          on our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8">1. Dispute Process</h2>
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg my-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                Step 1
              </div>
              <h3 className="font-semibold mb-2">Direct Communication</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Users should first attempt to resolve issues through platform
                messaging
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                Step 2
              </div>
              <h3 className="font-semibold mb-2">Mediation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Platform support team helps facilitate resolution
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                Step 3
              </div>
              <h3 className="font-semibold mb-2">Final Decision</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Platform makes binding resolution if needed
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">2. Types of Disputes</h2>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">Service Related</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Quality of delivered work</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Scope of work disagreements</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Delivery timeline issues</span>
              </li>
            </ul>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">Payment Related</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Payment delays or failures</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Refund requests</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Fee disputes</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 my-6">
          <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-2">
            Time Sensitivity:
          </p>
          <p className="text-yellow-800 dark:text-yellow-200">
            Disputes must be raised within 14 days of the incident. Late
            disputes may not be considered except in exceptional circumstances.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">3. Resolution Timeline</h2>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">Standard Resolution</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></span>
                <span>Initial response within 24 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></span>
                <span>Mediation period of up to 7 days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></span>
                <span>Final decision within 14 days</span>
              </li>
            </ul>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">Expedited Resolution</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></span>
                <span>Available for urgent cases</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></span>
                <span>Response within 4 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></span>
                <span>Resolution within 48 hours</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Dispute Support</h3>
          <p>
            For assistance with disputes or to submit a dispute claim, contact
            our support team:
          </p>
          <ul className="mt-4 space-y-2">
            <li>Dispute Resolution: disputes@gabong.com</li>
            <li>Emergency Support: +1 (555) 123-4567</li>
            <li>Support Hours: 24/7 for urgent disputes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DisputeContent;
