const PaymentContent = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Payment Terms
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Last updated: March 15, 2024
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">
          This document outlines the payment terms and conditions for using
          GaBong's services. Understanding these terms is essential for a smooth
          transaction experience.
        </p>

        <h2 className="text-2xl font-semibold mt-8">1. Payment Methods</h2>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">Digital Payments</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Credit & Debit Cards (Visa, MasterCard)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>PayPal</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Digital Wallets (Apple Pay, Google Pay)</span>
              </li>
            </ul>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">Bank Transfers</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Direct Bank Transfer</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Wire Transfer</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>International Transfers</span>
              </li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">2. Fees & Charges</h2>
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg my-4">
          <h3 className="font-semibold mb-4">Platform Fees</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                5%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Basic Projects
              </div>
            </div>
            <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                10%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Featured Projects
              </div>
            </div>
            <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                15%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Enterprise Solutions
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 my-6">
          <p className="text-yellow-800 dark:text-yellow-200 font-medium">
            Additional fees may apply for:
          </p>
          <ul className="mt-2 space-y-1 text-yellow-800 dark:text-yellow-200">
            <li>Currency conversion</li>
            <li>Express processing</li>
            <li>International transfers</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">3. Payment Protection</h2>
        <div className="grid md:grid-cols-3 gap-6 my-6">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">Escrow Service</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Secure payment holding until project completion
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">Dispute Resolution</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Fair mediation for payment disputes
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-4">Fraud Prevention</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Advanced security measures to protect transactions
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">4. Refund Policy</h2>
        <p>
          Our refund policy is designed to be fair to both clients and
          freelancers:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Full refund available within 24 hours if work hasn't started</li>
          <li>Partial refunds based on work completion status</li>
          <li>No refunds after work has been approved and delivered</li>
        </ul>

        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Payment Support</h3>
          <p>
            For payment-related inquiries or assistance, please contact our
            support team:
          </p>
          <ul className="mt-4 space-y-2">
            <li>Billing Support: billing@gabong.com</li>
            <li>Payment Hotline: +1 (555) 123-4567</li>
            <li>Available: 24/7 for urgent payment issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentContent;
