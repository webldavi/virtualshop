export function hasAllRequiredFields(
  obj: { [key: string]: any },
  fields: Array<string>
) {
  return fields.every((field: string) => {
    return obj.hasOwnProperty(field);
  });
}

export async function handleAuthorization(token: string) {
  const authResponse = await useFetch("/api/users/auth", {
    method: "POST",
    body: {
      authorization: token,
    },
  });
  return {
    authorization: authResponse.error.value ? false : true,
    authResponse,
  };
}

export const managerToken = {
  storageKey: "access_token",
  set(token: string) {
    localStorage.setItem(this.storageKey, token);
  },
  get() {
    return localStorage.getItem(this.storageKey) || '';
  },
  clear() {
    localStorage.removeItem(this.storageKey);
  },
};
