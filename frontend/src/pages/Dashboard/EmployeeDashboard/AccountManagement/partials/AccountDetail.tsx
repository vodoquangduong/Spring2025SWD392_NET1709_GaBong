import React, { useState } from "react";
import {
  FaBell,
  FaCalendar,
  FaCheck,
  FaClock,
  FaEnvelope,
  FaHistory,
  FaKey,
  FaLock,
  FaPhone,
  FaShieldAlt,
  FaUnlock,
  FaUser,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { AccountDetail as IAccountDetail } from "../models/types";

const mockAccountDetail: IAccountDetail = {
  id: "ACC001",
  username: "john.doe",
  email: "john.doe@example.com",
  fullName: "John Doe",
  phone: "+1234567890",
  avatar: "https://example.com/avatar.jpg",
  role: "staff",
  status: "active",
  permissions: [
    {
      module: "Reports",
      actions: ["view", "create", "update"],
    },
    {
      module: "Services",
      actions: ["view", "approve", "reject"],
    },
  ],
  activityLog: [
    {
      action: "Login",
      timestamp: "2024-02-20 10:30:00",
      ipAddress: "192.168.1.1",
      details: "Successful login from Chrome browser",
    },
    {
      action: "Password Change",
      timestamp: "2024-02-15 15:45:00",
      ipAddress: "192.168.1.1",
      details: "Password changed successfully",
    },
  ],
  securitySettings: {
    twoFactorEnabled: true,
    lastPasswordChange: "2024-02-15",
    passwordExpiryDate: "2024-05-15",
  },
  notifications: {
    email: true,
    desktop: true,
    mobile: false,
  },
  lastLogin: "2024-02-20 10:30:00",
  createdAt: "2023-01-15",
  updatedAt: "2024-02-15",
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`account-tabpanel-${index}`}
      aria-labelledby={`account-tab-${index}`}
      {...other}
      className="p-6"
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};

const AccountDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tabValue, setTabValue] = useState(0);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [accountData, setAccountData] =
    useState<IAccountDetail>(mockAccountDetail);

  const handleTabChange = (newValue: number) => {
    setTabValue(newValue);
  };

  const handleResetPassword = () => {
    // TODO: Implement API call to reset password
    console.log(
      "Resetting password for user:",
      id,
      "New password:",
      newPassword
    );
    setShowResetPasswordModal(false);
    setNewPassword("");
  };

  const handleToggleTwoFactor = () => {
    // TODO: Implement API call to toggle 2FA
    setAccountData((prev) => ({
      ...prev,
      securitySettings: {
        ...prev.securitySettings,
        twoFactorEnabled: !prev.securitySettings.twoFactorEnabled,
      },
    }));
  };

  const handleToggleNotification = (type: "email" | "desktop" | "mobile") => {
    // TODO: Implement API call to toggle notification
    setAccountData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }));
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-full text-sm font-medium";
      case "inactive":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium";
      case "suspended":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm font-medium";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium";
    }
  };

  const getRoleClass = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium";
      case "staff":
        return "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-full text-sm font-medium";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 dark:bg-[#141414]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center">
              <img
                src={accountData.avatar}
                alt={accountData.fullName}
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-100"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcazeHuAcZDzv4_61fPLT-S00XnaKXch2YWQ&s";
                }}
              />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {accountData.fullName}
              </h2>
              <div className="flex gap-2 mb-6">
                <span className={getRoleClass(accountData.role)}>
                  {accountData.role.charAt(0).toUpperCase() +
                    accountData.role.slice(1)}
                </span>
                <span className={getStatusClass(accountData.status)}>
                  {accountData.status.charAt(0).toUpperCase() +
                    accountData.status.slice(1)}
                </span>
              </div>

              <div className="w-full space-y-3 text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <FaUser className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
                  <span className="font-medium dark:text-gray-300">
                    {accountData.username}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
                  <span className="dark:text-gray-300">
                    {accountData.email}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaPhone className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
                  <span className="dark:text-gray-300">
                    {accountData.phone}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaCalendar className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
                  <span className="dark:text-gray-300">
                    Member since {accountData.createdAt}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaClock className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
                  <span className="dark:text-gray-300">
                    Last updated {accountData.updatedAt}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full mt-6">
                <button
                  className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 dark:bg-emerald-700 text-white rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-800 transition-colors duration-200"
                  onClick={() => setShowResetPasswordModal(true)}
                >
                  <FaKey className="mr-2" /> Reset Password
                </button>
                {accountData.status === "active" ? (
                  <button className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                    <FaLock className="mr-2" /> Suspend Account
                  </button>
                ) : (
                  <button className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                    <FaUnlock className="mr-2" /> Activate Account
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap -mb-px">
                <button
                  className={`inline-flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                    tabValue === 0
                      ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                  onClick={() => handleTabChange(0)}
                >
                  <FaUser
                    className={`mr-2 ${
                      tabValue === 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  />
                  Permissions
                </button>
                <button
                  className={`inline-flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                    tabValue === 1
                      ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                  onClick={() => handleTabChange(1)}
                >
                  <FaShieldAlt
                    className={`mr-2 ${
                      tabValue === 1
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  />
                  Security
                </button>
                <button
                  className={`inline-flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                    tabValue === 2
                      ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                  onClick={() => handleTabChange(2)}
                >
                  <FaBell
                    className={`mr-2 ${
                      tabValue === 2
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  />
                  Notifications
                </button>
                <button
                  className={`inline-flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                    tabValue === 3
                      ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                  onClick={() => handleTabChange(3)}
                >
                  <FaHistory
                    className={`mr-2 ${
                      tabValue === 3
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  />
                  Activity Log
                </button>
              </div>
            </div>

            {/* Permissions Tab */}
            <TabPanel value={tabValue} index={0}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accountData.permissions.map((permission, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-zinc-900 rounded-lg p-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {permission.module}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {permission.actions.map((action, actionIndex) => (
                        <span
                          key={actionIndex}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200"
                        >
                          <FaCheck className="mr-1 w-3 h-3" />
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>

            {/* Security Tab */}
            <TabPanel value={tabValue} index={1}>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg">
                  <div className="flex items-center">
                    <FaShieldAlt className="w-6 h-6 text-gray-400 dark:text-gray-500 mr-4" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleToggleTwoFactor}
                    className={`px-4 py-2 rounded-lg text-white ${
                      accountData.securitySettings.twoFactorEnabled
                        ? "bg-emerald-600 dark:bg-emerald-700 hover:bg-emerald-700 dark:hover:bg-emerald-800"
                        : "bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800"
                    }`}
                  >
                    {accountData.securitySettings.twoFactorEnabled
                      ? "Enabled"
                      : "Disabled"}
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg">
                    <FaKey className="w-6 h-6 text-gray-400 dark:text-gray-500 mr-4" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Last Password Change
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {accountData.securitySettings.lastPasswordChange}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg">
                    <FaClock className="w-6 h-6 text-gray-400 dark:text-gray-500 mr-4" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Password Expiry
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {accountData.securitySettings.passwordExpiryDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            {/* Notifications Tab */}
            <TabPanel value={tabValue} index={2}>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg">
                  <div className="flex items-center">
                    <FaEnvelope className="w-6 h-6 text-gray-400 dark:text-gray-500 mr-4" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Email Notifications
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Receive notifications via email
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleNotification("email")}
                    className={`px-4 py-2 rounded-lg text-white ${
                      accountData.notifications.email
                        ? "bg-emerald-600 dark:bg-emerald-700 hover:bg-emerald-700 dark:hover:bg-emerald-800"
                        : "bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800"
                    }`}
                  >
                    {accountData.notifications.email ? "Enabled" : "Disabled"}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg">
                  <div className="flex items-center">
                    <FaBell className="w-6 h-6 text-gray-400 dark:text-gray-500 mr-4" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Desktop Notifications
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Receive notifications on desktop
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleNotification("desktop")}
                    className={`px-4 py-2 rounded-lg text-white ${
                      accountData.notifications.desktop
                        ? "bg-emerald-600 dark:bg-emerald-700 hover:bg-emerald-700 dark:hover:bg-emerald-800"
                        : "bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800"
                    }`}
                  >
                    {accountData.notifications.desktop ? "Enabled" : "Disabled"}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg">
                  <div className="flex items-center">
                    <FaPhone className="w-6 h-6 text-gray-400 dark:text-gray-500 mr-4" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Mobile Notifications
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Receive notifications on mobile
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleNotification("mobile")}
                    className={`px-4 py-2 rounded-lg text-white ${
                      accountData.notifications.mobile
                        ? "bg-emerald-600 dark:bg-emerald-700 hover:bg-emerald-700 dark:hover:bg-emerald-800"
                        : "bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800"
                    }`}
                  >
                    {accountData.notifications.mobile ? "Enabled" : "Disabled"}
                  </button>
                </div>
              </div>
            </TabPanel>

            {/* Activity Log Tab */}
            <TabPanel value={tabValue} index={3}>
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Activity Log
                </h3>
                <div className="space-y-4">
                  {accountData.activityLog.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        <FaHistory className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.action}
                          </h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {activity.timestamp}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {activity.details}
                        </p>
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="font-medium">IP Address:</span>{" "}
                          {activity.ipAddress}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>
          </div>
        </div>
      </div>

      {/* Reset Password Modal */}
      {showResetPasswordModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
            <div className="relative bg-white dark:bg-zinc-800 rounded-lg max-w-md w-full p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => setShowResetPasswordModal(false)}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Reset Password
                </h3>
                <div className="mt-4">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-zinc-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="mt-5 sm:mt-6 flex gap-3">
                <button
                  onClick={() => setShowResetPasswordModal(false)}
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-zinc-900 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetPassword}
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-emerald-600 dark:bg-emerald-700 text-base font-medium text-white hover:bg-emerald-700 dark:hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:text-sm"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDetail;
