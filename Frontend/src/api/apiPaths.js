export const API_PATHS = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    forgotPassword: "/api/auth/forgot-password",
    resetPassword: (token) => `/api/auth/reset-password/${token}`,
    logout: "/api/auth/logout",
  },
  users: {
    getAll: "/api/users",
    getById: (id) => `/api/users/${id}`,
    update: (id) => `/api/users/${id}`,
    delete: (id) => `/api/users/${id}`,
  },
  ngos: {
    getAll: "/api/ngos",
    getById: (id) => `/api/ngos/${id}`,
    register: "/api/ngos/register",
    approve: (id) => `/api/ngos/${id}/approve`,
    reject: (id) => `/api/ngos/${id}/reject`,
  },
  campaigns: {
    getAll: "/api/campaigns",
    getById: (id) => `/api/campaigns/${id}`,
    create: "/api/campaigns/create",
    getByNGO: (ngoId) => `/api/campaigns/ngo/${ngoId}`,
    update: (id) => `/api/campaigns/${id}`,
    delete: (id) => `/api/campaigns/${id}`,
    approve: (id) => `/api/campaigns/${id}/approve`,
  },
  donations: {
    getAll: "/api/donations",
    getById: (id) => `/api/donations/${id}`,
    create: "/api/donations/create",
    receipt: (id) => `/api/donations/${id}/receipt`,
  },
  comments: {
    getAll: "/api/comments",
    create: "/api/comments/create",
    delete: (id) => `/api/comments/${id}`,
  },
  notifications: {
    getAll: "/api/notifications",
    markRead: (id) => `/api/notifications/${id}/read`,
  },
  certificates: {
    getAll: "/api/certificates",
    generate: "/api/certificates/generate",
  },
  admin: {
    getDashboard: "/api/admin/dashboard",
  },
};
