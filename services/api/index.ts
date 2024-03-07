export const managerUser = {
  async auth(token: string) {
    return handleAuthorization(token);
  },
  async login(credentials: { email: string; password: string }) {
    $fetch("/api/users/login", {
      method: "POST",
      body: {
        email: credentials.email,
        password: credentials.password,
      },
    });
  },
};
