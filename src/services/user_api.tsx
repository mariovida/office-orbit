import { User, UserCredentials } from "../types/users";
import { fetchWithToken } from "../utils/fetchWithToken";

export const api = {
  getUsers: async (): Promise<User[]> => {
    return fetchWithToken(import.meta.env.VITE_KRIKEM_BACKEND_URL + "/users");
  },
  register: async (userData: UserCredentials): Promise<any> => {
    return fetchWithToken(import.meta.env.VITE_KRIKEM_BACKEND_URL + "/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },
  loginUser: async (userData: UserCredentials): Promise<any> => {
    return await fetchWithToken(import.meta.env.VITE_KRIKEM_BACKEND_URL + "/auth/loginUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  },
  setupPassword: async (userData: UserCredentials): Promise<any> => {
    return fetchWithToken(import.meta.env.VITE_KRIKEM_BACKEND_URL + "/auth/setupPassword", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },
  changePassword: async (userData: UserCredentials): Promise<any> => {
    const response = await fetchWithToken(
      import.meta.env.VITE_KRIKEM_BACKEND_URL + "/auth/changePassword",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      },
    );
    return response;
  },
  forgotPassword: async (userData: UserCredentials): Promise<any> => {
    return fetch(import.meta.env.VITE_KRIKEM_BACKEND_URL + "/auth/forgotPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  },
  getUserDetails: async (userId: any): Promise<any> => {
    return fetchWithToken(import.meta.env.VITE_KRIKEM_BACKEND_URL + `/auth/userDetails/${userId}`);
  },
  getUserInfo: async (userSecret: any): Promise<any> => {
    return fetchWithToken(import.meta.env.VITE_KRIKEM_BACKEND_URL + `/users/getInfo/${userSecret}`);
  },
  getUserAvatar: async (userId: any): Promise<any> => {
    return fetchWithToken(import.meta.env.VITE_KRIKEM_BACKEND_URL + `/users/getAvatar/${userId}`);
  },
  updateUserActivity: async (userId: number, isActive: number): Promise<any> => {
    return fetchWithToken(
      import.meta.env.VITE_KRIKEM_BACKEND_URL + `/users/updateUserActivity/${userId}`,
      {
        method: "POST",
        body: JSON.stringify({ isActive }),
      },
    );
  },
  updateUser: async (userId: any, userData: any): Promise<any> => {
    return fetchWithToken(import.meta.env.VITE_KRIKEM_BACKEND_URL + `/users/updateUser/${userId}`, {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  updatePassword: async (userId: any, passwordData: any): Promise<any> => {
    return fetchWithToken(
      import.meta.env.VITE_KRIKEM_BACKEND_URL + `/users/updatePassword/${userId}`,
      {
        method: "POST",
        body: JSON.stringify(passwordData),
      },
    );
  },
};
