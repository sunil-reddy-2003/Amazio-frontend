import axios from "axios";

const api = axios.create();

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
            message: result.message || "Something went wrong",
          },
        })
      );
    }

    return response;
  },

  (error) => {
    const message =
      error.response?.data?.message ||
      "Something went wrong. Please try again.";

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