// utils/apiPaths.js
export const BASE_URL = "http://localhost:9000";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    LOGOUT: "/api/v1/auth/logout",
    REFRESH_TOKEN: "/api/v1/auth/refresh-token",
    UPDATE_PASSWORD: "/api/v1/auth/update-password",
    RESET_PASSWORD: "/api/v1/auth/reset-password",
    FORGOT_PASSWORD: "/api/v1/auth/forgot-password",
  },
  USERS: {
    GET_ALL_USERS: "/api/v1/users",
    GET_SINGLE_USER: (userId) => `/api/v1/users/${userId}`,
    UPDATE_USER: (userId) => `/api/v1/users/${userId}`,
    DELETE_USER: (userId) => `/api/v1/users/${userId}`,
  },
  NGO: {
    CREATE_NGO: "/api/v1/ngos",
    GET_ALL_NGOS: "/api/v1/ngos",
    GET_SINGLE_NGO: (ngoId) => `/api/v1/ngos/${ngoId}`,
    UPDATE_NGO: (ngoId) => `/api/v1/ngos/${ngoId}`,
    DELETE_NGO: (ngoId) => `/api/v1/ngos/${ngoId}`,
    APPROVE_NGO: (ngoId) => `/api/v1/ngos/${ngoId}/approve`,
    REJECT_NGO: (ngoId) => `/api/v1/ngos/${ngoId}/reject`,
  },
  CAMPAIGN: {
    CREATE_CAMPAIGN: "/api/v1/campaign",
    GET_ALL_CAMPAIGNS: "/api/v1/campaign",
    GET_SINGLE_CAMPAIGN: (campaignId) => `/api/v1/campaign/${campaignId}`,
    UPDATE_CAMPAIGN: (campaignId) => `/api/v1/campaign/${campaignId}`,
    DELETE_CAMPAIGN: (campaignId) => `/api/v1/campaign/${campaignId}`,
    CAMPAIGN_STATUS: (campaignId) => `/api/v1/campaign/${campaignId}/status`,
  },
  DONATION: {
    MAKE_DONATION: "/api/v1/donation",
    GET_ALL_DONATION: "/api/v1/donation",
    DELETE_DONATION: (donationId) => `/api/v1/donation/${donationId}`,
  },
  COMMENTS: {
    ADD_COMMENT: "/api/v1/comment",
    GET_ALL_COMMENTS: "/api/v1/comment",
    UPDATE_COMMENT: (commentId) => `/api/v1/comment/${commentId}`,
    DELETE_COMMENT: (commentId) => `/api/v1/comment/${commentId}`,
  },
  NOTIFICATION: {
    CREATE_NOTIFICATION: "/api/v1/notification",
    GET_NOTIFICATIONS: "/api/v1/notification",
    MARK_NOTIFICATION: (notificationId) =>
      `/api/v1/notification/${notificationId}/read`,
    DELETE_NOTIFICATION: (notificationId) =>
      `/api/v1/notification/${notificationId}`,
  },
  CERTIFICATE: {
    GET_ALL_CERTIFICATES: "/api/v1/certificates",
    GET_SINGLE_CERTIFICATE: (certificateId) =>
      `/api/v1/certificates/${certificateId}`,
  },
  ANALYTICS: {
    GET_USER_ANALYTICS: (userID) => `/api/v1/analytics/user/${userID}`,
    GET_NGO_ANALYTICS: (ngoID) => `/api/v1/analytics/ngo/${ngoID}`,
  },
  ADMIN: {
    NGO_APPROVE: (ngoId) => `/api/v1/admin/ngo/${ngoId}/approve`,
    NGO_REJECT: (ngoId) => `/api/v1/admin/ngo/${ngoId}/reject`,
    USER_BLOCK: (userId) => `/api/v1/admin/user/${userId}/block`,
    USER_UNBLOCK: (userId) => `/api/v1/admin/user/${userId}/unblock`,
    DELETE_CAMPAIGN: (campaignId) => `/api/v1/admin/campaign/${campaignId}`,
    GET_ANALYTICS: "/api/v1/admin/analytics",
    GET_USERS: "/api/v1/admin/users",
    GET_NGOS: "/api/v1/admin/ngos",
    GET_FLAGGED_CONTENT: "/api/v1/admin/flagged-content",
    SEND_NOTIFICATION: "/api/v1/admin/notifications",
    EXPORT_REPORT: "/api/v1/admin/export",
  },
};
