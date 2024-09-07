export type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: string | FormData;
  params?: URLSearchParams;
};

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

const noAuthNeededPaths: string[] = [
  "/contacts/secret/",
  "/campaigns/confirm-unsubscribe",
  "/auth/changePassword",
  "/forgot-password",
  "/forgot-password/confirm",
  "/set-password",
  "/password-changed",
  "/auth/loginUser",
  "/auth/registerUser",
  "/auth/setupPassword",
];

function shouldBypassAuth(path: string, params?: URLSearchParams): boolean {
  const url = new URL(path, import.meta.env.VITE_KRIKEM_LOCAL_URL);
  const pathname = url.pathname;

  const bypassPath = noAuthNeededPaths.some((noAuthPath) =>
    pathname.startsWith(noAuthPath)
  );
  const isEventDetailsAccessFromSpecificUrl =
    pathname.startsWith("/events/") &&
    !!params &&
    params.has("_se") &&
    params.has("t");

  return bypassPath || isEventDetailsAccessFromSpecificUrl;
}

let refreshingToken: Promise<RefreshResponse | null> | null = null;

async function refreshAccessToken(
  refreshToken: string
): Promise<RefreshResponse | null> {
  if (!refreshingToken) {
    refreshingToken = (async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_KRIKEM_BACKEND_URL + "/auth/refreshToken",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          }
        );
        if (!response.ok) {
          console.error(
            "Failed to refresh token with status:",
            response.status
          );
          return null;
        }
        return await response.json();
      } catch (error) {
        console.error("Error refreshing access token:", error);
        return null;
      } finally {
        refreshingToken = null;
      }
    })();
  }

  return refreshingToken;
}

export async function fetchWithToken(
  url: string,
  options: FetchOptions = {},
  skipRefresh = false
): Promise<any> {
  const headers: Record<string, string> = options.headers || {};
  if (!headers["Content-Type"] && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const pathname = new URL(url).pathname;
  const bypassAuth = shouldBypassAuth(pathname, options.params);

  if (!bypassAuth) {
    let accessToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      throw new Error("Missing authentication tokens.");
    }

    if (!skipRefresh) {
      const refreshedTokens = await refreshAccessToken(refreshToken);
      if (refreshedTokens) {
        localStorage.setItem("accessToken", refreshedTokens.accessToken);
        localStorage.setItem("refreshToken", refreshedTokens.refreshToken);
        accessToken = refreshedTokens.accessToken;
        refreshToken = refreshedTokens.refreshToken;
      } else {
        console.error("Failed to refresh token");
        accessToken = null;
      }
    }
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers,
    credentials: "include",
  };

  try {
    const response = await fetch(url, fetchOptions);

    if (response.status === 401 && !bypassAuth) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        console.error("Missing refresh token");
        return;
      }
      const newTokens = await refreshAccessToken(refreshToken);
      if (newTokens) {
        const accessToken = newTokens.accessToken;
        localStorage.setItem("accessToken", newTokens.accessToken);
        localStorage.setItem("refreshToken", newTokens.refreshToken);
        headers["Authorization"] = `Bearer ${accessToken}`;
        return fetchWithToken(url, options, true);
      } else {
        console.error("Refresh token failed, logging out user.");
        return;
      }
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP status ${response.status}: ${
          errorData.message || response.statusText
        }`
      );
    }

    return await response.json();
  } catch (error) {
    //console.error('Unauthorized');
    console.error("Fetch error:", error);
    throw error;
  }
}
