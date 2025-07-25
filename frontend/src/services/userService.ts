import type { User } from "../types/User";

export async function registerUser(user: User): Promise<{ message: string }> {
  const response = await fetch("http://localhost:5000/registerUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Erro ao registrar: ${error}`);
  }

  return response.json();
}
