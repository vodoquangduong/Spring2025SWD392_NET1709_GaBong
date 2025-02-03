const VerificationStatus = () => {
  return (
    <div className="border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-1">Verification Status</h2>
          <p className="text-sm text-gray-500">
            Get your portfolio verified to increase visibility
          </p>
        </div>
        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
          Pending Review
        </span>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 border rounded-lg">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              <span className="font-medium">Document Verification</span>
            </div>
            <p className="text-sm text-gray-500">
              Your documents are being reviewed by our team
            </p>
          </div>
          <span className="text-sm text-gray-500">2 days ago</span>
        </div>

        <div className="flex items-center gap-4 p-4 border rounded-lg">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-gray-300"></span>
              <span className="font-medium">Skills Assessment</span>
            </div>
            <p className="text-sm text-gray-500">
              Pending technical skills verification
            </p>
          </div>
          <span className="text-sm text-gray-500">Waiting</span>
        </div>

        <button className="w-full px-4 py-2.5 text-white rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors">
          Track Verification Progress
        </button>
      </div>
    </div>
  );
};

export default VerificationStatus;
