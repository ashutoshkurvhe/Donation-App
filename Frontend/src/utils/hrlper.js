// src/utils/helpers.js
export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);

export const truncateText = (text, maxLength = 100) =>
  text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
