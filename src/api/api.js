import axios from "axios";

const api = axios.create();

const getResponseMessage = (data) => {
  if (typeof data === "string" && data.trim()) {
    return data;
  }

  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message;
  }

  if (typeof data?.error === "string" && data.error.trim()) {
    return data.error;
  }

  return null;
};

api.interceptors.response.use(
  (response) => {
    const result = response.data;
    const method = response.config.method?.toLowerCase();

    // Don't show toast for successful GET requests
    if (method === "get") {
      return response;
    }

    if (result?.success === true) {
      window.dispatchEvent(
        new CustomEvent("app-toast", {
          detail: {
            type: "success",
            message: result.message || "Operation successful",
          },
        })
      );
    } else if (result?.success === false) {
      window.dispatchEvent(
        new CustomEvent("app-toast", {
          detail: {
            type: "error",
            message: getResponseMessage(result) || "Request was not successful.",
          },
        })
      );
    }

    return response;
  },

  (error) => {
    const message =
      getResponseMessage(error.response?.data) ||
      error.message ||
      "Request failed. Please try again.";

    window.dispatchEvent(
      new CustomEvent("app-toast", {
        detail: {
          type: "error",
          message,
        },
      })
    );

    return Promise.reject(error);
  }
);

export default api;