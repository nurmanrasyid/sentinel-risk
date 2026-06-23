const MOCK_VALID_CREDENTIALS = {
  identifier: "admin@pnm.co.id",
  password: "Password123",
};

export async function mockLogin(identifier: string, password: string) {
  // Simulate network delay 800-1200ms
  const delay = Math.floor(Math.random() * 400) + 800;
  await new Promise((resolve) => setTimeout(resolve, delay));
  
  if (identifier === MOCK_VALID_CREDENTIALS.identifier && password === MOCK_VALID_CREDENTIALS.password) {
    return { success: true };
  }
  return { success: false, error: "Username/email atau password salah." };
}

export async function mockForgotPassword(_identifier: string) {
  // Simulate network delay 800-1000ms
  const delay = Math.floor(Math.random() * 200) + 800;
  await new Promise((resolve) => setTimeout(resolve, delay));
  
  // Selalu return success terlepas dari valid/tidaknya identifier
  return { success: true };
}
