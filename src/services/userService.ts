import { apiFetch } from "../utils/apiFetch";

const API_URL = "http://localhost:3000/users";

export const createUser = async (username: string, email: string, password: string) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to sign up!");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during sign in:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  return await apiFetch(API_URL);
};
